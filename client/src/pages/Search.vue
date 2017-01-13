<template>
  <div class="app-search">
    Please waiting...
  </div>
</template>

<script>
  import { eventBus } from './../common';
  export default {
    created() {
      eventBus.emit('welcome', 'aaa');
    }
  };
</script>
