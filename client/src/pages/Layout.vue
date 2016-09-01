<style scoped>
  .app-layout {
    margin-top: 60px;
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
            <li class="active">
              <a v-link="{path: '/'}">欢迎</a>
            </li>
            <li>
              <a v-link="{path: '/app'}">我的应用</a>
            </li>
            <li>
              <a v-link="{path: '/search'}">搜索API</a>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="javascript:void(0);">欢迎您：{{username}}</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {};
</script>