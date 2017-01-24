<style lang="stylus">
  .page-project-group{
    .btn-add-group{
      position: absolute;
      right: 5px;
    }
  }
</style>
<template>
  <div class="page-project-group">
    <div class="ui secondary pointing menu">
      <a class="item active"> Group List </a>
      <button class="ui icon button green btn-add-group" @click.prevent="addNewGroup()">
        <i class="plus icon"></i>Add Group
      </button>
    </div>
    <table class="ui sortable celled striped selectable black very compact table">
      <thead>
        <tr>
          <!-- class: sorted descending -->
          <th class="collapsing"><i class="heartbeat icon"></i></th>
          <th>Group Name</th>
          <th>API Count</th>
          <th>Update User</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(api,index) in groupList">
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
          <td class="collapsing">
            {{api.lastUpdateBy.name}}
          </td>
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
  </div>
</template>
<script src="./ProjectGroup.controller.js"></script>
