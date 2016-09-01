<style scoped>
  .login-panel{
    margin-top: 20%;
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
    methods: {
      doLogin() {
        localStorage.setItem('token', 'xxx');
        this.$router.go('/');
      }
    }
  };
</script>