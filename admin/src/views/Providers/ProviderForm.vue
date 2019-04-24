<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <md-button @click="goToList()" class="md-ripple md-primary btn-width">Į sąrašą</md-button>
        <provider-form></provider-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ProviderForm } from "@/components";
import { mapActions } from "vuex";

export default {
  components: {
    ProviderForm
  },
  methods: {
    goToList() {
      this.$router.push({
        name: "provider-list"
      });
    }
  }
};
</script>

<style scoped>
.btn-width {
  width: 150px !important;
  margin-right: 30px;
}
.btn-width2 {
  width: 200px !important;
}
</style>
