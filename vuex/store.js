import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from "../firebase";
import router from "../router/router";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        userProfile: {},
        authorized: false,
        usersCollection: [],
        carsCollection: [],
        phonesCollection: [],
        computersCollection: [],
        appliancesCollection: [],
        homesCollection: [],
        cosmeticsCollection: [],
        jobsCollection: [],
        clothesCollection: []
    },
    mutations: {

      setUserProfile(state, val) {
        state.userProfile = val;
        state.userProfile['id'] = fb.auth.currentUser.uid;
        console.log(state.userProfile);
      }
    },
    actions: {

      async login({dispatch}, form) {
  
        // loginovanje korisnika
        const {user} = await fb.auth.signInWithEmailAndPassword(form.email, form.password);
  
        // vracanje korisnika i setovanje u state-u
        dispatch('fetchUserProfile', user);
  
        router.push('/ads');
  
      },
  
      async logout({state, commit}) {
  
        // odjavimo korisnika sa fb
        await fb.auth.signOut();
  
        // resetujemo
        //commit('setUserProfile', {});
        state.userProfile = {};
        router.push('/login');
  
      },
  
      async fetchUserProfile({commit}, user) {
  
        // vracanje korisnika sa fb
        const userProfile = await fb.usersCollection.doc(user.uid).get();
  
        // postavljanje korisnika u state-u
        commit('setUserProfile', userProfile.data());
  
      },
  
      async register({dispatch}, form) {
  
        // registrovanje user-a
        const {user} = await fb.auth.createUserWithEmailAndPassword(form.email, form.password);
  
        // kreiranje korisnika u usersCollection na firebase-u
        await fb.usersCollection.doc(user.uid).set({
          email: form.email,
          password: form.password,
          name: form.name,
          lastName: form.lastName
        });
  
        // vracanje korisnika i setovanje u state-u
        dispatch('fetchUserProfile', user);
  
        router.push('/login');
  
      },

     // ! CAR ADS METHODS

    // * Get All Car Ads Method
    async getCarCollection({state}) {

      let carAdsRef = fb.carsCollection;
      try {
        let allCarAdsSnapshot = await carAdsRef.get();
        state.carsCollection = [];
        allCarAdsSnapshot.forEach(async doc => {
          const singleCarAd = doc.data();
          singleCarAd["id"] = doc.id;
          let userId = singleCarAd.userId;
          let userProfile = await fb.usersCollection.doc(userId).get();
         // console.log(userProfile.data().name + ' ' + userProfile.data().lastName); // ! radi
         singleCarAd["firstName"] = await userProfile.data().name;
         singleCarAd["lastName"] = await userProfile.data().lastName;
          state.carsCollection.push(singleCarAd);
          console.log(singleCarAd);
        })
      } catch (error) {
        console.log(error);
      }

    },

    // * Delete Car Ad Method
    async deleteCarAd({state}, id) {
      try {
        await fb.carsCollection.doc(id).delete();
        alert('Successfully deleted Ad');
      } catch(error) {
        console.log(error);
      }
    },

    // * Update Car Ad Method
    async updateCarAd({}, itemForUpdate) {
      try {
        await fb.carsCollection.doc(itemForUpdate.id).update({
          name: itemForUpdate.name,
          description: itemForUpdate.description,
          src: itemForUpdate.src,
          location: itemForUpdate.location,
          phone: itemForUpdate.phone,
          price: itemForUpdate.price
        });
        alert("Ad was updated!");
      } catch (error) {
        console.log(error);
      }
    },

   // * Create new Car Ad Method
    async createCarAd({state}, payload) {
      const carAd = {
        name: payload.name,
        description: payload.description,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        location: payload.location,
        phone: payload.phone,
        price: payload.price,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.carsCollection.add(carAd);
      key = data.id;
      const fileName = payload.src.name;
      const ext = fileName.slice(fileName.lastIndexOf("."));
      const fileData = await storageRef
        .child("carAdsImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      await fb.carsCollection.doc(key).get();
      await fb.carsCollection.doc(key).update({
        src: imageUrl
      });
    },

      // ! PHONE ADS METHODS

    // * Get All Phone Ads Method
    async getPhoneCollection({state}) {

      let phoneAdsRef = fb.phonesCollection;
      try {
        let allPhoneAdsSnapshot = await phoneAdsRef.get();
        state.phonesCollection = [];
        allPhoneAdsSnapshot.forEach(async doc => {
          const singlePhoneAd = doc.data();
          singlePhoneAd["id"] = doc.id;
          let userId = singlePhoneAd.userId;
          let userProfile = await fb.usersCollection.doc(userId).get();
         // console.log(userProfile.data().name + ' ' + userProfile.data().lastName); // ! radi
         singlePhoneAd["firstName"] = await userProfile.data().name;
         singlePhoneAd["lastName"] = await userProfile.data().lastName;
          state.phonesCollection.push(singlePhoneAd);
          console.log(singlePhoneAd);
        })
      } catch (error) {
        console.log(error);
      }

    },

    // * Delete Phone Ad Method
    async deletePhoneAd({state}, id) {
      try {
        await fb.phonesCollection.doc(id).delete();
        alert('Successfully deleted Ad');
      } catch(error) {
        console.log(error);
      }
    },

    // * Update Phone Ad Method
    async updatePhoneAd({}, itemForUpdate) {
      try {
        await fb.phonesCollection.doc(itemForUpdate.id).update({
          name: itemForUpdate.name,
          description: itemForUpdate.description,
          src: itemForUpdate.src,
          location: itemForUpdate.location,
          phone: itemForUpdate.phone,
          price: itemForUpdate.price
        });
        alert("Ad was updated!");
      } catch (error) {
        console.log(error);
      }
    },

   // * Create new Phone Ad Method
    async createPhoneAd({state}, payload) {
      const phoneAd = {
        name: payload.name,
        description: payload.description,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        location: payload.location,
        phone: payload.phone,
        price: payload.price,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.phonesCollection.add(phoneAd);
      key = data.id;
      const fileName = payload.src.name;
      const ext = fileName.slice(fileName.lastIndexOf("."));
      const fileData = await storageRef
        .child("phoneAdsImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      await fb.phonesCollection.doc(key).get();
      await fb.phonesCollection.doc(key).update({
        src: imageUrl
      });
    },
      // ! JOB ADS METHODS

    // * Get All Job Ads Method
    async getJobCollection({state}) {

      let jobAdsRef = fb.jobsCollection;
      try {
        let allJobAdsSnapshot = await jobAdsRef.get();
        state.jobsCollection = [];
        allJobAdsSnapshot.forEach(async doc => {
          const singleJobAd = doc.data();
          singleJobAd["id"] = doc.id;
          let userId = singleJobAd.userId;
          let userProfile = await fb.usersCollection.doc(userId).get();
         // console.log(userProfile.data().name + ' ' + userProfile.data().lastName); // ! radi
         singleJobAd["firstName"] = await userProfile.data().name;
         singleJobAd["lastName"] = await userProfile.data().lastName;
          state.jobsCollection.push(singleJobAd);
          console.log(singleJobAd);
        })
      } catch (error) {
        console.log(error);
      }

    },

    // * Delete Job Ad Method
    async deleteJobAd({state}, id) {
      try {
        await fb.jobsCollection.doc(id).delete();
        alert('Successfully deleted Ad');
      } catch(error) {
        console.log(error);
      }
    },

    // * Update Job Ad Method
    async updateJobAd({}, itemForUpdate) {
      try {
        await fb.jobsCollection.doc(itemForUpdate.id).update({
          name: itemForUpdate.name,
          description: itemForUpdate.description,
          src: itemForUpdate.src,
          location: itemForUpdate.location,
          job: itemForUpdate.job,
          price: itemForUpdate.price
        });
        alert("Ad was updated!");
      } catch (error) {
        console.log(error);
      }
    },

   // * Create new Job Ad Method
    async createJobAd({state}, payload) {
      const jobAd = {
        name: payload.name,
        description: payload.description,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        location: payload.location,
        job: payload.job,
        price: payload.price,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.jobsCollection.add(jobAd);
      key = data.id;
      const fileName = payload.src.name;
      const ext = fileName.slice(fileName.lastIndexOf("."));
      const fileData = await storageRef
        .child("jobAdsImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      await fb.jobsCollection.doc(key).get();
      await fb.jobsCollection.doc(key).update({
        src: imageUrl
      });
    },
      // ! HOME ADS METHODS

    // * Get All Home Ads Method
    async getHomeCollection({state}) {

      let homeAdsRef = fb.homesCollection;
      try {
        let allHomeAdsSnapshot = await homeAdsRef.get();
        state.homesCollection = [];
        allHomeAdsSnapshot.forEach(async doc => {
          const singleHomeAd = doc.data();
          singleHomeAd["id"] = doc.id;
          let userId = singleHomeAd.userId;
          let userProfile = await fb.usersCollection.doc(userId).get();
         // console.log(userProfile.data().name + ' ' + userProfile.data().lastName); // ! radi
         singleHomeAd["firstName"] = await userProfile.data().name;
         singleHomeAd["lastName"] = await userProfile.data().lastName;
          state.homesCollection.push(singleHomeAd);
          console.log(singleHomeAd);
        })
      } catch (error) {
        console.log(error);
      }

    },

    // * Delete Home Ad Method
    async deleteHomeAd({state}, id) {
      try {
        await fb.homesCollection.doc(id).delete();
        alert('Successfully deleted Ad');
      } catch(error) {
        console.log(error);
      }
    },

    // * Update Home Ad Method
    async updateHomeAd({}, itemForUpdate) {
      try {
        await fb.homesCollection.doc(itemForUpdate.id).update({
          name: itemForUpdate.name,
          description: itemForUpdate.description,
          src: itemForUpdate.src,
          location: itemForUpdate.location,
          phone: itemForUpdate.phone,
          price: itemForUpdate.price
        });
        alert("Ad was updated!");
      } catch (error) {
        console.log(error);
      }
    },

   // * Create new Home Ad Method
    async createHomeAd({state}, payload) {
      const homeAd = {
        name: payload.name,
        description: payload.description,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        location: payload.location,
        phone: payload.phone,
        price: payload.price,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.homesCollection.add(homeAd);
      key = data.id;
      const fileName = payload.src.name;
      const ext = fileName.slice(fileName.lastIndexOf("."));
      const fileData = await storageRef
        .child("homeAdsImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      await fb.homesCollection.doc(key).get();
      await fb.homesCollection.doc(key).update({
        src: imageUrl
      });
    },
      // ! COMPUTER ADS METHODS

    // * Get All Computer Ads Method
    async getComputerCollection({state}) {

      let computerAdsRef = fb.computersCollection;
      try {
        let allComputerAdsSnapshot = await computerAdsRef.get();
        state.computersCollection = [];
        allComputerAdsSnapshot.forEach(async doc => {
          const singleComputerAd = doc.data();
          singleComputerAd["id"] = doc.id;
          let userId = singleComputerAd.userId;
          let userProfile = await fb.usersCollection.doc(userId).get();
         // console.log(userProfile.data().name + ' ' + userProfile.data().lastName); // ! radi
         singleComputerAd["firstName"] = await userProfile.data().name;
         singleComputerAd["lastName"] = await userProfile.data().lastName;
          state.computersCollection.push(singleComputerAd);
          console.log(singleComputerAd);
        })
      } catch (error) {
        console.log(error);
      }

    },

    // * Delete Computer Ad Method
    async deleteComputerAd({state}, id) {
      try {
        await fb.computersCollection.doc(id).delete();
        alert('Successfully deleted Ad');
      } catch(error) {
        console.log(error);
      }
    },

    // * Update Computer Ad Method
    async updateComputerAd({}, itemForUpdate) {
      try {
        await fb.computersCollection.doc(itemForUpdate.id).update({
          name: itemForUpdate.name,
          description: itemForUpdate.description,
          src: itemForUpdate.src,
          location: itemForUpdate.location,
          phone: itemForUpdate.phone,
          price: itemForUpdate.price
        });
        alert("Ad was updated!");
      } catch (error) {
        console.log(error);
      }
    },

   // * Create new Computer Ad Method
    async createComputerAd({state}, payload) {
      const computerAd = {
        name: payload.name,
        description: payload.description,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        location: payload.location,
        phone: payload.phone,
        price: payload.price,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.computersCollection.add(computerAd);
      key = data.id;
      const fileName = payload.src.name;
      const ext = fileName.slice(fileName.lastIndexOf("."));
      const fileData = await storageRef
        .child("computerAdsImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      await fb.computersCollection.doc(key).get();
      await fb.computersCollection.doc(key).update({
        src: imageUrl
      });
    },
      // ! APPLIANCE ADS METHODS

    // * Get All Appliance Ads Method
    async getApplianceCollection({state}) {

      let applianceAdsRef = fb.appliancesCollection;
      try {
        let allApplianceAdsSnapshot = await applianceAdsRef.get();
        state.appliancesCollection = [];
        allApplianceAdsSnapshot.forEach(async doc => {
          const singleApplianceAd = doc.data();
          singleApplianceAd["id"] = doc.id;
          let userId = singleApplianceAd.userId;
          let userProfile = await fb.usersCollection.doc(userId).get();
         // console.log(userProfile.data().name + ' ' + userProfile.data().lastName); // ! radi
         singleApplianceAd["firstName"] = await userProfile.data().name;
         singleApplianceAd["lastName"] = await userProfile.data().lastName;
          state.appliancesCollection.push(singleApplianceAd);
          console.log(singleApplianceAd);
        })
      } catch (error) {
        console.log(error);
      }

    },

    // * Delete Appliance Ad Method
    async deleteApplianceAd({state}, id) {
      try {
        await fb.appliancesCollection.doc(id).delete();
        alert('Successfully deleted Ad');
      } catch(error) {
        console.log(error);
      }
    },

    // * Update Appliance Ad Method
    async updateApplianceAd({}, itemForUpdate) {
      try {
        await fb.appliancesCollection.doc(itemForUpdate.id).update({
          name: itemForUpdate.name,
          description: itemForUpdate.description,
          src: itemForUpdate.src,
          location: itemForUpdate.location,
          phone: itemForUpdate.phone,
          price: itemForUpdate.price
        });
        alert("Ad was updated!");
      } catch (error) {
        console.log(error);
      }
    },

   // * Create new Appliance Ad Method
    async createApplianceAd({state}, payload) {
      const applianceAd = {
        name: payload.name,
        description: payload.description,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        location: payload.location,
        phone: payload.phone,
        price: payload.price,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.appliancesCollection.add(applianceAd);
      key = data.id;
      const fileName = payload.src.name;
      const ext = fileName.slice(fileName.lastIndexOf("."));
      const fileData = await storageRef
        .child("applianceAdsImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      await fb.appliancesCollection.doc(key).get();
      await fb.appliancesCollection.doc(key).update({
        src: imageUrl
      });
    },
      // ! COSMETIC ADS METHODS

    // * Get All Cosmetic Ads Method
    async getCosmeticCollection({state}) {

      let cosmeticAdsRef = fb.cosmeticsCollection;
      try {
        let allCosmeticAdsSnapshot = await cosmeticAdsRef.get();
        state.cosmeticsCollection = [];
        allCosmeticAdsSnapshot.forEach(async doc => {
          const singleCosmeticAd = doc.data();
          singleCosmeticAd["id"] = doc.id;
          let userId = singleCosmeticAd.userId;
          let userProfile = await fb.usersCollection.doc(userId).get();
         // console.log(userProfile.data().name + ' ' + userProfile.data().lastName); // ! radi
         singleCosmeticAd["firstName"] = await userProfile.data().name;
         singleCosmeticAd["lastName"] = await userProfile.data().lastName;
          state.cosmeticsCollection.push(singleCosmeticAd);
          console.log(singleCosmeticAd);
        })
      } catch (error) {
        console.log(error);
      }

    },

    // * Delete Cosmetic Ad Method
    async deleteCosmeticAd({state}, id) {
      try {
        await fb.cosmeticsCollection.doc(id).delete();
        alert('Successfully deleted Ad');
      } catch(error) {
        console.log(error);
      }
    },

    // * Update Cosmetic Ad Method
    async updateCosmeticAd({}, itemForUpdate) {
      try {
        await fb.cosmeticsCollection.doc(itemForUpdate.id).update({
          name: itemForUpdate.name,
          description: itemForUpdate.description,
          src: itemForUpdate.src,
          location: itemForUpdate.location,
          phone: itemForUpdate.phone,
          price: itemForUpdate.price
        });
        alert("Ad was updated!");
      } catch (error) {
        console.log(error);
      }
    },

   // * Create new Cosmetic Ad Method
    async createCosmeticAd({state}, payload) {
      const cosmeticAd = {
        name: payload.name,
        description: payload.description,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        location: payload.location,
        phone: payload.phone,
        price: payload.price,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.cosmeticsCollection.add(cosmeticAd);
      key = data.id;
      const fileName = payload.src.name;
      const ext = fileName.slice(fileName.lastIndexOf("."));
      const fileData = await storageRef
        .child("cosmeticAdsImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      await fb.cosmeticsCollection.doc(key).get();
      await fb.cosmeticsCollection.doc(key).update({
        src: imageUrl
      });
    },
      // ! CLOTHES ADS METHODS

    // * Get All Clothe Ads Method
    async getClotheCollection({state}) {

      let clotheAdsRef = fb.clothesCollection;
      try {
        let allClotheAdsSnapshot = await clotheAdsRef.get();
        state.clothesCollection = [];
        allClotheAdsSnapshot.forEach(async doc => {
          const singleClotheAd = doc.data();
          singleClotheAd["id"] = doc.id;
          let userId = singleClotheAd.userId;
          let userProfile = await fb.usersCollection.doc(userId).get();
         // console.log(userProfile.data().name + ' ' + userProfile.data().lastName); // ! radi
         singleClotheAd["firstName"] = await userProfile.data().name;
         singleClotheAd["lastName"] = await userProfile.data().lastName;
          state.clothesCollection.push(singleClotheAd);
          console.log(singleClotheAd);
        })
      } catch (error) {
        console.log(error);
      }

    },

    // * Delete Clothe Ad Method
    async deleteClotheAd({state}, id) {
      try {
        await fb.clothesCollection.doc(id).delete();
        alert('Successfully deleted Ad');
      } catch(error) {
        console.log(error);
      }
    },

    // * Update Clothe Ad Method
    async updateClotheAd({}, itemForUpdate) {
      try {
        await fb.clothesCollection.doc(itemForUpdate.id).update({
          name: itemForUpdate.name,
          description: itemForUpdate.description,
          src: itemForUpdate.src,
          location: itemForUpdate.location,
          phone: itemForUpdate.phone,
          price: itemForUpdate.price
        });
        alert("Ad was updated!");
      } catch (error) {
        console.log(error);
      }
    },

   // * Create new Clothe Ad Method
    async createClotheAd({state}, payload) {
      const clotheAd = {
        name: payload.name,
        description: payload.description,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        location: payload.location,
        phone: payload.phone,
        price: payload.price,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.clothesCollection.add(clotheAd);
      key = data.id;
      const fileName = payload.src.name;
      const ext = fileName.slice(fileName.lastIndexOf("."));
      const fileData = await storageRef
        .child("clotheAdsImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      await fb.clothesCollection.doc(key).get();
      await fb.clothesCollection.doc(key).update({
        src: imageUrl
      });
    }
  }
})

  