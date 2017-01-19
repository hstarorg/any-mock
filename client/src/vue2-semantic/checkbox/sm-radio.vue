<style lang="stylus">
  .sm-radio{}
</style>
<template>
  <div class="ui radio checkbox cye-lm-tag sm-radio" :class="{checked: checked}" @click.stop="checked = !checked">
    <input type="checkbox" :name="name" tabindex="0" class="hidden" v-model="checked">
    <label class="cye-lm-tag"><slot></slot></label>
  </div>
</template>
<script>
  export default {
    name: 'sm-radio',
    props: {
      name: {
        type: String
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
