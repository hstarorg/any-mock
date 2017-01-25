<style lang="stylus">
  .page-project-api-list{
    .btn-add-api{
      position: absolute;
      right: 5px;
    }
    .btn-manage-group{
      position: absolute;
      right: 100px;
    }
    .w-80{
      width: 80px;
    }
  }
  .api-group-container{
    height: 400px;
    .op-cell{
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      text-align: center !important;
    }
  }
</style>
<template>
  <div class="page-project-api-list">
    <div class="ui secondary pointing menu">
      <a class="item active"> API List </a>
      <button class="ui icon button green btn-add-api" @click.prevent="$router.push(pathForCreateApi)">
        <i class="plus icon"></i>Add Api
      </button>
      <button class="ui icon button blue btn-manage-group" @click.prevent="showGroupModal">
        <i class="group icon"></i> Manage Group
      </button>
    </div>
    <table class="ui sortable celled striped selectable black very compact table">
      <thead>
        <tr>
          <!-- class: sorted descending -->
          <th class="collapsing"><i class="heartbeat icon"></i></th>
          <th>Name</th>
          <th>Method</th>
          <th>Path</th>
          <th>Is Enable</th>
          <th>Enable Proxy</th>
          <!--<th>Update User</th>-->
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(api,index) in apiList">
          <td class="text-center">{{index + 1}}</td>
          <td>
            <router-link :to="'api/' + api.id">{{ api.name }}</router-link>
          </td>
          <td class="collapsing">
            <div class="ui label">
              {{ api.method }}
            </div>
          </td>
          <td>{{api.path}}</td>
          <td class="collapsing">
            <sm-checkbox v-model="api.isEnable" :disabled="true"></sm-checkbox>
          </td>
          <td class="collapsing">
            <sm-checkbox v-model="api.enableProxy" :disabled="true"></sm-checkbox>
          </td>
          <!--<td class="collapsing">
            {{api.lastUpdateBy.name}}
          </td>-->
          <td class="collapsing align center">
            <div class="basic compact mini blue ui icon button" title="Show Detail" @click="doApiOperate('detail', api)">
              <i class="newspaper icon"></i>
            </div>
            <div class="basic compact mini blue ui icon button" title="Edit API" @click="doApiOperate('edit', api)">
              <i class="edit icon"></i>
            </div>
            <div class="basic compact mini blue ui icon button" title="Delete API" @click="doApiOperate('delete', api)">
              <i class="minus icon"></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <sm-modal v-model="groupModalShown" header="Api Group Manage">
      <div class="div api-group-container">
        <table class="ui sortable celled striped selectable black very compact table ">
          <thead>
            <tr>
              <!-- class: sorted descending -->
              <th class="collapsing"><i class="heartbeat icon"></i></th>
              <th>Group Name</th>
              <th>API Count</th>
              <th class="op-cell">
                <div class="basic very compact mini green ui icon button" title="Add New Group" @click="addNewGroup()">
                  <i class="add icon"></i>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(group, index) in groupList">
              <td class="text-center">{{index + 1}}</td>
              <td :colspan="group.edit ? 2 : 1">
                <div class="ui mini form" v-if="group.edit">
                  <div class="field">
                    <input type="text" v-model="group.editName">
                  </div>
                </div>
                <template v-else>
                  {{ group.name }}
                </template>
              </td>
              <td class="collapsing" v-if="!group.edit">
                <div class="ui label">
                  {{ group.apiCount }}
                </div>
              </td>
              <td class="collapsing align center">
                <template v-if="!group.edit">
                  <div class="basic compact mini blue ui icon button" title="Edit API" @click="changeToEditMode(group)">
                    <i class="edit icon"></i>
                  </div>
                  <div class="basic compact mini red ui icon button" title="Delete API" v-if="isProjectOwner && index !== 0" @click="deleteApiGroup(group)">
                    <i class="minus icon"></i>
                  </div>
                </template>
                <template v-else>
                  <div class="basic compact mini blue ui icon button" title="Save API Group" @click="saveApiGroup(group)">
                    <i class="save icon"></i>
                  </div>
                  <div class="basic compact mini ui icon button" title="Cancel" @click="cancelGroupOperate(group)">
                    <i class="cancel icon"></i>
                  </div>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="modal-actions">
        <div class="ui button deny cancel" @click.prevent="groupModalShown = false">Close</div>
      </div>
    </sm-modal>
  </div>
</template>
<script src="./ProjectApiList.controller.js"></script>
