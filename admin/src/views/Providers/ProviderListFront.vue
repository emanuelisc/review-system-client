<template>
  <div class="content container mb-4 atsiliepimai">
    <div class="md-layout">
      <h1 class="page-title">Paslaugų tiekėjai</h1>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Ieškoti..." v-model="search" @input="searchName"/>
        </md-field>
        <md-list>
          <md-list-item v-for="item in searched" v-bind:key="item.id" class="atsiliepimas">
            <a v-bind:href="'/imones/' + item.id">
              <md-avatar>
                <img v-if="item.image" :src="item.image" :alt="item.title">
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
      </div>
    </div>
  </div>
</template>

<script>
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
  computed: mapGetters(["allProviders", "allProviderCategories"]),
  methods: {
    ...mapActions(["fetchProviders", "fetchProviderCats"]),
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
      this.searched = searchByName(this.allProviders, this.search);
    },
    forceRerender() {
      this.$emit("data");
    },
    getData() {
      var cat;
      if (this.$route.query.category) {
        cat = this.$route.query.category;
      } else {
        cat = " ";
      }
      axios
        .get(`provider/providers/?limit=10000&categories=${cat}`)
        .then(response => {
          this.searched = response.data.results;
          this.fetchProviders(response.data.results);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti paslaugų tiekėjų sąrašo.", "danger");
          console.log(err);
        });
      axios
        .get("provider/categories/?limit=10000")
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
    if (this.allProviders.length == 0) {
      this.getData();
      console.log("Zero");
    } else {
      console.log("Ok");
    }
    this.searched = this.allProviders;
    this.cats = this.allProviderCategories;
    // this.fetchReviews(this.searched);
  },
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    currentSort: "id",
    currentSortOrder: "asc",
    search: null,
    searched: [],
    cats: {}
  })
};
</script>

<style>
.atsiliepimas {
  height: 116px !important;
  width: 330px;
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px 0 rgba(199, 199, 199, 0.5);
  float: left;
  padding: 7px;
  margin: 15px;
}

.atsiliepimai .md-list {
  display: inline-block !important;
}

.atsiliepimas .md-avatar {
  height: 93px;
  width: 103px;
  border-radius: 0;
  overflow: hidden;
  margin-right: 10px;
}

.atsiliepimas .md-avatar img {
  max-width: 100%;
  height: auto;
}

.atsiliepimas .md-ripple {
  padding: 0 !important;
}

.atsiliepimas a {
  float: left;
  display: block;
}

.atsiliepimas .md-list-item-text {
  width: 193px;
}

.atsiliepimas .md-list-item-content {
  display: block;
}

.atsiliepimas .md-list-item-content {
  overflow: visible !important;
  height: 50px;
  display: block;
  text-align: left;
}

div.content.container.mb-4.atsiliepimai
  > div
  > div
  > ul
  > li:nth-child(30)
  > div
  > div
  > a:nth-child(2) {
  width: 192px;
  display: block;
}
</style>
