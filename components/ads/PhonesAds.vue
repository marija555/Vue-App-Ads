<template>
  <div class="ads-wrapper">
     <div class="search-bar-wrapper">
      <input
        class="search-bar"
        v-model="filterText"
        placeholder="Search for Ads..."
        type="text">
    </div>
    <div v-if="isLoggedIn" class="add-ad-button-wrapper">
        <button @click="onAddIcon" type="button" class="btn btn-warning">
          Add new Ad
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path
              d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
        </button>
      </div>
    <div class="all-ads">
      
      <div
        v-for="ad in filteredAds"
        :key="ad.id"
        class="single-ad-card"
      >
        <h1 class="ad-name">{{ ad.name }}</h1>
        <br />
        <img class="ad-img" :src="ad.src" />
        <h4 class="ad-price">{{ ad.price }}</h4>
        <h4 class="ad-phone">{{ ad.phone }}</h4>
        <h4 class="ad-location">{{ ad.location }}</h4>
        <h4 @click="showInfo(ad)" class="ad-show-desc">Click here to read Ad Description</h4>
        
        <div v-if="loggedUser(ad)" class="action-buttons">
           <svg
            @click="onUpdateIcon(ad)"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
            />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
          <svg
            @click="onDeleteIcon(ad)"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16">
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </div>
      </div>
    </div>
    <app-delete-phone-ad-dialog
      :showDeleteModal="showDeleteModal"
      :itemForDelete="itemForDelete"
      @deleteDialogClosed="showDeleteModal=$event"
      v-model="showDeleteModal">
    </app-delete-phone-ad-dialog>
    <app-info-phone-ad-dialog
      :showInfoModal="showInfoModal"
      :itemForInfo="itemForInfo"
      @infoDialogClosed="showInfoModal=$event"
      v-model="showInfoModal">
    </app-info-phone-ad-dialog>
    <app-update-phone-ad-dialog
      :showUpdateModal="showUpdateModal"
      :itemForUpdate="itemForUpdate"
      :copyOfItemForUpdate="copyOfItemForUpdate"
      @originalAd="itemForUpdate=$event"
      @updateDialogClosed="showUpdateModal=$event"
      v-model="showUpdateModal">
    </app-update-phone-ad-dialog>
    <app-add-phone-ad-dialog
      :showAddModal="showAddModal"
      @addDialogClosed="showAddModal=$event"
      v-model="showAddModal">
    </app-add-phone-ad-dialog>
  </div>
</template>

<script>
import DeletePhoneAdDialog from '../dialogs/phoneAds-dialogs/DeletePhoneAdDialog';
import UpdatePhoneAdDialog from '../dialogs/phoneAds-dialogs/UpdatePhoneAdDialog';
import AddPhoneAdDialog from '../dialogs/phoneAds-dialogs/AddPhoneAdDialog';
import InfoPhoneAdDialog from '../dialogs/phoneAds-dialogs/InfoPhoneAdDialog';
import { mapState } from "vuex";
import { adMixin } from "../../mixins/adMixin";
import { userMixin } from "../../mixins/userMixin";
export default {
  components: {
    'app-delete-phone-ad-dialog': DeletePhoneAdDialog,
    'app-update-phone-ad-dialog': UpdatePhoneAdDialog,
    'app-add-phone-ad-dialog': AddPhoneAdDialog,
    'app-info-phone-ad-dialog': InfoPhoneAdDialog
  },
  mixins: [
    adMixin,
    userMixin
  ],
  computed: {
    ...mapState(["phonesCollection"]),
    filteredAds() {
      return this.phonesCollection.filter((item) => {
        let name = item.name.toLowerCase();
        return name.match(this.filterText);
      })
    }
  },
  mounted() {
    this.$store.dispatch("getPhoneCollection");
  },
};
</script>
<style scoped>
@import '../../assets/ads.css';
</style>
