<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button @click="goBack()" class="md-raised md-primary">Atgal į paslaugų tiekėjų sąrašą sąrašą</md-button>
        <md-button @click="goNew()" class="md-raised md-primary">Nauja kategorija</md-button>
        <md-card>
          <md-card-content>
            <provider-cat-list table-header-color="green"></provider-cat-list>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ProviderCatList } from "@/components";

export default {
  components: {
    ProviderCatList
  },
  methods: {
    goNew() {
      this.$router.push({
        name: "provider-cat-new"
      });
    },
    goBack() {
      this.$router.push({
        name: "provider-list"
      });
    }
  }
};
</script>