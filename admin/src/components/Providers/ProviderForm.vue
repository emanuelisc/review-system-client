<template>
  <form>
    <md-card>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Pavadinimas</label>
              <md-input type="text" v-model="provider.title" name="title"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label class="editor-label">Aprašymas</label>
              <ckeditor :editor="editor" v-model="provider.description" :config="editorConfig"></ckeditor>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label class="check">Aktyvus?</label>
              <input type="checkbox" name="is_active" v-model="provider.is_active">
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label class="check">Patvirtintas?</label>
              <input type="checkbox" name="is_confirmed" v-model="provider.is_confirmed">
            </md-field>
          </div>
          <div class="md-layout-item md-size-50">
            <md-table>
              <md-table-row>
                <md-table-cell :key="cat.id" v-for="cat in cats">
                  <input type="checkbox" :id="cat.name" :value="cat.id" v-model="selected">
                  <label :for="cat.name">{{ cat.name }}</label>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
          <div
            v-if="this.$route.name == 'provider-new'"
            class="md-layout-item md-small-size-100 md-size-100"
          >
            <div class="md-subheading">Administruojantis vartotojas:</div>
            <md-autocomplete
              v-model="admin_user"
              :md-options="users.map(x=>({
    'id':x.id,
    'name':x.name,
    'email':x.email,
    'toLowerCase':()=>x.name.toLowerCase(),
    'toString':()=>x.name,
        'toLowerCase':()=>x.email.toLowerCase(),
    'toString':()=>x.email
  }))"
              md-dense
            >
              <label>Vartotojai</label>

              <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                <md-highlight-text v-wrapit :md-term="term">{{ item.email }} - {{ item.name }}</md-highlight-text>
              </template>

              <template slot="md-autocomplete-empty" slot-scope="{ term }">
                <label v-wrapit style="white-space: pre-wrap;">Nerasta nieko</label>
              </template>
            </md-autocomplete>
          </div>
          <div v-else class="md-layout-item md-small-size-100 md-size-100">
            <div class="md-subheading">Administruojantis vartotojas:</div>
            <p>
              {{ user.name }} - {{ user.email }}
              <router-link :to="{ name: 'user-info', params: { id: user.id }}">Nuoroda</router-link>
            </p>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>Nuotrauka</label>
              <a class="img" :href="provider.image" target="_blank">Nuoroda</a>
              <input @change="onFileSelected" type="file" accept="image/*" id="file-input">
            </md-field>
          </div>
          <div
            v-if="this.$route.name != 'provider-new'"
            class="md-layout-item md-small-size-100 md-size-100"
          >
            <div class="md-subheading">Paslaugos:</div>
            <md-table v-model="services">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Pavadinimas">{{ item.title }}</md-table-cell>
                <md-table-cell md-label="Aprašymas">{{ item.description }}</md-table-cell>
              </md-table-row>
            </md-table>
          </div>
          <div class="md-layout-item md-size-50 text-left">
            <md-button
              v-if="this.$route.name != 'provider-new'"
              @click="onDelete()"
              class="md-raised md-danger"
            >Pašalinti puslapį</md-button>
          </div>
          <div class="md-layout-item md-size-50 text-right">
            <md-button
              v-if="this.$route.name != 'provider-new'"
              @click="onUpdate()"
              class="md-raised md-success"
            >Atnaujinti informaciją</md-button>
            <md-button
              v-else
              @click="onCreate()"
              class="md-raised md-success"
            >Sukurti paslaugų tiekėją</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "@/plugins/axios";
export default {
  name: "provider-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  directives: {
    wrapit: {
      inserted: function(el, binding, vnode) {
        el.style.height = `${el.scrollHeight}px`;
        el.style.color = "red";
        console.log("el", el.scrollHeight, el.offsetHeight, el);
      }
    }
  },
  methods: {
    ...mapActions([
      "getProvider",
      "fetchProviderCats",
      "addProvider",
      "getUser",
      "fetchUsers",
      "getProviderServices"
    ]),
    notifyVue(message, type) {
      this.$notify({
        message: message,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: type
      });
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    onDelete() {
      var r = confirm("Ar tikrai pašalinti paslaugų tiekėją?");
      if (r == true) {
        this.$store
          .dispatch("deleteProvider", this.$route.params.id)
          .then(() => this.$router.push("/imones"))
          .catch(err =>
            this.notifyVue("Nepavyko pašalinti paslaugų tiekėjo.", "danger")
          );
      }
    },
    onUpdate() {
      var object = {};
      object["title"] = this.provider.title;
      object["description"] = this.provider.description;
      object["categories"] = this.selected;
      object["is_active"] = this.provider.is_active;
      object["is_confirmed"] = this.provider.is_confirmed;
      var form_data = new FormData();
      form_data.append("title", this.provider.title);
      if (this.selectedFile) {
        form_data.append("image", this.selectedFile, this.selectedFile.name);
      }
      axios
        .patch(`provider/providers/${this.$route.params.id}/`, object)
        .then(response => {
          this.$store
            .dispatch("updateProvider", {
              id: response.data.id,
              param: form_data
            })
            .then(() =>
              this.$router.push({
                name: "provider-list"
              })
            )
            .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
        })
        .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
    },
    onCreate() {
      var object = {};
      object["title"] = this.provider.title;
      object["description"] = this.provider.description;
      object["categories"] = this.selected;
      object["is_active"] = this.provider.is_active;
      object["admin_user"] = this.admin_user.id;
      object["is_confirmed"] = this.provider.is_confirmed;
      var form_data = new FormData();
      form_data.append("title", this.provider.title);
      if (this.selectedFile) {
        form_data.append("image", this.selectedFile, this.selectedFile.name);
      }
      axios
        .post("provider/providers/", object)
        .then(response => {
          this.addProvider(response.data);
          this.$store
            .dispatch("updateProvider", {
              id: response.data.id,
              param: form_data
            })
            .then(() =>
              this.$router.push({
                name: "provider-list"
              })
            )
            .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
        })
        .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
    },
    getUsersList() {
      axios
        .get("user/admin/users/")
        .then(response => {
          this.users = response.data.results;
          this.fetchUsers(response.data.results);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti vartotojų sąrašo.", "danger");
          console.log(err);
        });
    },
    getData() {
      axios
        .get(`provider/providers/${this.$route.params.id}/`)
        .then(response => {
          this.provider = response.data;
          this.getVartotojas(response.data.admin_user);
          this.getServices(this.provider.id);
          this.services = this.providerServices;
          this.selected = response.data.categories;
          this.getProvider(response.data);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti informacijos.", "danger");
          console.log(err);
        });
    },
    getVartotojas(id) {
      axios
        .get("user/admin/users/" + id + "/")
        .then(response => {
          this.user = response.data;
          this.getUser(response.data);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti vartotojo informacijos.", "danger");
          console.log(err);
        });
    },
    getServices(id) {
      axios
        .get("provider/services/?provider=" + id)
        .then(response => {
          this.services = response.data.results;
          this.getProviderServices(response.data.results);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti informacijos.", "danger");
          console.log(err);
        });
    },
    getCats() {
      axios
        .get("provider/categories/")
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
  computed: mapGetters([
    "oneProvider",
    "allProviderCategories",
    "oneUser",
    "allUsers",
    "providerServices"
  ]),
  created() {
    if (this.$route.name != "provider-new") {
      this.getData();
      this.provider = this.oneProvider;
      this.selected = this.oneProvider.categories;
      this.services = this.providerServices;
    } else {
      if (this.allUsers.length <= 0) {
        this.getUsersList();
      }
      this.users = this.allUsers;
    }
    if (this.allProviderCategories.length <= 0) {
      this.getCats();
    }
    this.user = this.oneUser;
    this.cats = this.allProviderCategories;
  },
  data() {
    return {
      cats: [],
      provider: {},
      selectedFile: null,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      selected: [],
      user: {},
      users: [],
      admin_user: null,
      services: []
    };
  }
};
</script>
<style scoped>
.uploading-image {
  display: flex;
}

.img {
  float: left;
  display: block;
  position: absolute;
  top: 25px;
  left: 80px;
}

.check {
  position: relative;
  left: 0;
  top: 0px;
  margin-right: 15px;
}

input[type="file" i] {
  height: 32px;
  padding: 0;
  display: block;
  flex: 1;
  border: none;
  background: none;
  transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: font-size, padding-top, color;
  font-family: inherit;
  font-size: 16px;
  line-height: 32px;
  height: 36px;
  padding: 7px 0;
  font-size: 14px !important;
  -webkit-text-fill-color: #495057 !important;
  margin-top: 30px;
}
</style>

<style>
.editor-label {
  position: absolute !important;
  top: -10px !important;
}
</style>
