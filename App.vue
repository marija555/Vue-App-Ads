<template>
  <div id="app">
    <app-header></app-header>
    <transition
    leave-active-class="animate__animated animate__fadeOut"
     mode="out-in" >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  components:{
    'app-header': Header
  }
}
</script>

<style scoped>

</style>
