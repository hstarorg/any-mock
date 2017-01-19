<style lang="stylus">
  .page-project-api-list{
    .btn-add-api{
      position: absolute;
      right: 5px;
    }
    .w-80{
      width: 80px;
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
    </div>
    <table class="ui sortable celled striped selectable black very compact table">
      <thead>
        <tr>
          <th class="collapsing sorted descending"><i class="heartbeat icon"></i></th>
          <th>Name</th>
          <th>Method</th>
          <th>Path</th>
          <th>Is Enable</th>
          <th>Enable Proxy</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(api,index) in apiList">
          <td class="text-center">{{index + 1}}</td>
          <td>{{ api.name }}</td>
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
<script src="./ProjectApiList.controller.js"></script>
