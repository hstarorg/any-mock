<style scoped lang="stylus">
  .ace-editor{
    pre{
      border-radius: 0;
    }
  }
</style>
<template>
  <div class="ace-editor">
    <pre :id="editorId" :style="{'min-height': this.height + 'px'}"></pre>
  </div>
</template>
<script src="./ace-editor.controller.js"></script>
