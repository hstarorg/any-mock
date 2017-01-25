import { ajax } from './../../common';
export default {
  data() {
    return {
      projectList: [],
    };
  },
  created() {
    this.loadProjectList();
  },
  computed: {
    userId() {
      return this.$store.state.userInfo.id;
    }
  },
  methods: {
    goProjectDetail(project) {
      this.$router.push(`project/${project.id}/apis`);
    },
    loadProjectList() {
      ajax.get(`${AppConf.apiHost}/project`)
        .then(data => {
          this.projectList = data;
        });
    }
  }
};
