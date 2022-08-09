<template>
    <Modal v-model="showUpdateModal" modalClass="modal-wrapper">
      <h2 class="add__modal-title">Update Ad</h2>
      <div class="modal-content">
        <img :src="itemForUpdate.src" class="preview-image" />
        <h3 class="modal-content-name">Name</h3>
        <input
          class="modal__ad__name-input"
          type="text"
          :maxlength="25"
          v-model.lazy="itemForUpdate.name"
        />
        <h3 class="modal-content-price">Price</h3>
        <input
          class="modal__ad__price-input"
          type="text"
          :maxlength="25"
          v-model.lazy="itemForUpdate.price"
        />
        <h3 class="modal-content-phone">Phone</h3>
        <input
          class="modal__ad__phone-input"
          type="text"
          :maxlength="25"
          v-model.lazy="itemForUpdate.phone"
        />
        <h3 class="modal-content-location">Location</h3>
        <input
          class="modal__ad__location-input"
          type="text"
          :maxlength="25"
          v-model.lazy="itemForUpdate.location"
        />
        <h3 class="modal-content-desc">Description</h3>
        <textarea
          name="desc"
          class="modal__ad__desc-textarea"
          placeholder="Enter Description"
          :maxlength="1350"
          v-model.lazy="itemForUpdate.description"
        >
        </textarea>
      </div>
      <div class="delete-action-buttons">
        <button class="btn btn-primary" @click="confirmUpdate(itemForUpdate)">
          Confirm
        </button>
        <button class="btn btn-danger" @click="closeUpdateModal">Cancel</button>
      </div>
    </Modal>
</template>

<script>
  export default {
    props: {
      showUpdateModal: Boolean,
      itemForUpdate: Object,
      copyOfItemForUpdate: Object
    },
    methods: {
        closeUpdateModal() {
      Object.assign(this.itemForUpdate, this.copyOfItemForUpdate);
      this.showUpdateModal = false;
      this.$emit('updateDialogClosed', this.showUpdateModal);
      this.$emit('originalAd', this.itemForUpdate);
    },
    async confirmUpdate() {
      await this.$store.dispatch("updateClotheAd", this.itemForUpdate);
      this.closeUpdateModal();
      this.$store.dispatch("getClotheCollection");
    },
    }
  };
</script>

<style scoped>
  @import '../../../assets/dialogs.css';
</style>