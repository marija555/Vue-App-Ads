import {mapState} from 'vuex';
export const userMixin = {
  computed: {
    ...mapState(['userProfile']),
    isLoggedIn() {
      return Object.keys(this.userProfile).length > 1
    }
  }
}