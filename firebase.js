import {firebase} from '@firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBbyfb_rEk0zog5likxAi7O8aFvxFdIl8k",
    authDomain: "vue-project-6518d.firebaseapp.com",
    projectId: "vue-project-6518d",
    storageBucket: "vue-project-6518d.appspot.com",
    messagingSenderId: "979945499113",
    appId: "1:979945499113:web:8b61fa629393138a674378",
    measurementId: "G-EFGSMR44VN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //utils
  const db = firebase.firestore();
  const storage = firebase.storage().ref();
  const auth = firebase.auth();

  //references
  const usersCollection = db.collection('users');
  const carsCollection = db.collection('carAds');
  const phonesCollection = db.collection('phoneAds');
  const computersCollection = db.collection('computerAds');
  const appliancesCollection = db.collection('applianceAds');
  const homesCollection = db.collection('homeAds');
  const cosmeticsCollection = db.collection('cosmeticAds');
  const jobsCollection = db.collection('jobAds');
  const clothesCollection = db.collection('clothesAds');
  
  //exports utils/refs
  export {
      db,
      storage,
      auth,
      usersCollection,
      carsCollection,
      phonesCollection,
      computersCollection,
      appliancesCollection,
      homesCollection,
      cosmeticsCollection,
      jobsCollection,
      clothesCollection

  }