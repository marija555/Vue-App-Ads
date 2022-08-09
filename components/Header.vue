<template>
  <b-navbar class="navbar" toggleable>
    <b-navbar-brand to="/" class="navbar-title">Ads App</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse class="navbar-collapse" id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
        <b-nav-item v-if="isLoggedIn" to="/ads">Ads</b-nav-item>
        <b-nav-item v-if="!isLoggedIn" to="/login">Login</b-nav-item>
        <b-nav-item v-if="isLoggedIn" @click="logout()">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  import {userMixin} from '../mixins/userMixin';

  export default {
    methods: {
      logout() {
        this.$store.dispatch('logout');
      }
    },
    mixins: [
      userMixin
    ]
    }
</script>

<style scoped>
  * {
    font-family: 'Raleway', sans-serif;
    font-size: 35px;
    
  }
  .navbar {
    background: rgb(41, 119, 124);
  }
  .navbar-title {
    color: rgb(250, 250, 250);
  }
  .navbar-collapse {
    color: rgb(54, 54, 54);
  }
  
</style>