const menus = ['team', 'project', 'settings', 'about'];
export default {
  data() {
    return {
      menuList: [
        { name: '/', text: 'Dashboard', url: '/', icon: 'dashboard' },
        // { name: 'team', text: 'Team', url: '/team', icon: 'group' },
        { name: 'project', text: 'Project', url: '/project', icon: 'cubes' },
        // { name: 'settings', text: 'Settings', url: '/settings', icon: 'cogs' },
        { name: 'about', text: 'About', url: '/about', icon: 'info' }
      ],
      currentMenu: '/'
    };
  },
  created() {
    this.setCurrentMenu();
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
  watch: {
    $route() {
      this.setCurrentMenu();
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
    },
    setCurrentMenu() {
      let path = this.$route.path;
      for (let m of menus) {
        if (path.startsWith(`/${m}`)) {
          this.currentMenu = m;
          return;
        }
      }
    }
  }
};
