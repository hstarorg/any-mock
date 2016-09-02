<style scoped>
  .op {
    vertical-align: middle;
  }
</style>

<template>
  <div class="app-api-list">
    <div class="well well-sm">
      当前应用：{{appName}}，API总数：{{apiTotal}} <a v-link="{path: '/app'}"><i class="fa fa-mail-reply"></i> 返回应用列表</a>
    </div>
    <div class="panel panel-primary">
      <!-- Default panel contents -->
      <div class="panel-heading">API列表</div>
      <table class="table table-striped table-bordered table-hover">
        <tr>
          <th style="width: 300px;">API名称</th>
          <th>API PATH</th>
          <th style="width:60px;">状态码</th>
          <th style="width: 80px;" class="text-center">操作</th>
        </tr>
        <tr v-for="api in apiList">
          <td><a>{{api.apiName}}</a></td>
          <td><span class="label label-danger">{{api.apiMethod}}</span> {{api.apiPath}}</td>
          <td class="text-center">{{api.responseStatus}}</td>
          <td class="text-center">
            <div class="btn-group">
              <button title="编辑" class="btn btn-info btn-xs" @click="showEditApiDialog(api)"><i class="fa fa-edit"></i></button>
              <button title="删除" class="btn btn-danger btn-xs" @click="confirmDeleteApi(api)"><i class="fa fa-remove"></i></button>
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

    <modal :show.sync="apiDialogShown" :width="800" effect="zoom" :backdrop="false">
      <div slot="modal-header" class="modal-header">
        <h4 class="modal-title">新增API</h4>
      </div>
      <div slot="modal-body" class="modal-body">
        <div class="form-group form-group-sm">
          <label class="control-label">API名称</label>
          <input type="text" class="form-control" v-model="apiEntity.apiName">
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label">Path</label>
          <div class="input-group input-group-sm">
            <div class="input-group-btn">
              <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                style="width: 88px">
                {{apiEntity.apiMethod}} <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li v-for="m in methods">
                  <a href="javascript:void(0)" @click="apiEntity.apiMethod=m">{{m}}</a>
                </li>
              </ul>
            </div>
            <div class="input-group-addon">
              {{mockApiHost}}
            </div>
            <input type="text" class="form-control" v-model="apiEntity.apiPath">
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label">Response Headers</label>
          <table class="table table-condensed">
            <tr v-for="header in apiEntity.responseHeaders">
              <td class="text-center op">
                <button class="btn btn-xs btn-danger" @click="apiEntity.responseHeaders.splice($index, 1)"><i class="fa fa-minus"></i></button>
              </td>
              <td><input type="text" class="form-control" v-model="header.name"></td>
              <td><input type="text" class="form-control" v-model="header.value"></td>
            </tr>
            <tr>
              <td style="width: 40px;" class="text-center op">
                <button class="btn btn-xs btn-success" @click="apiEntity.responseHeaders.push({})"><i class="fa fa-plus"></i></button>
              </td>
              <td colspan="2"></td>
            </tr>
          </table>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label">Response Status</label>
          <select v-model="apiEntity.responseStatus" class="form-control">
            <option v-for="opt in responseStatusList" :value=opt.value>{{opt.name}}</option>
          </select>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label">Content-Type</label>
          <div class="input-group input-group-sm">
            <div class="input-group-btn">
              <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                style="width: 88px">
                {{apiEntity.apiMethod}} <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li v-for="c in contentTypeList">
                  <a href="javascript:void(0)" @click="changeContentType(c)">{{c}}</a>
                </li>
                <li class="divider"></li>
                <li><a href="javascript:void(0)" @click="changeContentType('', true)">Custom</a></li>
              </ul>
            </div>
            <input type="text" class="form-control" :disabled="!customContentType" v-model="apiEntity.responseContentType">
          </div>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label">Response Body</label>
          <textarea rows="5" class="form-control" v-model="apiEntity.responseData"></textarea>
        </div>
        <div class="form-group form-group-sm">
          <label class="control-label"> <input type="checkbox" v-model="apiEntity.isEnable"> Enable</label>
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-sm btn-default" @click="apiDialogShown = false">取消</button>
        <button type="button" class="btn btn-sm btn-success" @click="saveApi()">保存</button>
      </div>
    </modal>
  </div>
</template>

<script>
  import { ajax, responseStatus } from './../common';
  import { modal } from 'vue-strap'
  export default {
    components: {
      modal
    },
    data() {
      return {
        appId: '',
        appName: '',
        apiTotal: 0,
        apiList: [],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        contentTypeList: ['application/json', 'text/json', 'text/plain', 'application/xml', 'text/xml'],
        responseStatusList: responseStatus,
        apiDialogShown: false,
        apiEntity: this.createEmptyApi(),
        customContentType: false
      };
    },
    computed: {
      mockApiHost() {
        return `${AppConf.mockApiHost}/${this.appId}`;
      }
    },
    route: {
      canActivate(transition){
        let appId = transition.to.query.appId;
        if(!appId){
          transition.abort();
          return transition.to.router.go('/app');
        }
        transition.next();
      }
    },
    created() {
      console.log('created');
      let appId = this.$route.query.appId;
      this.appId = appId;
      this.loadAppData();
      this.loadApiData();
    },
    methods: {
      createEmptyApi() {
        return {
          apiName: '',
          apiMethod: 'GET',
          responseHeaders: [
            {name: 'x-powered-by', value: 'any-mock'}
          ],
          responseStatus: 200,
          responseContentType: 'application/json',
          responseData: '',
          isEnable: true
        };
      },
      loadAppData() {
        ajax.get(`${AppConf.apiHost}/manage/app/${this.appId}`)
        .then(res => {
          this.appName = res.json().appName;
        });
      },
      loadApiData() {
        ajax.get(`${AppConf.apiHost}/manage/app/${this.appId}/api`)
        .then(res => {
          this.apiList = res.json();
          this.apiTotal = this.apiList.length;
        });
      },
      showCreateApiDialog() {
        this.apiEntity = this.createEmptyApi();
        this.apiDialogShown = true;
      },
      changeContentType(contentType, isCustom) {
        this.customContentType = isCustom;
        this.apiEntity.responseContentType = contentType;
      },
      saveApi() {
        if(this.apiEntity.apiId){ // Update
          ajax.put(`${AppConf.apiHost}/manage/app/${this.appId}/api/${this.apiEntity.apiId}`, this.apiEntity)
          .then(res => {
            this.apiDialogShown = false;
            layer.msg('更新API成功！');
            this.loadApiData();
          });
        }else{ // Add
          ajax.post(`${AppConf.apiHost}/manage/app/${this.appId}/api`, this.apiEntity)
          .then(res => {
            this.apiDialogShown = false;
            layer.msg('添加API成功！');
            this.loadApiData();
          });
        }                
      },
      confirmDeleteApi(api) {
        layer.confirm(`确实要删除API【${api.apiName}】么？`, {title: '请确认'}, () => {
          ajax.delete(`${AppConf.apiHost}/manage/app/${this.appId}/api/${api.apiId}`)
          .then(res => {
            layer.msg('删除成功！');
            this.loadApiData();
          });
        });
      },
      showEditApiDialog(api) {
        this.apiEntity = _.cloneDeep(api);
        this.apiDialogShown = true;
      }
    }
  };
</script>