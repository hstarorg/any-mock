<template>
  <div class="app-search"></div>
</template>

<script>
  import { eventBus } from './../common';
  export default {
    created() {
      eventBus.emit('welcome', 'aaa');
    }
  };
</script>