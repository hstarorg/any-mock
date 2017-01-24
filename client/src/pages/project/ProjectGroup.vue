<style lang="stylus">
  .page-project-group{
    .btn-add-group{
      position: absolute;
      right: 5px;
    }
    .api-group-container{
      height: 400px;
    }
  }
</style>
<template>
  <div class="page-project-group">
    <input type="checkbox" v-model="shown"> {{shown}}
    <sm-modal v-model="shown" @ok="saveGroup()" header="Api Group Manage">
      <div class="div api-group-container">
        <table class="ui sortable celled striped selectable black very compact table ">
          <thead>
            <tr>
              <!-- class: sorted descending -->
              <th class="collapsing"><i class="heartbeat icon"></i></th>
              <th>Group Name</th>
              <th>API Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(group, index) in groupList">
              <td class="text-center">{{index + 1}}</td>
              <td>
                {{ group.name }}
              </td>
              <td class="collapsing">
                <div class="ui label">
                  {{ group.apiCount }}
                </div>
              </td>
              <td class="collapsing align center">
                <div class="basic compact mini blue ui icon button" title="Edit API" @click="doApiOperate('edit', group)">
                  <i class="edit icon"></i>
                </div>
                <div class="basic compact mini blue ui icon button" title="Delete API" @click="doApiOperate('delete', group)">
                  <i class="minus icon"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </sm-modal>
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(group, index) in groupList">
          <td class="text-center">{{index + 1}}</td>
          <td>
            {{ group.name }}
          </td>
          <td class="collapsing">
            <div class="ui label">
              {{ group.apiCount }}
            </div>
          </td>
          <td class="collapsing align center">
            <div class="basic compact mini blue ui icon button" title="Edit API" @click="doApiOperate('edit', group)">
              <i class="edit icon"></i>
            </div>
            <div class="basic compact mini blue ui icon button" title="Delete API" @click="doApiOperate('delete', group)">
              <i class="minus icon"></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script src="./ProjectGroup.controller.js"></script>
