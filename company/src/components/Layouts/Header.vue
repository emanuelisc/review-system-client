<template>
  <div id="nav">
    <div class="container">
      <md-menu md-size="small">
        <md-button md-menu-trigger>Apie mus</md-button>
      </md-menu>

      <md-menu md-size="big">
        <md-button md-menu-trigger>Ketegorijos</md-button>
      </md-menu>

      <md-menu md-size="huge">
        <md-button md-menu-trigger>Huge</md-button>
      </md-menu>

      <md-menu md-size="auto">
        <md-button md-menu-trigger>Auto</md-button>
        <md-menu-content>
          <md-menu-item>My Item 1</md-menu-item>
          <md-menu-item>This content is long enough</md-menu-item>
          <md-menu-item>My Item 3</md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>
  </div>
</template>

<script>
import { Container, Btn } from "mdbvue";
export default {
  name: "Meniu",
  components: {
    Btn,
    Container
  },
  methods: {
    goTo(where) {
      this.onMenu();
      this.$router.push({
        name: where
      });
    }
  }
};
</script>
