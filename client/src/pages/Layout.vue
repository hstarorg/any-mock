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
              <a href="javascript:void(0);">Welcome</a>
            </li>
            <li v-link="{path: '/app', activeClass: 'active'}">
              <a href="javascript:void(0);">My Application</a>
            </li>
            <li v-link="{path: '/search', activeClass: 'active'}">
              <a href="javascript:void(0);">API Search</a>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="javascript:void(0);">Welcome, {{user.username}}!</a></li>
            <li @click="doLogout()"><a href="javascript:void(0);">Logout</a></li>
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
  import { eventBus, ajax } from './../common';
  import { setUserInfo } from './../vuex/actions';
  export default {
    vuex: {
      getters: {
        user: state => state.userInfo
      },
      actions: {
        setUserInfo
      }
    },
    data() {
      return {
        abc: 'test'
      };
    },
    created() {
      let token = localStorage.getItem('token');
      ajax.post(`${AppConf.apiHost}/manage/autologin`, {token: token})
      .then(res => {
        let data = res.json();
        this.setUserInfo(data);
      }).catch(()=>{
        this.$router.go('/login');
      });
    },
    methods: {
      doLogout() {
        localStorage.removeItem('token');
        this.$router.go('/login');
      }
    }
  };
</script>