<style>
  .app-layout {
    margin-top: 60px;
  }
  
  .app-layout .container {
    position: relative;
  }
  
  .app-layout .container > .animated {
    position: absolute;
    right: 15px;
    left: 15px;
  }
</style>

<template>
  <div class="app-layout">
    <header class="navbar navbar-inverse navbar-fixed-top" role="banner">
      <div class="container">
        <div class="navbar-header">
          <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
          <a href="/" class="navbar-brand">ANY-MOCK</a>
        </div>
        <nav class="collapse navbar-collapse" role="navigation">
          <ul class="nav navbar-nav">
            <li v-link="{path: '/', exact: true, activeClass: 'active'}">
              <a href="javascript:void(0);">欢迎</a>
            </li>
            <li v-link="{path: '/app', activeClass: 'active'}">
              <a href="javascript:void(0);">我的应用</a>
            </li>
            <li v-link="{path: '/search', activeClass: 'active'}">
              <a href="javascript:void(0);">搜索API</a>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="javascript:void(0);">欢迎您！</a></li>
            <li @click="doLogout()"><a href="javascript:void(0);">退出</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <div class="container">
      <router-view class="animated" transition="fadeBig">
      </router-view>
    </div>
  </div>
</template>

<script>
  import { eventBus } from './../common';
  export default {
    data() {
      return {
        abc: 'test'
      };
    },
    methods: {
      doLogout() {
        localStorage.removeItem('token');
        this.$router.go('/login');
      }
    }
  };
</script>