import { layer } from './../../common';
export default {
  data() {
    return {
      projectId: ''
    }
  },
  created() {
    this.projectId = this.$route.params.id;
  },
  methods: {
    doApiOperate(type, api) {
      if (type === 'detail') {

      } else if (type === 'edit') {
        this.$router.push(`/project/${this.projectId}/api/${api.id}/edit`);
      } else if (type === 'delete') {
        layer.error('禁止删除');
      }
    }
  }
};
