<template>
  <div class="ui modal sm-modal">
    <i class="close icon"></i>
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
        <div class="ui button cancel">Cancel</div>
        <div class="ui button ok">OK</div>
      </template>
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
      closable: { type: Boolean, default: false }
    },
    data() {
      return {
        $modal: null
      };
    },
    mounted() {
      let self = this;
      this.$modal = $(this.$el).modal({
        // context: $(this.$el.parent),
        closable: this.closable,
        onVisible() {
          self.$emit('input', true);
        },
        onHidden() {
          self.$emit('input', false);
        },
        onApprove() {
          self.$emit('ok');
          return false;
        },
        onDeny() {
          self.$emit('input', false);
          self.$emit('cancel');
        }
      });
      this.setModalStatus();
    },
    watch: {
      value(newVal) {
        this.setModalStatus();
      }
    },
    methods: {
      setModalStatus() {
        this.$modal.modal(this.value ? 'show' : 'hide');
      }
    }
  };
</script>
