<template> 
 <Modal v-model="showDeleteModal" modalClass="modal-wrapper">
      <h3>Removing Ad: {{itemForDelete.name}} </h3>
      <div class="delete-action-buttons">
        <button class="btn btn-primary" @click="confirmDelete(itemForDelete.id)">Confirm</button>
        <button class="btn btn-danger" @click="closeDeleteModal">Cancel</button>
      </div>
 </Modal>
</template>

<script>
  export default {
    props: {
      showDeleteModal: Boolean,
      itemForDelete: Object
    },
    methods: {
      closeDeleteModal() {
        this.showDeleteModal = false;
        this.$emit('deleteDialogClosed', this.showDeleteModal);
      },
      async confirmDelete(id) {
      await this.$store.dispatch("deleteJobAd", id);
      this.closeDeleteModal();
      this.$store.dispatch("getJobCollection");
    },
    },
    created() {
      console.log(this.itemForDelete);
    }
  };
</script>

<style scoped>
  @import '../../../assets/dialogs.css';
</style>