<style scoped>
  .login-panel {
    margin-top: calc(50vh - 150px);
  }
  
  .redirect-register {
    font-size: 12px;
  }
</style>

<template>
  <div class="app-login">
    <div class="container">
      <div class="col-xs-6 col-xs-offset-3 col-md-4 col-md-offset-4 login-panel">
        <div class="panel panel-danger">
          <div class="panel-heading text-center">
            Log In Any-Mock
          </div>
          <div class="panel-body">
            <form class="form-signin" role="form">
              <input type="text" class="form-control" placeholder="user name" required autofocus v-model="user.username">
              <br>
              <input type="password" class="form-control" placeholder="password" required v-model="user.password">
              <div class="checkbox">
                <label>
                  <input type="checkbox" value="remember-me" v-model="remember"> Remember
                </label>
              </div>
              <button class="btn btn-danger btn-block" type="submit" @click.prevent="doLogin()">Log&nbsp;In</button>
              <br>
              <div class="redirect-register">
                No account? Please <a href="javascript:void(0)" v-link="{path: '/register'}"><b class="text-danger">click this</b></a>                to register.
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
  import { setUserInfo } from './../vuex/actions';
  export default {
    vuex: {
      actions: {
        setUserInfo
      }
    },
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
        if(!this.user.username || !this.user.password){
          return layer.msg('username and password required.');
        }
        ajax.post(`${AppConf.apiHost}/manage/login`, this.user)
        .then(res => {
          if(this.remember){
            localStorage.setItem('username', this.user.username);
          }else{
            localStorage.removeItem('username');
          }
          let data = res.json();
          this.setUserInfo({username: this.user.username});
          localStorage.setItem('token', data.token);
          this.$router.go('/');
        });
      }
    }
  };
</script>