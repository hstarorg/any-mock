<style>

</style>

<template>
  <router-view></router-view>
</template>

<script>
  import store from './vuex/store';
  export default {
    store, // 增加Store
    // replace: false,
    data (){
      return {};
    }
  };
</script>