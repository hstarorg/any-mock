import { ajax } from './../../common';
export default {
  data() {
    return {
      projectId: '',
      apiList: []
    }
  },
  created() {
    this.projectId = this.$route.params.id;
    this.loadApiList();
  },
  computed: {
    pathForCreateApi() {
      return `/project/${this.projectId}/new`;
    }
  },
  methods: {
    loadApiList() {
      ajax.get(`${AppConf.apiHost}/project/${this.projectId}/api`)
        .then(data => {
          this.apiList = data;
          console.log(data);
        });
    }
  }
};
