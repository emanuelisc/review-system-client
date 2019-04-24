<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button @click="goNew()" class="md-raised md-primary">Naujas paslaugų tiekėjas</md-button>
        <md-button @click="categories()" class="md-raised md-primary">Paslaugų tiekėjų ketegorijos</md-button>
        <md-card>
          <md-card-content>
            <provider-list table-header-color="green"></provider-list>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ProviderList } from "@/components";

export default {
  components: {
    ProviderList
  },
  methods: {
    goNew() {
      this.$router.push({
        name: "provider-new"
      });
    },
    categories() {
      this.$router.push({
        name: "provider-cat-list"
      });
    }
  }
};
</script>