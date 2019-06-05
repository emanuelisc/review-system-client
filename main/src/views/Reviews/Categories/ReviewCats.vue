<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button @click="goBack()" class="md-raised md-primary">Atgal į atsiliepimų sąrašą</md-button>
        <md-button @click="goNew()" class="md-raised md-primary">Nauja kategorija</md-button>
        <md-card>
          <md-card-content>
            <review-cat-list table-header-color="green"></review-cat-list>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ReviewCatList } from "@/components";

export default {
  components: {
    ReviewCatList
  },
  methods: {
    goNew() {
      this.$router.push({
        name: "review-cat-new"
      });
    },
    goBack() {
      this.$router.push({
        name: "review-list"
      });
    }
  }
};
</script>