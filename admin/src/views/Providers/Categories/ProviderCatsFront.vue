<template>
  <div class="content container mb-4">
    <div class="md-layout">
        <h1 class="page-title">Kategorijos</h1>
        <p class="page-desc">
            Pasirinkite norimą paslaugų tiekėjo kategoriją
        </p>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-list>
          <md-list-item v-for="item in searched" v-bind:key="item.id">
            <a v-bind:href="'/imones/?category=' + item.id">{{ item.name }}</a>
          </md-list-item>
        </md-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "@/plugins/axios";

export default {
  components: {},
  computed: mapGetters(["allProviderCategories"]),
  methods: {
    ...mapActions(["fetchProviderCats"]),
    getData() {
      axios
        .get("provider/categories/")
        .then(response => {
          this.searched = response.data.results;
          this.fetchProviderCats(response.data.results);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti kategorijų sąrašo.", "danger");
          console.log(err);
        });
    }
  },
  created() {
    if (this.allProviderCategories.length == 0) {
      this.getData();
      console.log("Zero");
    } else {
      console.log("Ok");
    }
    this.searched = this.allProviderCategories;
    // this.fetchProviders(this.searched);
  },
  data: () => ({
    currentSort: "id",
    currentSortOrder: "asc",
    search: null,
    searched: []
  })
};
</script>

<style>
h1.page-title{
        color: #332259;
    font-family: "Roboto";
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 0.14px;
    line-height: 35px;
    margin-top: 10px;
    width: 100%;
}

p.page-desc {
    color: #332259;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.08px;
    line-height: 23px;
    width: 165px;
    width: 100%;
}

.mb-4{
    margin-bottom: 160px;
}
</style>
