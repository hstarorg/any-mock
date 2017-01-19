<style lang="stylus">
  .app-login{
    min-height: 100vh;
    background: #DADADA;
    .aligned.grid{
      margin: 0;
    }
    .column{
      margin-top: calc(50vh - 220px);
      width: 450px !important;
    }
  }
  .login-panel {
    margin-top: calc(50vh - 150px);
  }

  .redirect-register {
    font-size: 12px;
  }
</style>

<template>
  <div class="app-login">
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui teal image header">
          <div class="content">
            Log-in to ANY-MOCK
          </div>
        </h2>
        <form class="ui large form" @submit.prevent="doLogin()">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" placeholder="user name" required autofocus v-model="user.username">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" placeholder="password" required v-model="user.password">
              </div>
            </div>
            <div class="field text-left">
              <sm-checkbox v-model="remember">Remember me</sm-checkbox>
            </div>
            <button class="ui fluid large teal submit button">Login</button>
          </div>
          <div class="ui error message"></div>
        </form>

        <div class="ui message">
          New to us?
          <router-link :to="{path: '/register'}"><b class="text-danger">Sign Up</b></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ajax } from './../common';
  import { authService } from './../services';
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
      if (username) {
        this.user.username = username;
        this.remember = true;
      }
    },
    methods: {
      doLogin() {
        if (!this.user.username || !this.user.password) {
          return layer.msg('username and password required.');
        }
        authService.login(this.user)
          .then(() => {
            if (this.remember) {
              localStorage.setItem('username', this.user.username);
            } else {
              localStorage.removeItem('username');
            }
            this.$router.push('/');
          });
      }
    }
  };
</script>
