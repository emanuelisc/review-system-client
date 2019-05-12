<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <md-button @click="goBack()" class="md-ripple md-primary btn-width">Į sąrašą</md-button>
        <user-card></user-card>
      </div>
    </div>
  </div>
</template>

<script>
import { UserCard } from "@/components";

export default {
  components: {
    UserCard
  },
  methods: {
    goBack() {
      this.$router.push({
        name: "user-list"
      });
    }
  }
};
</script>

<style scoped>
.btn-width{
    width: 150px!important;
}
</style>
