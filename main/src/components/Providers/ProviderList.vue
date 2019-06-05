<template>
  <div>
    <md-table
      v-model="searched"
      :md-sort.sync="currentSort"
      :md-sort-order.sync="currentSortOrder"
      :md-sort-fn="customSort"
      :table-header-color="tableHeaderColor"
    >
      <md-table-toolbar>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Ieškoti..." v-model="search" @input="searchName"/>
        </md-field>
      </md-table-toolbar>
      <md-table-empty-state md-label="Nieko nerasta!"></md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }" class="conditional">
        <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Pavadinimas" md-sort-by="title">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Paslaugų skaičius" md-numeric>{{ item.services.length }}</md-table-cell>
        <md-table-cell md-label="Kategorijos">
          <md-list>
            <!-- <md-list-item :key="category" v-for="category in item.categories"><span :key="cat.id" v-for="cat in cats" v-if="cat.id === category">{{ cat.name }}</span></md-list-item> -->
            <md-list-item
              :key="cat.id"
              v-for="cat in cats.filter(function(cate) {
                return item.categories.includes(cate.id);
                })"
            >
              <h6>{{ cat.name }}</h6>
            </md-list-item>
          </md-list>
        </md-table-cell>
        <md-table-cell md-label="Aktyvus?" class="condition">
          <span v-if="item.is_active" class="ok">+</span>
          <span v-else>-</span>
        </md-table-cell>
        <md-table-cell md-label="Patvirtintas?" class="condition">
          <span v-if="item.is_confirmed" class="ok">+</span>
          <span v-else>-</span>
        </md-table-cell>
        <md-table-cell md-label="Veiksmai">
          <md-button @click="details(item.id)" class="md-just-icon md-simple md-primary fixed-btn">
            <md-icon>edit</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
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
  name: "provider-list",
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
        name: "provider-edit",
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
    getData() {
      axios
        .get("provider/providers/")
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
          this.fetchProviderCats(this.cats);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti kategorijų sąrašo.", "danger");
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
    // this.fetchProviders(this.searched);
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

<style scoped>
.condition span {
  font-size: 25px;
  font-weight: 700;
  text-align: left;
  padding-left: 25px;
  color: #ef5350;
}

.condition span.ok {
  color: #4caf50;
}

.info {
  cursor: pointer;
}

.fixed-btn {
  margin: 0 !important;
  height: 25px !important;
}

.md-list {
  display: block;
  padding: 0 !important;
}

.md-list-item {
  float: left;
}
</style>

<style>
.md-numeric{
    text-align: center!important;
}
</style>


