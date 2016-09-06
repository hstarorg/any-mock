<style>

</style>

<template>
  <div class="app-app-list">
    <div class="panel panel-primary">
      <!-- Default panel contents -->
      <div class="panel-heading">我的应用列表</div>
      <table class="table table-striped table-bordered table-hover">
        <tr>
          <th>应用名称</th>
          <th>应用ID</th>
          <th style="width: 80px;" class="text-center">操作</th>
        </tr>
        <tr v-for="app in appList">
          <td><a v-link="{path: '/app/apis', query: {appId: app.appId}}">{{app.appName}}</a></td>
          <td>{{app.appId}}</td>
          <td class="text-center">
            <div class="btn-group">
              <button title="编辑" class="btn btn-info btn-xs" @click="showEditAppDialog(app)"><i class="fa fa-edit"></i></button>
              <button title="删除" class="btn btn-danger btn-xs" @click="confirmDeleteApp(app)"><i class="fa fa-remove"></i></button>
            </div>
          </td>
        </tr>
      </table>
      <div class="panel-footer">
        <button class="btn btn-sm btn-danger" @click="showCreateAppDialog()"><i class="fa fa-plus"></i> 添加APP</button>
        <div class="btn-group pull-right">
          <button type="button" class="btn btn-primary">1</button>
          <!--<button type="button" class="btn btn-default">2</button>
          <button type="button" class="btn btn-default">3</button>-->
        </div>
      </div>
    </div>

    <modal :show.sync="appDialogShown" :width="400" :backdrop="false" effect="zoom">
      <div slot="modal-header" class="modal-header">
        <h4 class="modal-title">{{dialogTitle}}</h4>
      </div>
      <div slot="modal-body" class="modal-body">
        <form>
          <div class="form-group form-group-sm">
            <label class="control-label">应用名称</label>
            <input type="text" class="form-control" v-model="appEntity.appName">
          </div>

        </form>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-sm btn-default" @click="appDialogShown = false">取消</button>
        <button type="button" class="btn btn-sm btn-success" @click="saveApp()">保存</button>
      </div>
    </modal>
  </div>
</template>

<script>
  import { ajax } from './../common/ajax';
  import { modal } from 'vue-strap';
  export default {
    components: {
      modal
    },
    data() {
      return {
        appList: [],
        appDialogShown: false,
        appEntity: this.createEmptyApp()
      };
    },
    created() {
      this.loadAppData();
    },
    methods: {
      createEmptyApp() {
        return {
          appName: ''
        };
      },
      loadAppData() {
        ajax.get(`${AppConf.apiHost}/manage/app`)
        .then(res => {
          this.appList = res.json();
        });
      },
      showCreateAppDialog(){
        this.appEntity = this.createEmptyApp();
        this.appDialogShown = true;
      },
      showEditAppDialog(app) {
        this.appEntity = _.cloneDeep(app);
        this.appDialogShown = true;
      },
      saveApp(){
        let appName = this.updateAppEntity.appName;
        ajax.post(`${AppConf.apiHost}/manage/app`, {appName: appName})
        .then(res => {
          layer.msg('Save successfully.');
          this.appDialogShown = false;
          this.loadAppData();
        });
      },
      confirmDeleteApp(app) {
        let layerId = layer.confirm(`Would you want to delete app [${app.appName}]?<br>App apis will be deleted together.`, {title: 'Are you sure?'}, () => {
          ajax.delete(`${AppConf.apiHost}/manage/app/${app.appId}`)
          .then(res => {
            layer.close(layerId);
            this.loadAppData();
          });
        });        
      }
    },
    computed: {
      dialogTitle(){
        return this.appEntity.appId ? `更新应用【${this.appEntity.appName}】`: '创建新应用';
      }
    }
  };
</script>