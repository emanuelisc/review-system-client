<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <md-button @click="goToList()" class="md-ripple md-primary btn-width">Į sąrašą</md-button>
        <md-button @click="goBack()" v-if="this.$route.name != 'user-new'" class="md-ripple md-info btn-width2">Vartotojo informacija</md-button>
        <user-form></user-form>
      </div>
    </div>
  </div>
</template>

<script>
import { UserForm } from "@/components";

export default {
  components: {
    UserForm
  },
  methods: {
    goToList() {
      this.$router.push({
        name: "user-list"
      });
    },
    goBack() {
      this.$router.push({
        name: "user-info",
        params: { id: this.$route.params.id }
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
