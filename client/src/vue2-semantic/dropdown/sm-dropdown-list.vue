<style lang="stylus">
  .sm-dropdown-list{

  }
</style>
<template>
  <div class="ui dropdown selection sm-dropdown-list" :class="innerClass">
    <div class="default text">{{placeholder}}</div>
    <i class="dropdown icon"></i>
    <div class="menu">
      <div class="item" :data-value="item.value" v-for="item in innerData">{{item.text}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sm-dropdown-list',
    props: {
      data: {
        type: Array,
        required: true
      },
      placeholder: {
        type: String,
        default: ''
      },
      textField: {
        type: String,
        default: 'text'
      },
      valueField: {
        type: String,
        default: 'value'
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
        innerValue: null
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
      },
      innerData() {
        if (this.data.length <= 0) {
          return [];
        }
        let result;
        if (typeof this.data[0] !== 'object') {
          result = this.data.map(x => ({ value: x, text: x }));
        } else {
          result = this.data.map(x => ({ value: x[this.valueField], text: x[this.textField] }));
        }
        return result;
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
        this.$element.dropdown({
          onChange(value, text, $selectedItem) {
            self.$emit('input', value);
          }
        });
      },
      setValue(val) {
        setTimeout(() => {
          this.$element.dropdown('set selected', val);
        });
      }
    }
  }
</script>
