<style lang="stylus">
  .page-project-edit{
    padding-top: 5px;
  }
</style>
<template>
  <div class="page-project-edit ui container">
    <sm-segment type="stacked" class="">
      <h3>Create New Project</h3>
      <form class="ui small form" @submit.prevent="doSubmit()">
        <div class="field">
          <label>Project Name</label>
          <input type="text" name="name" v-model="project.name">
        </div>
        <div class="field">
          <label>Project Description</label>
          <textarea name="description" v-model="project.description"></textarea>
        </div>
        <div class="ui buttons">
          <button class="ui button" @click.prevent="$router.push('/project')">Cancel</button>
          <div class="or"></div>
          <button class="ui positive button">Submit</button>
        </div>
      </form>
    </sm-segment>
  </div>
</template>
<script src="./ProjectEdit.controller.js"></script>
