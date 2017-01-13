function unpacker_filter(source) {
  var trailing_comments = '',
    comment = '',
    unpacked = '',
    found = false;
  // cut trailing comments
  do {
    found = false;
    if (/^\s*\/\*/.test(source)) {
      found = true;
      comment = source.substr(0, source.indexOf('*/') + 2);
      source = source.substr(comment.length).replace(/^\s+/, '');
      trailing_comments += comment + "\n";
    } else if (/^\s*\/\//.test(source)) {
      found = true;
      comment = source.match(/^\s*\/\/.*/)[0];
      source = source.substr(comment.length).replace(/^\s+/, '');
      trailing_comments += comment + "\n";
    }
  } while (found);
  var unpackers = [P_A_C_K_E_R, Urlencoded, JavascriptObfuscator, MyObfuscate];
  for (var i = 0; i < unpackers.length; i++) {
    if (unpackers[i].detect(source)) {
      unpacked = unpackers[i].unpack(source);
      if (unpacked != source) {
        source = unpacker_filter(unpacked);
      }
    }
  }
  return trailing_comments + source;
}

export default {
  name: 'ace-editor',
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
    },
    readonly: {
      type: Boolean,
      default: false
    }
  }, //['value', 'mode', 'theme', 'height'],
  data() {
    return {
      editorId: `ace-editor-${Math.random().toString(16).replace('.', '')}`,
      editor: null,
      editorValueCache: ''
    };
  },
  mounted() {
    this.$nextTick(function () {
      let editor = this.editor = ace.edit(this.editorId);
      editor.$blockScrolling = Infinity;
      editor.session.setMode(`ace/mode/${this.mode}`);
      editor.setTheme(`ace/theme/${this.theme}`);
      editor.setFontSize(14);
      editor.setOption('enableBasicAutocompletion', true);
      editor.setOption('enableEmmet', true);
      editor.setOption('enableLiveAutocompletion', false);
      editor.setOption('tabSize', 2);
      editor.setOption('enableSnippets', true);
      editor.setOption('showPrintMargin', false);
      editor.setReadOnly(this.readonly);
      editor.setValue(this.value, 1);
      let self = this;
      editor.commands.addCommand({
        name: 'format',
        bindKey: { win: 'Shift-Alt-F', mac: 'Command-Option-F' },
        exec(editor) {
          let val = unpacker_filter(editor.getValue());
          let formattedVal = self.beautifyCode(val);
          editor.setValue(formattedVal, 1);
        }
      });
      editor.on('change', function (e) {
        let val = self.editor.getValue();
        self.$emit('input', val);
        self.editorValueCache = val;
      });
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    beautifyCode(val) {
      let opt = {
        brace_style: 'collapse',
        break_chained_methods: false,
        comma_first: false,
        e4x: false,
        end_with_newline: true,
        indent_char: ' ',
        indent_inner_html: false,
        indent_scripts: 'normal',
        indent_size: '2',
        jslint_happy: false,
        keep_array_indentation: false,
        max_preserve_newlines: '5',
        preserve_newlines: true,
        space_before_conditional: true,
        unescape_strings: false,
        wrap_line_length: '0'
      };
      if (this.mode === 'javascript') {
        return window.js_beautify(val, opt);
      } else if (this.mode === 'html') {
        return window.html_beautify(val, opt);
      } else if (this.mode === 'css') {
        return window.css_beautify(val, opt);
      }
      return val;
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (this.editorValueCache !== newVal) {
        this.editor.setValue(newVal, 1);
      }
    },
    mode(newVal, oldVal) {
      this.editor.getSession().setMode(`ace/mode/${newVal}`);
    },
    theme(newVal, oldVal) {
      this.editor.setTheme(`ace/theme/${newVal}`);
    },
    readonly(newVal) {
      this.editor.setReadOnly(newVal);
    }
  }
};
