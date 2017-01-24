import { layer } from './../../common';

const menus = ['apis', 'settings', 'group'];

export default {
  data() {
    return {
      projectId: '',
      currentMenu: 'apis'
    }
  },
  created() {
    this.projectId = this.$route.params.id;
    this.setCurrentMenu();
  },
  watch: {
    $route(newVal) {
      this.setCurrentMenu();
    }
  },
  methods: {
    goPage(page) {
      this.currentMenu = page;
      this.$router.push(`/project/${this.projectId}/${page}`);
    },
    setCurrentMenu() {
      let path = this.$route.path;
      for (let m of menus) {
        if (path.endsWith(m)) {
          this.currentMenu = m;
          return;
        }
      }
    }
  }
};
