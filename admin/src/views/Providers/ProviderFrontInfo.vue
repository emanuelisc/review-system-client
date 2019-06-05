<template>
  <div class="content container mb-4 atsiliepimai">
    <div class="md-layout w-100">
      <h1 class="page-title">Paslaugų tiekėjas</h1>

      <div class="md-layout-item md-small-size-66 md-size-66">
        <div
          v-if="provider.image"
          class="md-layout-item md-small-size-100 md-size-50"
          style="min-height: 30px;"
        >
          <img :src="provider.image" :alt="provider.name">
        </div>
        <div v-else class="md-layout-item md-small-size-100 md-size-50">
          <img
            src="https://topekacivictheatre.com/wp-content/uploads/2019/01/no-image.jpg"
            :alt="provider.title"
          >
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <p>{{ provider.date }}</p>
          <div class="md-subheading" style="font-weight: 500;">{{ provider.title }}</div>
        </div>

        <div class="md-layout-item md-small-size-100 md-size-100">
          <p v-html="provider.description" style="margin-top: 30px;"></p>
        </div>
      </div>
      <div class="md-layout-item md-small-size-33 md-size-33">
        <div class="md-subheading">
          <strong>Teikiamos paslaugos</strong>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <div v-if="provider.services.length" class="md-layout-item md-small-size-100 md-size-100">
            <!-- <div> -->
            <!-- <ul> -->
            <div class="md-subheading" :key="cat.id" v-for="cat in provider.services">{{ cat.title}}</div>
            <!-- </ul> -->
            <!-- </div> -->
          </div>
          <!-- <p>{{ provider.user.name }}</p> -->
        </div>
        <!-- <div class="md-layout-item md-small-size-100 md-size-50">
          <div class="md-subheading">Naudotojo profilis:</div>
          <router-link :to="{ name: 'user-info', params: { id: provider.user.id }}">Nuoroda</router-link>
        </div>-->
      </div>
      <div class="md-layout-item md-small-size-100 md-size-100">
        <a class="btn btn-more" @click="onNaujas()">Palikti atsiliepimą</a>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-100">
        <md-list>
          <md-list-item v-for="item in searched" v-bind:key="item.id" class="atsiliepimas">
            <a v-bind:href="'/atsiliepimai/' + item.id">
              <md-avatar>
                <img v-if="item.image != ''" :src="item.image" :alt="item.title">
                <img
                  v-else
                  src="https://topekacivictheatre.com/wp-content/uploads/2019/01/no-image.jpg"
                  :alt="item.title"
                >
              </md-avatar>
            </a>
            <a v-bind:href="'/atsiliepimai/' + item.id">
              <div class="md-list-item-text">
                <h4>{{ item.title }}</h4>
                <span v-html="item.description"></span>
                <h6 class="rating-bottom">
                  Reitingas
                  <span v-if="item.rating > 0">+</span>
                  <span v-else-if="item.rating < 0">-</span>
                  <span class="rating">{{ item.rating }}</span>
                </h6>
              </div>
            </a>
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
  methods: {
    ...mapActions(["getProvider", "getUser", "updateProvider"]),
    notifyVue(message, type) {
      this.$notify({
        message: message,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: type
      });
    },
    getData() {
      axios
        .get(`provider/providers/${this.$route.params.id}/`)
        .then(response => {
          this.provider = response.data;
          this.getProvider(response.data);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti atsiliepimo informacijos.", "danger");
          console.log(err);
        });
      axios
        .get(`review/reviews/?providers=${this.$route.params.id}`)
        .then(response => {
          this.searched = response.data.results;
          this.fetchReviews(response.data.results);
        })
        .catch(err => {
          //   this.notifyVue("Nepavyko gauti atsiliepimų sąrašo.", "danger");
          console.log(err);
        });
    },
    onNaujas() {
      if (this.$store.getters.isLoggedIn) {
        this.$router.push({
          name: "naujas-atsiliepimas",
          params: { provider: this.$route.params.id }
        });
      } else {
        this.notifyVue(
          "Prašome prisijungti, kad galėtumėte pridėti atsiliepimą.",
          "warning"
        );
      }
    }
  },
  computed: mapGetters(["oneProvider", "oneUser"]),
  created() {
    this.getData();
    this.provider = this.oneProvider;
  },
  data() {
    return {
      user: {},
      provider: {},
      selectedFile: null,
      selected: [],
      dialog: false,
      dialogResults: null,
      spinner: false,
      comments: [],
      searched: {}
    };
  }
};
</script>

<style>
.w-100 {
  width: 100%;
}
</style>


<style scoped>
.btn-width {
  width: 150px !important;
  margin-right: 30px;
}
.btn-width2 {
  width: 200px !important;
}

.md-layout-item {
  float: left;
}
</style>
