export const adMixin = {
data() {
    return {
      previewImage: null,
      filterText: '',
      itemForDelete: {},
      itemForInfo: {},
      itemForUpdate: {},
      showDeleteModal: false,
      showInfoModal: false,
      showUpdateModal: false,
      showAddModal: false,
      showAddModal: false,
      copyOfItemForUpdate: {},
    };
  },
  methods: {
    onDeleteIcon(ad) {
      this.itemForDelete = ad;
      this.showDeleteModal = true;
    },
    onUpdateIcon(ad) {
      this.itemForUpdate = ad;
      this.showUpdateModal = true;
      this.copyOfItemForUpdate = Object.assign({}, ad);
    },
    onAddIcon() {
      this.showAddModal = true;
    },
    showInfo(ad) {
      this.itemForInfo = ad;
      this.showInfoModal = true;
    },
    loggedUser(ad) {
      let userId = this.userProfile.id;
      return userId===ad.userId ? true : false;
    }
  }
}