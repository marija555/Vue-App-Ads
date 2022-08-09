<template>
    <Modal v-model="showInfoModal" modalClass="modal-wrapper modal-info">
      <h1>{{itemForInfo.name}}</h1>
      <br>
      <p>{{itemForInfo.description}}</p>
      <div class="delete-action-buttons">
        <button class="btn btn-danger" @click="closeInfoModal">Close</button>
      </div>
    </Modal>
</template>

<script>
  export default {
    props: {
      showInfoModal: Boolean,
      itemForInfo: Object
    },
    methods: {
      closeInfoModal() {
        this.showInfoModal=false;
        this.$emit('infoDialogClosed', this.showInfoModal);
      }
    },
    destroyed() {
      this.closeInfoModal();
    }
  };
</script>

<style scoped>
  @import '../../../assets/dialogs.css';
</style>