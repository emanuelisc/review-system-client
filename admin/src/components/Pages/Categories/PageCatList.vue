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
        <md-table-cell md-label="Pavadinimas" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Redaguoti">
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
  name: "page-cat-list",
  computed: mapGetters(["allPageCategories"]),
  methods: {
    ...mapActions(["fetchPageCats"]),
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
        name: "page-cat-edit",
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
      this.searched = searchByName(this.allPageCategories, this.search);
    },
    getData() {
      axios
        .get("page/categories/")
        .then(response => {
          this.searched = response.data;
          this.fetchPageCats(response.data);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti kategorijų sąrašo.", "danger");
          console.log(err);
        });
    }
  },
  created() {
    if (this.allPageCategories.length == 0) {
      this.getData();
      console.log("Zero");
    } else {
      console.log("Ok");
    }
    this.searched = this.allPageCategories;
    // this.fetchPages(this.searched);
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
    searched: []
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
.md-table-sortable-icon {
  position: relative !important;
  top: 6px !important;
  margin-right: -6px !important;
  right: unset !important;
}

.ck-editor {
  width: 100% !important;
}

.md-list-item .md-list-item-container .md-ripple {
  padding: 5px !important;
}

.md-list-item-content {
  min-height: unset !important;
  font-size: 14px !important;
}
</style>


