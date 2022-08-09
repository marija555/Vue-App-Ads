<template>
<Modal v-model="showAddModal" modalClass="modal-wrapper">
      <h2 class="add__modal-title">Add new Ad</h2>
      <div class="modal-content">
        <h3 class="modal-content-name">Name</h3>
        <input
          placeholder="Enter Name"
          class="modal__ad__name-input"
          :maxlength="25"
          v-model="adAdded.name"
          type="text">
        <h3 class="modal-content-name">Price</h3>
        <input
          placeholder="Enter Price"
          class="modal__ad__price-input"
          :maxlength="25"
          v-model="adAdded.price"
          type="text">
        <h3 class="modal-content-name">Location</h3>
        <input
          placeholder="Enter Location"
          class="modal__ad__location-input"
          :maxlength="25"
          v-model="adAdded.location"
          type="text">
        <h3 class="modal-content-name"> Phone</h3>
        <input
          placeholder="Enter Phone"
          class="modal__ad__phone-input"
          :maxlength="25"
          v-model="adAdded.phone"
          type="text">
        <h3 class="modal-content-name">Image</h3>
        <img
          class="image-preview"
          :src="adAdded.src">
        <button
          @click="onPickFile()"
          class="upload-image-btn btn btn-light">
            Upload Image
        </button>
        <input
          ref="fileInput"
          class="add__modal-image-btn"
          style="display: none"
          accept="image/*"
          type="file"
          @change="onFilePicked"
        />
        <h3 class="modal-content-name">Description</h3>
        <textarea
          placeholder="Enter Description"
          class="modal__ad__desc-textarea"
          name="desc"
          id="desc"
          :maxlength="1350"
          v-model="adAdded.description"
        />
      </div>
      <div class="delete-action-buttons">
        <button class="btn btn-primary" @click="confirmAdd(adAdded)">
          Confirm
        </button>
        <button class="btn btn-danger" @click="closeAddModal">Cancel</button>
      </div>
    </Modal>
</template>

<script>
export default {
  data() {
    return {
      previewImage: null,
      adAdded: {
        name: "",
        src: "",
        description: "",
        phone:'',
        location:'',
        price:''
      },
    };
  },
  props: {
    showAddModal: Boolean,
  },
  methods: {
    onFilePicked(event) {
      const files = event.target.files;
      let fileName = files[0].name;
      if (fileName.lastIndexOf(".") <= 0) {
        alert("Please provide image");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.adAdded.src = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.previewImage = files[0];
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    async confirmAdd() {
      if(!this.previewImage) {
        return
      }
      const computerAd = {
        name: this.adAdded.name,
        src: this.previewImage,
        description: this.adAdded.description,
        location: this.adAdded.location,
        phone: this.adAdded.phone,
        price: this.adAdded.price
      }
      await this.$store.dispatch('createComputerAd', computerAd);
      this.$store.dispatch('getComputerCollection');
      this.closeAddModal();
    },
    closeAddModal() {
      this.showAddModal = false;
      this.$emit('addDialogClosed', this.showAddModal);
    },
  },
};
</script>

<style scoped>
  @import '../../../assets/dialogs.css';
</style>
