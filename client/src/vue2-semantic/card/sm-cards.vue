<template>
  <div class="sm-cards ui cards" :class="{link: isLink}">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'sm-cards',
    props: {
      isLink: {
        type: Boolean,
        default: false
      }
    }
  };
</script>
