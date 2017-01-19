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
    this.getProjectGroups();
    this.initApi();
  },
  computed: {
    pathForApiList() {
      return `/project/${this.projectId}/apis`;
    },
    finalAddress() {
      return `${this.finalAddressHost}${this.api.path}`;
    },
    groupName() {
      let g = this.groupList.find(x => x.groupId === this.api.groupId);
      if (g) {
        return g.name;
      }
      return '';
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
    gotoEdit() {
      this.$router.push(`/project/${this.projectId}/api/${this.apiId}/edit`);
    },
    getProjectGroups() {
      ajax.get(`${AppConf.apiHost}/project/${this.projectId}`)
        .then(p => {
          this.groupList = p.groups;
          this.api.groupId = this.groupList[0].groupId;
        });
    }
  }
}
