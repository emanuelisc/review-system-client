<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-button @click="goNew()" class="md-raised md-primary">Naujas puslapis</md-button>
        <md-button @click="categories()" class="md-raised md-primary">Puslapių kategorijos</md-button>
        <md-card>
          <md-card-content>
            <page-list table-header-color="green"></page-list>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { PageList } from "@/components";

export default {
  components: {
    PageList
  },
  methods: {
    goNew() {
      this.$router.push({
        name: "page-new"
      });
    },
    categories() {
      this.$router.push({
        name: "page-cat-list"
      });
    }
  }
};
</script>