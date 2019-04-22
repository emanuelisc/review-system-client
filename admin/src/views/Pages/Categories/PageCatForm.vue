<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <md-button @click="goToList()" class="md-ripple md-primary btn-width">Į sąrašą</md-button>
        <page-cat-form></page-cat-form>
      </div>
    </div>
  </div>
</template>

<script>
import { PageCatForm } from "@/components";
import { mapActions } from "vuex";

export default {
  components: {
    PageCatForm
  },
  methods: {
    goToList() {
      this.$router.push({
        name: "page-cat-list"
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
