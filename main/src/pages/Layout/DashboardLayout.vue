<template>
  <div>
    <notifications></notifications>

    <div>
      <top-navbar></top-navbar>
      <!-- <top-navbar v-if="isLoggedIn"></top-navbar> -->

      <dashboard-content></dashboard-content>
        <footer-menu></footer-menu>
      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import FooterMenu from "./FooterMenu.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    FooterMenu
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

<style>
.main-panel {
  width: 100%!important;
}

.container {
  max-width: 1140px;
  padding-right: 15px!important;
  padding-left: 15px!important;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
}

body{
    background-color: #fff!important;
}

@media (max-width: 1200px) {
  .container {
    max-width: 960px;
  }
}

@media (max-width: 996px) {
  .container {
    max-width: 720px;
  }
}
@media (max-width: 767) {
  .container {
    max-width: 540px;
  }
}
@media (max-width: 576) {
  .container {
    max-width: 100%;
  }
}
</style>

