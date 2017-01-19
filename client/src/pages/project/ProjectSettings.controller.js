import { ajax } from './../../common';

export default {
  data() {
    return {
      projectId: '',
      memberName: '',
      project: {
        name: '',
        description: '',
        users: []
      }
    }
  },
  created() {
    this.projectId = this.$route.params.id;
    this.loadProject();
  },
  methods: {
    loadProject() {
      ajax.get(`${AppConf.apiHost}/project/${this.projectId}`)
        .then(project => {
          this.project.name = project.name;
          this.project.description = project.description;
          this.project.users = project.users;
        });
    },
    addMember() {
      ajax.post(`${AppConf.apiHost}/project/${this.projectId}/member`, { memberName: this.memberName })
        .then(data => {
          this.memberName = '';
          this.project.users.push(data);
        });
    },
    updateProject() {
      alert('todo...');
    }
  }
};
