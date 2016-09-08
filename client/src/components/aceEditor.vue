<template>
  <div class="ace-editor">
    <pre id="{{editorId}}" :style="{height: this.height + 'px'}"></pre>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: String,
        required: true
      },
      mode: {
        type: String,
        default: 'json'
      },
      theme: {
        type: String,
        default: 'tomorrow'
      },
      height: {
        type: Number,
        default: 100
      }
    }, //['value', 'mode', 'theme', 'height'],
    name: 'ace-editor',
    data(){
      return {
        editorId: `ace-editor-${Date.now()}`,
        editor: null,
        editorValueCache: ''
      };
    },
    ready(){
      let editor = this.editor = ace.edit(this.editorId);
      editor.session.setMode(`ace/mode/${this.mode}`);
      editor.setTheme(`ace/theme/${this.theme}`);
      editor.setFontSize(14);
      editor.setValue(this.value);
      let self = this;
      this.editor.on('change', function(e){
        self.value = self.editor.getValue();
        self.editorValueCache = self.value;
      });
    },
    beforeDestory(){
      this.editor.destroy();
    },
    methods: {
    },
    watch: {
      value(newVal, oldVal) {
        if(this.editorValueCache !== newVal){
          this.editor.setValue(newVal, 1);
        }        
      },
      mode(newVal, oldVal) {
        this.editor.getSession().setMode(`ace/mode/${newVal}`);
      },
      theme(newVal, oldVal)  {
        this.editor.setTheme(`ace/theme/${newVal}`);
      }
    }
  };
</script>