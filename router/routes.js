import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Ads from '../components/ads/Ads.vue';
import CarsAds from '../components/ads/CarsAds.vue';
import ClothesAds from '../components/ads/ClothesAds.vue';
import ComputersAds from '../components/ads/ComputersAds.vue';
import CosmeticsAds from '../components/ads/CosmeticsAds.vue';
import HomesAds from '../components/ads/HomesAds.vue';
import JobsAds from '../components/ads/JobsAds.vue';
import PhonesAds from '../components/ads/PhonesAds.vue';
import AppliancesAds from '../components/ads/AppliancesAds.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

const routes = [
  {path: '/', component: Home},
  {path: '/home', component: Home},
  {path: '/about', component: About},
  {path: '/ads', component: Ads, meta: {requiresAuth: true}},
  {path: '/ads/cars-ads', component: CarsAds, meta: {requiresAuth: true}},
  {path: '/ads/clothes-ads', component: ClothesAds, meta: {requiresAuth: true}},
  {path: '/ads/computers-ads', component: ComputersAds, meta: {requiresAuth: true}},
  {path: '/ads/cosmetics-ads', component: CosmeticsAds, meta: {requiresAuth: true}},
  {path: '/ads/homes-ads', component: HomesAds, meta: {requiresAuth: true}},
  {path: '/ads/jobs-ads', component: JobsAds, meta: {requiresAuth: true}},
  {path: '/ads/phones-ads', component: PhonesAds, meta: {requiresAuth: true}},
  {path: '/ads/appliances-ads', component: AppliancesAds, meta: {requiresAuth: true}},
  {path: '/login', component: Login},
  {path: '/register', component: Register}
];

export default routes;