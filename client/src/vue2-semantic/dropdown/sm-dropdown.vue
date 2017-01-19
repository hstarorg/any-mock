<style lang="stylus">
  .sm-dropdown{

  }
</style>
<template>
  <div class="ui green dropdown simple label sm-dropdown" :class="innerClass">
    <div class="text">{{content}}</div>
    <i class="dropdown icon"></i>
    <div class="menu">
      <div class="item" v-for="item in data" @click="setValue(item)">{{item}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sm-dropdown',
    props: {
      data: {
        type: Array,
        required: true
      },
      class: {
        type: String,
        default: ''
      },
      value: null
    },
    data() {
      return {
        $element: null,
        content: ''
      };
    },
    mounted() {
      this.$element = $(this.$el);
      this.init();
      this.setValue(this.value);
    },
    computed: {
      innerClass() {
        let classArr = [];
        return classArr;
      }
    },
    watch: {
      value(newVal, oldVal) {
        this.setValue(newVal);
      }
    },
    methods: {
      init() {
        let self = this;
        this.$element.dropdown();
      },
      setValue(val) {
        this.content = val;
        this.$emit('input', value);
        this.$element.dropdown('set selected', val);
      }
    }
  }
</script>
