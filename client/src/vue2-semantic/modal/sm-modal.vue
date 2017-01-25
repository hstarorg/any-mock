<style lang="stylus">
  .sm-modal{
    overflow: auto;
  }
</style>
<template>
  <div class="ui dimmer modals page transition fade sm-modal" :class="{active: value}">
    <div class="ui standard modal transition scrolling fade" :class="[animate, {active: value, in: value, out: !value || animating}]">
      <i class="close icon" v-if="closable" @click="onCancelClick"></i>
      <div class="header">
        <slot name="modal-header"></slot>
        <template v-if="!$slots['modal-header']">
          {{header}}
        </template>
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="actions">
        <slot name="modal-actions"></slot>
        <template v-if="!$slots['modal-actions']">
          <div class="ui button deny cancel" @click.prevent="onCancelClick()">{{cancelText}}</div>
          <div class="ui positive right labeled icon button" @click.prevent="onOkClick()">
            {{okText}}
            <i class="checkmark icon"></i>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sm-modal',
    props: {
      value: null,
      header: { type: String, default: '' },
      okText: { type: String, default: 'OK' },
      cancelText: { type: String, default: 'Cancel' },
      closable: { type: Boolean, default: true },
      animate: { type: String, default: 'horizontal flip' }
    },
    data() {
      return {
        animating: false
      };
    },
    methods: {
      onCancelClick() {
        this.animating = true;
        setTimeout(() => {
          this.$emit('input', false);
          this.animating = false;
        }, 400);
        this.$emit('cancel');
      },
      onOkClick() {
        this.$emit('ok');
      }
    }
  };
</script>
