export default {
  data() {
    return {
      menuList: [
        { name: '/', text: 'Dashboard', url: '/', icon: 'dashboard' },
        { name: 'teams', text: 'Team', url: '/team', icon: 'group' },
        { name: 'project', text: 'Project', url: '/project', icon: 'cubes' },
        { name: 'settings', text: 'Settings', url: '/settings', icon: 'cogs' }
      ],
      currentMenu: '/'
    };
  },
  mounted() {
    let menu = this.menuList.find(x => x.url === this.$route.path);
    if (menu) {
      this.currentMenu = menu.name;
    }
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    doMenuClick(menu) {
      this.currentMenu = menu.name;
      this.$router.push(menu.url);
    },
    signOut() {
      localStorage.removeItem('x-token');
      this.$router.push('/login');
    }
  }
};
