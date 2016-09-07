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
            Register To Any-Mock
          </div>
          <div class="panel-body">
            <form class="form-signin" role="form">
              <input type="text" class="form-control" placeholder="user name" required autofocus v-model="user.username">
              <br>
              <input type="password" class="form-control" placeholder="password" required v-model="user.password">
              <br>
              <input type="password" class="form-control" placeholder="confirm password" required v-model="user.confirmPassword">
              <br>
              <button class="btn btn-primary btn-block" type="submit" @click.prevent="doLogin()">Register</button>
              <br>
              <div class="redirect-login">
                Has account? Please <a href="javascript:void(0)" v-link="{path: '/login'}"><b class="text-danger">click this</b></a> to login.
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