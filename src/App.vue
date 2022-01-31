<template>
  <div id="app">
    <nav-header></nav-header>
    <!-- NEW - add a route to the profile page -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";
export default {
  name: 'App',
  components: {NavHeader},
}
</script>
<style lang="scss">
@import './assets/scss/reset.scss';
</style>
