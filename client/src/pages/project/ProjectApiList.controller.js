import { ajax } from './../../common';
export default {
  data() {
    return {
      projectId: '',
      apiList: [],
      groupModalShown: false,
      groupList: []
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
        });
    },
    doApiOperate(type, api) {
      if (type === 'detail') {
        this.$router.push(`/project/${this.projectId}/api/${api.id}`);
      } else if (type === 'edit') {
        this.$router.push(`/project/${this.projectId}/api/${api.id}/edit`);
      } else if (type === 'delete') {
        layer.error('禁止删除');
      }
    },
    showGroupModal() {
      this.groupModalShown = true;
      this.loadGroupList();
    },
    loadGroupList() {
      ajax.get(`${AppConf.apiHost}/project/${this.projectId}/group`)
        .then(data => {
          this.groupList = data;
        });
    },
    addNewGroup() {

    },
    deleteGroup() {

    },
    saveGroup() {
      alert('save');
      this.shown = false;
    }
  }
};
