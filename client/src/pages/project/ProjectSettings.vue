<style lang="stylus">
  .page-project-settings{
  }
</style>
<template>
  <div class="page-project-settings">
    <div class="ui secondary pointing menu">
      <a class="item active"> General </a>
    </div>
    <sm-segment class="small">
      <form class="ui small form" @submit.prevent="updateProject()">
        <div class="field">
          <label>Project Name</label>
          <input type="text" name="name" v-model="project.name">
        </div>
        <div class="field">
          <label>Project Description</label>
          <textarea name="description" rows="3" v-model="project.description"></textarea>
        </div>
        <button class="ui button">Save Project Info</button>
      </form>
    </sm-segment>
    <div class="ui secondary pointing menu">
      <a class="item active"> Members </a>
    </div>
    <sm-segment class="small">
      <table class="ui very compact table">
        <tr v-for="user in project.users">
          <td>{{user.username}}</td>
          <td>{{user.role}}</td>
          <td class="collapsing"><button class="ui mini icon button"><i class="remove icon"></i></button></td>
        </tr>
      </table>
      <div class="ui action input nine wide">
        <input type="text" v-model="memberName">
        <button type="button" class="ui teal left labeled icon button" @click="addMember()">
          <i class="add user icon"></i>
          Add Memeber
        </button>
      </div>
    </sm-segment>
    <div class="ui secondary pointing menu">
      <a class="item active"> Danger Zone </a>
    </div>
    <sm-segment class="small">
      <button class="ui red button">Delete this project</button>
    </sm-segment>
  </div>
</template>
<script src="./ProjectSettings.controller.js"></script>
