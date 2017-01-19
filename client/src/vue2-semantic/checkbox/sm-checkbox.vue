<style lang="stylus">
  .sm-checkbox{}
</style>
<template>
  <div class="ui checkbox cye-lm-tag sm-checkbox" :class="innerClass" @click.stop="checked = !checked">
    <input type="checkbox" :name="name" tabindex="0" class="hidden" v-model="checked">
    <label class="cye-lm-tag"><slot></slot></label>
  </div>
</template>
<script>
  export default {
    name: 'sm-checkbox',
    props: {
      type: {
        type: String,
        default: ''
      },
      name: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      class: {
        type: String,
        default: ''
      },
      value: null
    },
    data() {
      return {
        checked: false
      };
    },
    mounted() {
      this.checked = this.value;
    },
    computed: {
      innerClass() {
        let classArr = [];
        if (this.checked) {
          classArr.push('checked');
        }
        if (this.disabled) {
          classArr.push('disabled');
        }
        if (this.readonly) {
          classArr.push('read-only');
        }
        if (this.type) {
          classArr.push(this.type);
        }
        classArr.push(this.class || '');
        return classArr;
      }
    },
    watch: {
      checked(newVal) {
        this.$emit('input', newVal);
      },
      value(newVal) {
        this.checked = newVal;
      }
    }
  };
</script>
