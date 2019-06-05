<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar v-if="isLoggedIn">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/pagrindinis">
        <md-icon>dashboard</md-icon>
        <p>Pagrindinis</p>
      </sidebar-link>
      <sidebar-link to="/profilis">
        <md-icon>business</md-icon>
        <p>Profilis</p>
      </sidebar-link>
      <sidebar-link to="/atsiliepimai">
        <md-icon>library_books</md-icon>
        <p>Atsiliepimai</p>
      </sidebar-link>
      <sidebar-link to="/vartotojai">
        <md-icon>person</md-icon>
        <p>Administratoriai</p>
      </sidebar-link>
      <sidebar-link to="/statistika">
        <md-icon>bar_chart</md-icon>
        <p>Statistika</p>
      </sidebar-link>
      <sidebar-link to="/programuotojams">
        <md-icon>border_inner</md-icon>
        <p>Programuotojams</p>
      </sidebar-link>
      <sidebar-link to="/pranesimai">
        <md-icon>notification_important</md-icon>
        <p>Pranešti apie problemą</p>
      </sidebar-link>
      <!-- <sidebar-link to="/table">
        <md-icon>content_paste</md-icon>
        <p>Table list</p>
      </sidebar-link>-->
      <!-- <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link>-->
      <!-- <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>-->
    </side-bar>

    <div v-bind:class="{'main-panel':isLoggedIn}">
      <top-navbar v-if="isLoggedIn"></top-navbar>

      <dashboard-content></dashboard-content>

      <content-footer v-if="isLoggedIn"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    show: function() {
      this.logged = this.isLoggedIn;
      this.hide = !this.$route.meta.hideFooter;
      return this.logged || this.hide;
    }
  }
};
</script>
