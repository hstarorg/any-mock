<style lang="stylus">
  .page-register{
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
</style>

<template>
  <div class="page-register">
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui teal image header">
          <div class="content">
            Resigter to ANY-MOCK
          </div>
        </h2>
        <form class="ui large form" @submit.prevent="doRegister()">
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
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" placeholder="confirm password" required v-model="user.confirmPassword">
              </div>
            </div>
            <button class="ui fluid large teal submit button">Register</button>
          </div>
          <div class="ui error message"></div>
        </form>

        <div class="ui message">
          Has account?
          <router-link :to="{path: '/login'}"><b class="text-danger">Sign In</b></router-link>
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
        }
      };
    },
    methods: {
      doRegister() {
        if (!this.user.username || !this.user.password) {
          return layer.msg('username and password required.');
        }
        if (this.user.password !== this.user.confirmPassword) {
          return layer.msg('password is not equal to confirm password.');
        }
        ajax.post(`${AppConf.apiHost}/user/register`, this.user)
          .then(res => {
            layer.msg('register successfully.', { time: 1500 }, () => {
              this.$router.push('/login');
            });
          });
      }
    }
  };
</script>
