import { ajax } from './../../common';
export default {
  data() {
    return {
      projectList: []
    };
  },
  created() {
    this.loadProjectList();
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
