<template>
  <div class="ui segment sm-segment" :class="segmentClass">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'sm-segment',
    props: {
      type: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      class: {
        type: String,
        default: ''
      }
    },
    computed: {
      segmentClass() {
        let result = [];
        if (this.type) {
          result.push(this.type);
        }
        if (this.disabled) {
          result.push('disabled');
        }
        if (this.loading) {
          result.push('loading');
        }
        if (this.class) {
          result.push(this.class);
        }
        return result;
      }
    }
  }
</script>
