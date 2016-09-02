<template>
  <div class="app-api-list">
    <div class="well well-sm">
      当前应用：{{AA}}，API总数：{{aaa}} <a v-link="{path: '/app'}"><i class="fa fa-mail-reply"></i> 返回应用列表</a>
    </div>
    <div class="panel panel-primary">
      <!-- Default panel contents -->
      <div class="panel-heading">API列表</div>
      <table class="table table-striped table-bordered table-hover">
        <tr>
          <th>API名称</th>
          <th>应用ID</th>
          <th style="width: 80px;" class="text-center">操作</th>
        </tr>
        <tr v-for="api in apiList">
          <td><a v-link="{path: '/app/apis'}">{{app.appName}}</a></td>
          <td>{{api.apiName}}</td>
          <td class="text-center">
            <div class="btn-group">
              <button title="编辑" class="btn btn-info btn-xs" @click="showEditAppDialog(app)"><i class="fa fa-edit"></i></button>
              <button title="删除" class="btn btn-danger btn-xs" @click="confirmDeleteApp(app)"><i class="fa fa-remove"></i></button>
            </div>
          </td>
        </tr>
      </table>
      <div class="panel-footer">
        <button class="btn btn-sm btn-danger" @click="showCreateApiDialog()"><i class="fa fa-plus"></i> 添加API</button>
        <div class="btn-group pull-right">
          <button type="button" class="btn btn-primary">1</button>
          <!--<button type="button" class="btn btn-default">2</button>
          <button type="button" class="btn btn-default">3</button>-->
        </div>
      </div>
    </div>

    <modal :show.sync="apiDialogShown">
      <div slot="modal-header" class="modal-header">
        <h4 class="modal-title">Modal title</h4>
      </div>
      <div slot="modal-body" class="modal-body">
        放大放大
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="apiDialogShown = false">取消</button>
        <button type="button" class="btn btn-success" @click="showCustomModal = false">保存</button>
      </div>
    </modal>
  </div>
</template>

<script>
  import { ajax } from './../common';
  import { modal } from 'vue-strap'
  export default {
    components: {
      modal
    },
    data() {
      return {
        apiList: [],
        apiDialogShown: false
      };
    },
    created() {
      this.loadApiData();
    },
    methods: {
      loadApiData() {
        ajax.get(`${AppConf.apiHost}/manage/app/0a944b1b5af3/api`)
        .then(res => {
          this.apiList = res.json();
        });
      },
      showCreateApiDialog() {
        this.apiDialogShown = true;
      }
    }
  };
</script>