<style>

</style>

<template>
  <div>
    <h3>Welcome, You can <a v-link="{path: '/app'}">Create New App</a></h3>
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