import { ajax, layer } from './../../common';

export default {
  data() {
    return {
      project: {
        name: '',
        description: ''
      }
    };
  },
  methods: {
    doSubmit() {
      ajax.post(`${AppConf.apiHost}/project/new`, this.project)
        .then(() => {
          layer.msg('Create project successfully.', () => {
            this.$router.push('/project');
          });
        });
    }
  }
};
