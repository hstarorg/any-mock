import { layer } from './../../common';
export default {
  data() {
    return {
      projectId: '',
      currentMenu: 'apis'
    }
  },
  created() {
    this.projectId = this.$route.params.id;
  },
  methods: {
    goPage(page) {
      this.currentMenu = page;
      this.$router.push(`/project/${this.projectId}/${page}`);
    }
  }
};
