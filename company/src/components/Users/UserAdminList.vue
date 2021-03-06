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
        <md-table-cell md-label="Vardas" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="El. paštas" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Įstaiga?" class="condition">
          <span v-if="item.is_company" class="ok">+</span>
          <span v-else>-</span>
        </md-table-cell>
        <md-table-cell md-label="Admin?" class="condition">
          <span v-if="item.is_staff" class="ok">+</span>
          <span v-else>-</span>
        </md-table-cell>
        <md-table-cell md-label="Aktyvus?" class="condition">
          <span v-if="item.is_active" class="ok">+</span>
          <span v-else>-</span>
        </md-table-cell>
        <md-table-cell md-label="Patvirtintas?" class="condition">
          <span v-if="item.is_confirmed" class="ok">+</span>
          <span v-else>-</span>
        </md-table-cell>
        <md-table-cell md-label="Info">
          <router-link :to="{ name: 'user-info', params: { id: item.id }}">
            <md-icon>info</md-icon>
          </router-link>
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
      if (
        toLower(item.name).includes(toLower(term)) |
        toLower(item.email).includes(toLower(term))
      ) {
        return true;
      }
    });
  }

  return items;
};

export default {
  name: "user-admin-table",
  methods: {
    ...mapActions(["fetchUsers", "deleteUser", "updateUser"]),
    details(id) {
      this.$router.push({
        name: "user-list",
        params: { id }
      });
    },
    notifyVue(message, type) {
      this.$notify({
        message,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type
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
      this.searched = searchByName(this.allUsers, this.search);
    },
    getData() {
      axios
        .get("user/admin/users/")
        .then(response => {
          this.searched = response.data.results;
          this.fetchUsers(response.data.results);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti vartotojų sąrašo.", "danger");
          console.log(err);
        });
    }
  },
  computed: mapGetters(["allUsers"]),
  created() {
    if (this.allUsers.length == 0) {
      this.getData();
      console.log("Zero");
    } else {
      console.log("Ok");
    }
    this.searched = this.allUsers;
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
    linkPrev: "",
    linkNext: ""
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
</style>

<style>
.md-table-sortable-icon {
  position: relative !important;
  top: 6px !important;
  margin-right: -6px !important;
  right: unset !important;
}
</style>


