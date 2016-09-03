<style>

</style>

<template>
  <div>
    <h1>Welcome, You can <a v-link="{path: '/app'}">创建应用</a></h1>
  </div>
</template>

<script>
  import { eventBus } from './../common';
  export default {
    created() {
      eventBus.on('welcome', (data)=>{
        console.log('welcome', data)
      }, this);
    }
  };
</script>