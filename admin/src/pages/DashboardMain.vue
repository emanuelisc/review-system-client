<template>
  <div class="content">
    <section class="main-image">
      <div class="container">
        <h2>Nuo šiol vertinkite ir raskite specialistus greitai ir patogiai</h2>
      </div>
    </section>
    <section class="filtras">
      <div class="container">
        <div class="col-md-4-a">
          <h4>Ieškokite. Išsirinkite. Pasinaudokite. Įvertinkite.</h4>
          <div class="filtras-block">
            <md-field>
              <label>Įmonės / asmens pavadinimas</label>
              <md-input v-model="type"></md-input>
            </md-field>
            <md-autocomplete v-model="selectedValue" :md-options="values">
              <label>Veiklos sritis</label>
            </md-autocomplete>
            <md-autocomplete v-model="selectedCountry" :md-options="countries">
              <label>Miestas</label>
            </md-autocomplete>
            <a href="#">Ieškoti</a>
          </div>
        </div>
        <div class="col-md-8-a">
          <div class="veik-block pirmas">
            <label>01.</label>
            <h3>Pavadinimas</h3>
            <p>Jei žinote, įveskite įmonės pavadinimą ar asmens vardą ir pavardę.</p>
          </div>
          <div class="veik-block">
            <label>02.</label>
            <h3>Veiklos sritis</h3>
            <p>Pasirinkite sritį veiklos kurios įmonės ar specialisto ieškote</p>
          </div>
          <div class="veik-block antras">
            <label>03.</label>
            <h3>Miestas</h3>
            <p>Išsirinkite miestą kuriame ieškote paslaugos</p>
          </div>
        </div>
      </div>
    </section>
    <a class="btn btn-more2" @click="onNaujas()">Palikti atsiliepimą</a>
    <section class="atsiliepimai">
      <div class="container">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
          <h2 class="section-name">Naujausi atsiliepimai</h2>
          <md-list>
            <md-list-item v-for="item in searched" v-bind:key="item.id" class="atsiliepimas">
              <a v-bind:href="'/atsiliepimai/' + item.id">
                <md-avatar>
                  <img v-if="item.image !== null" :src="item.image" :alt="item.title">
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
                  <span class="atsiliepimo-aprasas" v-html="item.description"></span>
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
          <a class="btn btn-more" v-bind:href="'/atsiliepimai/'">Visi atsiliepimai</a>
        </div>
      </div>
    </section>
    <section class="tiekejai atsiliepimai" style="margin-bottom: 60px;">
      <div class="container">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
          <h2 class="section-name">Paslaugų tiekėjai</h2>
          <md-list>
            <md-list-item v-for="item in searched2" v-bind:key="item.id" class="atsiliepimas">
              <a v-bind:href="'/imones/' + item.id">
                <md-avatar>
                  <img v-if="item.image !== null" :src="item.image" :alt="item.title">
                  <img
                    v-else
                    src="https://topekacivictheatre.com/wp-content/uploads/2019/01/no-image.jpg"
                    :alt="item.title"
                  >
                </md-avatar>
              </a>
              <a v-bind:href="'/imones/' + item.id">
                <div class="md-list-item-text">
                  <h4>{{ item.title }}</h4>
                  <span class="imones-aprasas" v-html="item.description"></span>
                </div>
              </a>
            </md-list-item>
          </md-list>
          <a class="btn btn-more" v-bind:href="'/imones/'">Daugiau</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "@/plugins/axios";

import {
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable
} from "@/components";

export default {
  computed: mapGetters(["allReviews", "allReviewCategories", "allProviders"]),
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable
  },
  data: () => ({
    selectedCountry: null,
    selectedValue: null,
    type: "",
    search: null,
    searched: [],
    searched2: [],
    currentSort: "id",
    currentSortOrder: "asc",
    countries: [
      "Vilnius",
      "Kaunas",
      "Klaipėda",
      "Panevėžys",
      "Šiauliai",
      "Tauragė",
      "Šilalė",
      "Elektrėnai"
    ],
    values: [
      "Programavimas",
      "Langų valymas",
      "Kompiuterių priežiūra",
      "Restoranas",
      "Auklė"
    ]
  }),
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  methods: {
    notifyVue(message, type) {
      this.$notify({
        message,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type
      });
    },
    onNaujas() {
      if (this.$store.getters.isLoggedIn) {
        this.$router.push({
          name: "naujas-atsiliepimas"
        });
      } else {
          this.notifyVue("Prašome prisijungti, kad galėtumėte pridėti atsiliepimą.", "warning");
      }
    },
    getData() {
      axios
        .get("review/reviews/?limit=9")
        .then(response => {
          this.searched = response.data.results;
          this.fetchReviews(response.data.results);
        })
        .catch(err => {
          //   this.notifyVue("Nepavyko gauti puslapių sąrašo.", "danger");
          console.log(err);
        });
      axios
        .get("provider/providers/?limit=9")
        .then(response => {
          this.searched2 = response.data.results;
          this.fetchProviders(response.data.results);
        })
        .catch(err => {
          //   this.notifyVue("Nepavyko gauti puslapių sąrašo.", "danger");
          console.log(err);
        });
      axios
        .get("review/categories/?limit=20")
        .then(res => {
          this.cats = res.data.results;
          this.fetchReviewCats(this.cats);
        })
        .catch(err => {
          //   this.notifyVue("Nepavyko gauti kategorijų sąrašo.", "danger");
          console.log(err);
        });
    }
  },
  created() {
    if (this.allReviews.length == 0) {
      this.getData();
      console.log("Zero");
    } else {
      console.log("Ok");
    }
    this.searched = this.allReviews;
    this.searched2 = this.allProviders;
    this.cats = this.allReviewCategories;
    // this.fetchReviews(this.searched);
  }
};
</script>

<style>
.md-list-item-text h4 {
  overflow: inherit;
  display: inline-table;
  font-weight: 500;
}
.imones-aprasas {
  display: block;
  text-overflow: unset !important;
  height: 70px;
  white-space: initial;
}

.atsiliepimo-aprasas {
  display: block;
  text-overflow: unset !important;
  height: 50px;
  white-space: initial;
}

.imones-aprasas br {
  display: none;
}
.btn.btn-more,
.btn.btn-more:visited,
.btn.btn-more:active,
.btn.btn-more:focus {
  height: 40px;
  width: 250px;
  background-color: #332259;
  text-align: center;
  padding: 10px 0px;
  display: block;
  color: #fff !important;
  margin: 0 auto;
}

.btn.btn-more:hover {
  opacity: 0.8;
  color: #fff;
}

.btn.btn-more2,
.btn.btn-more2:visited,
.btn.btn-more2:active,
.btn.btn-more2:focus {
  height: 60px;
  width: 300px;
  background-color: #332259;
  text-align: center;
  padding: 20px 0px;
  display: block;
  font-weight: 400;
  font-size: 24px;
  color: #fff !important;
  margin: 0 auto;
}

.btn.btn-more2:hover {
  opacity: 0.8;
  color: #fff;
}

.section-name {
  font-size: 25px;
  font-weight: 400;
  font-family: Roboto;
}

.rating-bottom {
  position: absolute;
  bottom: 0;
  text-transform: capitalize;
  /* font-family: cursive; */
}

.rating-bottom > span.rating {
  font-family: cursive;
}

.atsiliepimas .md-list-item-text {
  height: 95px;
}

.main-image {
  background-color: #ec9c23;
  height: 486px;
  width: 100%;
}

.main-image .container {
  background-image: url("../assets/img/shutterstock_1175990215.png");
  background-size: contain;
  background-position-x: right;
  height: 486px;
  background-repeat: no-repeat;
}

.main-image .container h2 {
  width: 557px;
  color: #fdfffe;
  font-family: "Roboto";
  font-size: 57px;
  font-weight: bold;
  letter-spacing: -0.73px;
  line-height: 54px;
  margin-top: 90px;
}

.filtras h4 {
  color: #fdfffe;
  font-family: Roboto;
  font-size: 17px;
  font-weight: 300;
  letter-spacing: 0.1px;
  line-height: 21px;
  text-align: center;
}

.col-md-4-a {
  width: 360px;
  float: left;
  position: relative;
  top: -155px;
}
.col-md-8-a {
  width: 780px;
  float: left;
}

.filtras {
  width: 100%;
  height: 260px;
  padding-bottom: 60px;
}

.filtras-block {
  height: 308px;
  width: 360px;
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0 3px 7px 0 rgba(212, 212, 212, 0.5);
  padding: 14px 20px;
}

.filtras-block a,
.filtras-block a:active,
.filtras-block a:focus,
.filtras-block a:visited {
  height: 43px;
  width: 100%;
  border-radius: 3px;
  background-color: #d95204;
  color: #fdfffe !important;
  font-family: Roboto;
  font-size: 14px;
  letter-spacing: 0.08px;
  line-height: 16px;
  text-align: center;
  padding-top: 15px;
  padding-bottom: 15px;
  display: block;
}

.filtras-block a:hover {
  opacity: 0.8;
}

.veik-block {
  width: 265px;
  float: left;
  margin-left: 15px;
}

.veik-block.antras {
  width: 165px;
}

.veik-block.pirmas {
  margin-left: 25px;
}

.veik-block label {
  color: #ec9c23;
  font-family: "Roboto";
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.11px;
  line-height: 28px;
  margin-top: 30px;
  display: block;
}

.veik-block label::after {
  content: "";
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 2px;
  float: right;
  display: inline-block;
  width: 211px;
  position: relative;
  border: 1px solid #e8e8e8;
  top: 15px;
}

.veik-block.antras label::after {
  display: none;
}

.veik-block h3 {
  color: #332259;
  font-family: "Roboto";
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 0.14px;
  line-height: 35px;
  margin-top: 10px;
}

.veik-block p {
  color: #332259;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.08px;
  line-height: 23px;
  width: 165px;
}
</style>

