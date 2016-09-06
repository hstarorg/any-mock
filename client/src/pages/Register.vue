<style scoped>
  .register-panel {
    margin-top: calc(50vh - 150px);
  }
  .redirect-login{
    font-size: 12px;
  }
</style>

<template>
  <div class="app-register">
    <div class="container">
      <div class="col-xs-6 col-xs-offset-3 col-md-4 col-md-offset-4 register-panel">
        <div class="panel panel-info">
          <div class="panel-heading text-center">
            注册Any-Mock
          </div>
          <div class="panel-body">
            <form class="form-signin" role="form">
              <input type="text" class="form-control" placeholder="账户名" required autofocus v-model="user.username">
              <br>
              <input type="password" class="form-control" placeholder="密码" required v-model="user.password">
              <br>
              <input type="password" class="form-control" placeholder="重复密码" required v-model="user.confirmPassword">
              <br>
              <button class="btn btn-primary btn-block" type="submit" @click.prevent="doLogin()">注&nbsp;册</button>
              <br>
              <div class="redirect-login">
                已有账号？<a href="javascript:void(0)" v-link="{path: '/login'}">点此</a> 登录
              </div>
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
          password: '',
          confirmPassword: ''
        },
        remember: false
      };
    },
    created() {
    },
    methods: {
      doLogin() {
        if(!this.user.username || !this.user.password){
          return layer.msg('username and password required.');
        }
        if(this.user.password !== this.user.confirmPassword){
          return layer.msg('password is not equal to confirm password.');
        }
        ajax.post(`${AppConf.apiHost}/manage/register`, this.user)
        .then(res => {
          let data = res.json();
          layer.msg('register successfully.', { time: 1500 }, () => {
            this.$router.go('/login');
          });
        });
      }
    }
  };
</script>