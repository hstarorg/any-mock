<style lang="stylus">
  .page-project-detail{
    position: relative;
    .project-menu{
      width: 180px !important;
      top: 44px !important;
    }
    .project-detail-content{
      position: absolute;
      top: 0;
      right: 0;
      left: 180px;
      padding: 5px;
    }
  }
</style>
<template>
  <div class="page-project-detail">
    <div class="ui visible inverted left vertical sidebar menu project-menu">
      <div class="ui inverted">
        <a class="item menu" :class="{active: currentMenu === 'apis'}" @click.stop="goPage('apis')">
          <i class="list icon"></i>
          <span>API List</span>
        </a>
        <a class="item menu" :class="{active: currentMenu === 'group'}" @click.stop="goPage('group')">
          <i class="group icon"></i>
          <span>Group Manage</span>
        </a>
        <a class="item menu" :class="{active: currentMenu === 'settings'}" @click.stop="goPage('settings')">
          <i class="cogs icon"></i>
          <span>Settings</span>
        </a>
      </div>
    </div>
    <div class="project-detail-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script src="./ProjectDetail.controller.js"></script>
