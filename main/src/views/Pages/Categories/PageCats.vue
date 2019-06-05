<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button @click="goBack()" class="md-raised md-primary">Atgal į puslapių sąrašą</md-button>
        <md-button @click="goNew()" class="md-raised md-primary">Nauja kategorija</md-button>
        <md-card>
          <md-card-content>
            <page-cat-list table-header-color="green"></page-cat-list>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { PageCatList } from "@/components";

export default {
  components: {
    PageCatList
  },
  methods: {
    goNew() {
      this.$router.push({
        name: "page-cat-new"
      });
    },
    goBack() {
      this.$router.push({
        name: "page-list"
      });
    }
  }
};
</script>