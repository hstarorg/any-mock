import { aceEditor } from 'components';
import { responseStatus } from './../../common';

export default {
  components: {
    aceEditor
  },
  data() {
    return {
      projectId: '',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      statusList: responseStatus,
      contentTypeList: ['application/json', 'text/json', 'text/plain', 'application/xml', 'text/xml'],
      disabledContentType: true,
      editorMode: 'json',
      apiId: '',
      api: {
        groupId: '',
        name: '',
        path: '',
        method: 'GET',
        res: {
          headers: [{
            key: 'x-powered-by',
            value: 'any-mock'
          }, { key: '', value: '' }],
          contentType: 'application/json',
          status: 200,
          body: ''
        },
        filters: [],
        isEnable: true,
        enableProxy: false,
        proxyUrl: ''
      }
    };
  },
  created() {
    this.projectId = this.$route.params.id;
  },
  mounted() {
    let self = this;
    $(this.$refs.ctDropdown).dropdown({
      onChange(value, text, $selectedItem) {
        $selectedItem.parent().parent().find('>div:eq(0)').text('Choose');
        if (value === 'custom') {
          self.disabledContentType = false;
        } else {
          self.disabledContentType = true;
          self.api.res.contentType = value;
        }
      }
    });
  },
  computed: {
    pathForApiList() {
      return `/project/${this.projectId}/apis`;
    },
    finalAddressHost() {
      return `${AppConf.mockApiHost}/${this.projectId}`;
    },
    finalAddress() {
      return `${this.finalAddressHost}${this.api.path}`;
    }
  },
  watch: {
    ['api.res.contentType'](newVal) {
      this.setEditorMode(newVal);
    }
  },
  methods: {
    removeResHeader(header) {
      let headerIndex = this.api.res.headers.indexOf(header);
      this.api.res.headers.splice(headerIndex, 1);
    },
    addResHeader() {
      this.api.res.headers.push({
        key: '',
        value: ''
      });
    },
    setEditorMode(contentType) {
      if (contentType.indexOf('json') >= 0) {
        this.editorMode = 'json';
      } else if (contentType.indexOf('xml') >= 0) {
        this.editorMode = 'xml';
      } else {
        this.editorMode = 'text';
      }
    },
    doSubmit() {
      console.log(this.api);
    }
  }
}
