import { aceEditor } from 'components';
import { ajax, layer, responseStatus } from './../../common';

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
      groupList: [],
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
    this.apiId = this.$route.params.apiId;
    // this.getProjectGroups();
    // this.initApi();
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
    initApi() {
      if (this.apiId) {
        ajax.get(`${AppConf.apiHost}/project/${this.projectId}/api/${this.apiId}`)
          .then(api => {
            Object.keys(this.api).forEach(k => {
              this.api[k] = api[k];
            });
          })
          .catch(() => {
            this.$router.push(`/project/${this.projectId}/apis`);
          });
      }
    },
    getProjectGroups() {
      ajax.get(`${AppConf.apiHost}/project/${this.projectId}`)
        .then(p => {
          this.groupList = p.groups;
          this.api.groupId = this.groupList[0].groupId;
        });
    },
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
      let apiCopy = _.cloneDeep(this.api);
      let headers = [];
      let hasHeaderError = false;
      apiCopy.res.headers.forEach(h => {
        if (!h.key && !h.value) {
          return;
        }
        if (h.key && h.value) {
          return headers.push(h);
        }
        hasHeaderError = true;
      });
      if (hasHeaderError) {
        return layer.error('Response headers must provider key and value.');
      }
      apiCopy.res.headers = headers;
      if (this.apiId) { // Edit
        ajax.put(`${AppConf.apiHost}/project/${this.projectId}/api/${this.apiId}`, apiCopy)
          .then(() => {
            layer.msg('Save api successfully.');
          });
      } else { // Add
        ajax.post(`${AppConf.apiHost}/project/${this.projectId}/api/new`, apiCopy)
          .then(data => {
            layer.msg('Create api successfully.', () => {
              this.$router.push(`/project/${this.projectId}/apis`);
            });
          });
      }
    }
  }
}
