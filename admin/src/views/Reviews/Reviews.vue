<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button @click="goNew()" class="md-raised md-primary">Naujas atsiliepimas</md-button>
        <md-button @click="categories()" class="md-raised md-primary">Kategorijos</md-button>
        <md-button @click="tags()" class="md-raised md-primary">Tagai</md-button>
        <md-card>
          <md-card-content>
            <review-list table-header-color="green"></review-list>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ReviewList } from "@/components";

export default {
  components: {
    ReviewList
  },
  methods: {
    goNew() {
      this.$router.push({
        name: "review-new"
      });
    },
    categories() {
      this.$router.push({
        name: "review-cat-list"
      });
    },
    tags() {
      this.$router.push({
        name: "review-tag-list"
      });
    }
  }
};
</script>