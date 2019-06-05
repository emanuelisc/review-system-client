<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button @click="goNew()" class="md-ripple md-primary btn-width">Naujas vartotojas</md-button>
        <md-card>
          <md-card-content>
            <user-admin-list table-header-color="green"></user-admin-list>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { SimpleTable, OrderedTable, UserAdminList } from "@/components";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    OrderedTable,
    SimpleTable,
    UserAdminList
  },
  methods: {
    goNew() {
      this.$router.push({
        name: "user-new"
      });
    }
  }
};
</script>

<style scoped>
.btn-width {
  width: 250px;
}
</style>


