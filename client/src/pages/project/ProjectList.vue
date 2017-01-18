<style lang="stylus">
  .page-project-list{
    position: relative;
    padding-top: 5px;
    .sm-card{
      width: calc((100% - 56px) / 4) !important;
    }
    .btn-add-project{
      position: absolute;
      right: 5px;
    }
  }
</style>
<template>
  <div class="page-project-list ui container">
    <div class="ui secondary pointing menu">
      <a class="item active"> API List </a>
      <button class="ui green button btn-add-project" @click="$router.push('/project/new')"><i class="plus icon"></i>Add Project</button>
    </div>
    <sm-cards is-link>
      <sm-card v-for="proj in projectList" :header="proj.name" @click.native="goProjectDetail(proj)">
        <template slot="meta">
          <span class="date">Created at {{ proj.createDate | date('datetime')}}</span>
        </template>
        {{ proj.description }}
        <template slot="extra">
          <a>
            <i class="users icon"></i> 2 APIs
          </a>
        </template>
      </sm-card>
    </sm-cards>
  </div>
</template>
<script src="./ProjectList.controller.js"></script>
