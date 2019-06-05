<template>
  <div class="content administravimas">
    <div class="container">
      <div class="row">
        <h1>Administravimas</h1>
        <div class="col-md-4">
          <administration-menu/>
        </div>
        <div class="col-md-8">
          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Ieškoti..." v-model="search" @input="searchName"/>
          </md-field>
          <md-list>
            <md-list-item v-for="item in searched" v-bind:key="item.id" class="atsiliepimas">
              <a v-bind:href="'/administravimas/atsiliepimai/' + item.id">
                <md-avatar>
                  <!-- {{ item.image }} -->
                  <img v-if="item.image !== null" :src="item.image" :alt="item.title">
                  <img
                    v-else
                    src="https://topekacivictheatre.com/wp-content/uploads/2019/01/no-image.jpg"
                    :alt="item.title"
                  >
                </md-avatar>
              </a>
              <a v-bind:href="'/administravimas/atsiliepimai/' + item.id">
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
  </div>
</template>

<script>
import AdministrationMenu from "./AdministrationMenu";
import { mapGetters, mapActions } from "vuex";
import axios from "@/plugins/axios";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => {
      if (toLower(item.title).includes(toLower(term))) {
        return true;
      }
    });
  }

  return items;
};

export default {
  components: { AdministrationMenu },
  computed: mapGetters(["allReviews", "allReviewCategories"]),
  methods: {
    ...mapActions(["fetchReviews", "fetchReviewCats"]),
    notifyVue(message, type) {
      this.$notify({
        message,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type
      });
    },
    details(id) {
      this.$router.push({
        name: "review-edit",
        params: { id }
      });
    },
    info(id) {
      this.$router.push({
        name: "review-info",
        params: { id }
      });
    },
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].toString().localeCompare(b[sortBy]);
        }

        return b[sortBy].toString().localeCompare(a[sortBy]);
      });
    },
    searchName() {
      this.searched = searchByName(this.allReviews, this.search);
    },
    forceRerender() {
      this.$emit("data");
    },
    getData() {
      var cat;
      var user_id = localStorage.getItem('id')
      if (this.$route.query.category) {
        cat = this.$route.query.category;
      } else {
        cat = " ";
      }
      axios
        .get(`review/reviews/?user_id=${user_id}`)
        .then(response => {
          this.searched = response.data.results;
          this.fetchReviews(response.data.results);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti puslapių sąrašo.", "danger");
          console.log(err);
        });
      axios
        .get("review/categories/?limit=10000")
        .then(res => {
          this.cats = res.data.results;
          this.fetchReviewCats(this.cats);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti kategorijų sąrašo.", "danger");
          console.log(err);
        });
    }
  },
  data() {
    return {
      modal: false,
      currentSort: "id",
      currentSortOrder: "asc",
      search: null,
      searched: [],
      cats: {}
    };
  },
  created() {
    this.modal = false;
    if (this.allReviews.length == 0) {
      this.getData();
      console.log("Zero");
    } else {
      console.log("Ok");
    }
    this.searched = this.allReviews;
    this.cats = this.allReviewCategories;
    // this.fetchReviews(this.searched);
  },
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 30px;
  font-weight: 500;
  width: 100%;
  text-align: left;
  display: block;
}

.col-md-4,
.col-md-8 {
  float: left;
}

.col-md-4 {
  width: 25%;
}

.col-md-8 {
  width: 75%;
}

.left-menu {
  margin-bottom: 120px;
  width: 100%;
  display: block;
}

.left-menu ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.row {
  width: 100%;
  display: block;
}
</style>
