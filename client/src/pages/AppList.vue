<style>

</style>

<template>
  <div class="app-app-list">
    <div class="panel panel-primary">
      <!-- Default panel contents -->
      <div class="panel-heading">My Application List</div>
      <table class="table table-striped table-bordered table-hover">
        <tr>
          <th>Application Name</th>
          <th>Application ID</th>
          <th style="width: 80px;" class="text-center">Operate</th>
        </tr>
        <tr v-for="app in appList">
          <td>
            <a v-link="{path: '/app/apis', query: {appId: app.appId}}">{{app.appName}}</a>
            <span v-if="app.isOwner" class="label label-info">Owner</span>
          </td>
          <td>{{app.appId}}</td>
          <td class="text-center">
            <div class="btn-group">
              <button title="Edit" class="btn btn-info btn-xs" @click="showEditAppDialog(app)"><i class="fa fa-edit"></i></button>
              <button title="Delete" class="btn btn-danger btn-xs" @click="confirmDeleteApp(app)"><i class="fa fa-remove"></i></button>
            </div>
          </td>
        </tr>
      </table>
      <div class="panel-footer">
        <button class="btn btn-sm btn-danger" @click="showCreateAppDialog()"><i class="fa fa-plus"></i> Create App</button>
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
            <label class="control-label">Application Name</label>
            <input type="text" class="form-control" v-model="appEntity.appName">
          </div>
          <div class="form-group form-group-sm">
            <label class="control-label">Managers(multi users need split by ',')</label>
            <input type="text" class="form-control" v-model="appEntity.authorizedUserStr">
          </div>
        </form>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-sm btn-default" @click="appDialogShown = false">Cancel</button>
        <button type="button" class="btn btn-sm btn-success" @click="saveApp()">Save</button>
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
        appEntity: this.createEmptyApp(),
        dialogTitle: ''
      };
    },
    created() {
      this.loadAppData();
    },
    methods: {
      createEmptyApp() {
        return {
          appName: '',
          authorizedUserStr: ''
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
        this.dialogTitle = 'Create new app';
        this.appDialogShown = true;
      },
      showEditAppDialog(app) {
        this.appEntity = _.cloneDeep(app);
        this.appEntity.authorizedUserStr = (this.appEntity.authorizedUser || []).join(',');
        this.dialogTitle = `Update app [${this.appEntity.appName}]`;
        this.appDialogShown = true;
      },
      saveApp(){
        let appName = this.appEntity.appName;
        let authorizedUser = this.appEntity.authorizedUserStr.split(',');
        let data = {
          appName: appName, 
          authorizedUser: authorizedUser
        };
        let p;
        if(this.appEntity.appId){ // 更新
          p = ajax.put(`${AppConf.apiHost}/manage/app/${this.appEntity.appId}`, data);
        }else{ // 新增
          p = ajax.post(`${AppConf.apiHost}/manage/app`, data);
        }
        p.then(res => {
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
    }
  };
</script>