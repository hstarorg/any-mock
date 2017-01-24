import { ajax, layer } from './../../common';

export default {
  data() {
    return {
      projectId: '',
      groupList: [],
      shown: true
    };
  },
  created() {
    this.projectId = this.$route.params.id;
    this.loadGroupList();
  },
  methods: {

  }
};
