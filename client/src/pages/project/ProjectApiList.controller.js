import { ajax, layer } from './../../common';
export default {
  data() {
    return {
      projectId: '',
      apiList: [],
      groupModalShown: false,
      groupList: [],
      projectOwner: ''
    }
  },
  created() {
    this.projectId = this.$route.params.id;
    this.loadProject();
    this.loadApiList();
  },
  computed: {
    pathForCreateApi() {
      return `/project/${this.projectId}/new`;
    },
    isProjectOwner() {
      return this.$store.state.userInfo.id === this.projectOwner;
    }
  },
  methods: {
    loadProject() {
      ajax.get(`${AppConf.apiHost}/project/${this.projectId}`)
        .then(project => {
          this.projectOwner = project.createBy;
        });
    },
    loadApiList() {
      ajax.get(`${AppConf.apiHost}/project/${this.projectId}/api`)
        .then(data => {
          this.apiList = data;
        });
    },
    doApiOperate(type, api) {
      if (type === 'detail') {
        this.$router.push(`/project/${this.projectId}/api/${api.id}`);
      } else if (type === 'edit') {
        this.$router.push(`/project/${this.projectId}/api/${api.id}/edit`);
      } else if (type === 'delete') {
        layer.error('禁止删除');
      }
    },
    showGroupModal() {
      this.groupModalShown = true;
      this.loadGroupList();
    },
    loadGroupList() {
      ajax.get(`${AppConf.apiHost}/project/${this.projectId}/group`)
        .then(data => {
          this.groupList = data.map(x => {
            x.edit = false;
            x.editName = x.name;
            return x;
          });
        });
    },
    checkApiGroup() {
      if (this.groupList.find(x => x.edit)) {
        layer.error('Has one group in editing mode, please check.');
        return false;
      }
      return true;
    },
    changeToEditMode(group) {
      if (this.checkApiGroup()) {
        group.edit = true;
      }
    },
    addNewGroup() {
      if (this.checkApiGroup()) {
        this.groupList.push({
          name: '',
          apiCount: 0,
          edit: true
        });
      }
    },
    cancelGroupOperate(group) {
      if (!group.groupId) { // 整体移除
        this._removeGroupFromGroupList(group);
      } else { // 取消编辑
        group.edit = false;
      }
    },
    _removeGroupFromGroupList(group) {
      for (let i = this.groupList.length - 1; i >= 0; i--) {
        if (group === this.groupList[i]) {
          this.groupList.splice(i, 1);
          return;
        }
      }
    },
    deleteApiGroup(group) {
      if (this.groupList && this.groupList[0] === group) {
        return layer.error('Can\'t delete the first group');
      }
      ajax.delete(`${window.AppConf.apiHost}/project/${this.projectId}/group/${group.groupId}`)
        .then(() => {
          this._removeGroupFromGroupList(group);
          layer.msg('Delete API Group Successfully.');
        });
    },
    saveApiGroup(group) {
      let p;
      if (group.groupId) { // Update
        p = ajax.put(`${window.AppConf.apiHost}/project/${this.projectId}/group/${group.groupId}`, { groupName: group.editName });
      } else { // Create
        p = ajax.post(`${window.AppConf.apiHost}/project/${this.projectId}/group/new`, { groupName: group.editName });
      }
      p.then(() => {
        group.name = group.editName;
        group.edit = false;
        layer.msg('Save Successfully.');
      });
    }
  }
};
