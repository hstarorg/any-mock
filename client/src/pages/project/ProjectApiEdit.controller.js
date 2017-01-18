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
    console.log(this.projectId);
  },
  computed: {
    pathForApiList() {
      return `/project/${this.projectId}/apis`;
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
    }
  }
}
