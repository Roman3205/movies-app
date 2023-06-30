<script >
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  components: {
    RouterView,
    AppHeader,
    AppFooter
  }
}

</script>

<template>
  <div class="app">
      <div class="container py-3">
          <div class="col">
            <header class="header">
              <app-header></app-header>
            </header>
            <div class="view mb-5">
              <router-view></router-view>
            </div>
            <footer class="footer">
              <app-footer></app-footer>
            </footer>
          </div>
      </div>
  </div>
</template>

<style>
  body {
    background: url(./assets/background.png) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    overflow-x: hidden;
  }
</style>
