import { ajax } from './../../common';
export default {
  data() {
    return {
      donorList: []
    };
  },
  created() {
    this.getDonorList();
  },
  methods: {
    getDonorList() {
      ajax.get(`http://chat.hstar.org:8601/rJObHZUwl/get_donors`)
        .then(data => {
          this.donorList = data;
        });
    }
  }
};
