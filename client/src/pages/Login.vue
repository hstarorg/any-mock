<style scoped>
  .login-panel {
    margin-top: calc(50vh - 150px);
  }
</style>

<template>
  <div class="app-login">
    <div class="container">
      <div class="col-xs-6 col-xs-offset-3 col-md-4 col-md-offset-4 login-panel">
        <div class="panel panel-danger">
          <div class="panel-heading text-center">
            登录Any-Mock
          </div>
          <div class="panel-body">
            <form class="form-signin" role="form">
              <input type="text" class="form-control" placeholder="账户名" required autofocus v-model="user.username">
              <br>
              <input type="password" class="form-control" placeholder="密码" required v-model="user.password">
              <div class="checkbox">
                <label>
                  <input type="checkbox" value="remember-me" v-model="remember"> 记住账户
                </label>
              </div>
              <button class="btn btn-danger btn-block" type="submit" @click.prevent="doLogin()">登&nbsp;录</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ajax } from './../common';
  export default {
    data() {
      return {
        user: {
          username: '',
          password: ''
        },
        remember: false
      };
    },
    created() {
      let username = localStorage.getItem('username');
      if(username){
        this.user.username = username;
        this.remember = true;
      }
    },
    methods: {
      doLogin() {
        ajax.post(`${AppConf.apiHost}/manage/login`, this.user)
        .then(res => {
          if(this.remember){
            localStorage.setItem('username', this.user.username);
          }else{
            localStorage.removeItem('username');
          }
          let data = res.json();
          localStorage.setItem('token', data.token);
          this.$router.go('/');
        });
      }
    }
  };
</script>