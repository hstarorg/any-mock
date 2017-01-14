export default {
  data() {
    return {
      projectList: [1, 2, 3, 4, 5, 6]
    };
  },
  methods: {
    goProjectDetail() {
      this.$router.push(`project/${'xxxx'}`);
    }
  }
};
