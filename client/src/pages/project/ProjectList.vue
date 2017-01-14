<style lang="stylus">
  .page-project-list{
    padding-top: 5px;
    .sm-card{
      width: calc((100% - 56px) / 4) !important;
    }
  }
</style>
<template>
  <div class="page-project-list ui container">
    <div>
      <button class="ui green button"><i class="plus icon"></i>Add Project</button>
    </div>
    <hr>
    <sm-cards is-link>
      <sm-card v-for="proj in projectList" :header="proj.toString()" @click.native="goProjectDetail()">
        <template slot="meta">
          <span class="date">Created at 2017.01.01</span>
        </template>
        这说法按时发达放大阿卡范德萨借款方家里看福都
        <template slot="extra">
          <a>
            <i class="users icon"></i> 2 Members
          </a>
        </template>
      </sm-card>
    </sm-cards>
  </div>
</template>
<script src="./ProjectList.controller.js"></script>
