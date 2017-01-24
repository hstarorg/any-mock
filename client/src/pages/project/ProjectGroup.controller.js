import { ajax, layer } from './../../common';

export default {
  data() {
    return {
      projectId: '',
      groupList: []
    };
  },
  created() {
    this.projectId = this.$route.params.id;
    this.loadGroupList();
  },
  methods: {
    loadGroupList() {
      ajax.get(`${AppConf.apiHost}/project/${this.projectId}/groups`)
        .then(data => {
          this.groupList = data;
        });
    },
    addNewGroup() {

    },
    deleteGroup() {

    }
  }
};
