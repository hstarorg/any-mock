<style lang="stylus">
  .page-layout{
    .title-item{
      width: 180px !important;
    }
    .userinfo{
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      img{
        height: 36px;
        width: 36px;
        border-radius: 50%;
      }
    }
    .left-navbar{
      width: 180px !important;
      top: 40px !important;
      .menu.active{
        position: relative;
        &::after{
          content: '';
          position: absolute;
          background: orange;
          width: 5px;
          right: 0;
          top: 0;
          height: 100%;
        }
      }
    }
    .page-content{
      position: absolute;
      width: 100%;
      /*left: 180px;*/
      top: 44px;
    }
  }
</style>
<template>
  <div class="page-layout">
    <div class="ui inverted menu fixed">
      <div class="header item title-item"><a href=""><i class="cubes icon"></i> API - ANY MOCK</a></div>
      <div class="item" v-for="menu in menuList" :class="{active: currentMenu === menu.name}" @click.stop="doMenuClick(menu)">
        <a :href="menu.url" @click.prevent="">
          <i class="icon" :class="menu.icon"></i>
          <span>{{menu.text}}</span>
        </a>
      </div>
      <!--<div class="ui simple dropdown item">
        Dropdown
        <i class="dropdown icon"></i>
        <div class="menu">
          <div class="item">Action</div>
        </div>
      </div>-->
      <div class="right menu">
        <div class="item">
          <div class="ui transparent inverted icon input">
            <i class="search icon"></i>
            <input type="text" placeholder="Search">
          </div>
        </div>
        <a class="item" href="https://github.com/hstarorg/any-mock/issues/new" target="_blank"><i class="ui send icon"></i>Feedback</a>
        <div class="ui simple dropdown item userinfo">
          <!--<img alt="User Profile Picture" class="dojo-user-picture">-->
          {{user.username}}
          <i class="dropdown icon"></i>
          <div class="menu">
            <a class="item" @click.prevent="signOut()">Sign out</a>
          </div>
        </div>
      </div>
    </div>
    <div class="ui page-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script src="./LayoutPage.controller.js"></script>
