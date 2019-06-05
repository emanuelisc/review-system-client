<template>
  <div class="navbar">
    <div class="container">
      <md-toolbar md-elevation="0" class="md-transparent">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <h3 class="md-title">
              <a href="/">Atsiliepimai</a>
            </h3>
          </div>
          <div class="md-toolbar-section-end">
            <div class="md-collapse">
              <md-list>
                <md-list-item href="/puslapis/76/">Apie mus</md-list-item>
                <md-list-item href="/imoniu-kategorijos">
                  <drop-down>
                    <!-- <a slot="title" class="dropdown-toggle" data-toggle="dropdown">Kategorijos</a> -->
                    <a slotclass="dropdown-toggle">Kategorijos</a>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li v-for="item in cats" v-bind:key="item.id">
                        <a v-bind:href="'/imones/?category=' + item.id">{{ item.name }}</a>
                      </li>
                    </ul>
                  </drop-down>
                </md-list-item>
                <md-list-item href="/company/login" class="imonems" v-if="!isLoggedIn">Įmonėms</md-list-item>
                <md-list-item href="/administravimas" class="imonems" v-if="isLoggedIn">Profilis</md-list-item>
                <md-list-item href="#/" class="imonems" @click="logout" v-if="isLoggedIn">Atsijungti</md-list-item>
                <md-list-item
                  href="#/"
                  @click="modal = true"
                  class="prisijungti"
                  v-if="!isLoggedIn"
                >Prisijungti</md-list-item>
                <!-- <md-list-item href="#/user" v-if="isLoggedIn">
                  <drop-down>
                    <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                      <i class="material-icons">person</i>
                      <p class="hidden-lg hidden-md">Profilis</p>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <a href="#">Admin Nustatymai</a>
                      </li>
                      <li>
                        <a href="#" @click="logout">Atsijungti</a>
                      </li>
                    </ul>
                  </drop-down>
                </md-list-item>-->
              </md-list>
            </div>
          </div>
        </div>
      </md-toolbar>
    </div>
    <md-dialog :md-active.sync="modal">
      <md-dialog-title>Prisijungite prie sistemos</md-dialog-title>
      <md-content md-dynamic-height>
        <div class="col-md-6">
          <div class="login-container">
            <form class="login" @submit.prevent="login">
              <p class="h4 text-center mb-4">Prisijungti</p>
              <label class="grey-text">Elektroninis paštas</label>
              <input
                ref="input"
                required
                v-model="email"
                type="email"
                name="email"
                class="form-control"
              >
              <br>
              <label class="grey-text">Slaptažodis</label>
              <input required v-model="password" type="password" class="form-control">
              <div class="text-center mt-4">
                <button class="btn btn-indigo" type="submit">Prisijungti</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-6">
          <div class="login-container social">
            <p class="h4 text-center mb-4">Prisijungti per socialinius tinklus</p>
            <div class="login-container">
              <a href="#">
                <i class="material-icons">assignment_ind</i>
              </a>
            </div>
          </div>
        </div>
        <p class="jei-neturi">
          Neturite paskyros?
          <a href="#" @click="modal2 = true; modal = false">Užsiregistruokite</a>
        </p>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="modal = false">Atšaukti</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog :md-active.sync="modal2">
      <md-dialog-title>Prisijungite prie sistemos</md-dialog-title>
      <md-content md-dynamic-height>
        <div class="col-md-6">
          <div class="login-container">
            <form class="login" @submit.prevent="login">
              <p class="h4 text-center mb-4">Prisijungti</p>
              <label class="grey-text">Elektroninis paštas</label>
              <input
                ref="input"
                required
                v-model="email"
                type="email"
                name="email"
                class="form-control"
              >
              <br>
              <label class="grey-text">Slaptažodis</label>
              <input required v-model="password" type="password" class="form-control">
              <div class="text-center mt-4">
                <button class="btn btn-indigo" type="submit">Registruotis</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-6">
          <div class="login-container social">
            <p class="h4 text-center mb-4">Registruotis per socialinius tinklus</p>
            <div class="login-container">
              <a href="#">
                <i class="material-icons">assignment_ind</i>
              </a>
            </div>
          </div>
        </div>
        <p class="jei-neturi">
          Jau užsiregistravote?
          <a href="#" @click="modal = true; modal2 = false">Prisijungite</a>
        </p>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="modal2 = false">Atšaukti</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import Register from "@/views/Register.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "@/plugins/axios";
export default {
  components: { Register },
  data() {
    return {
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ],
      modal: false,
      modal2: false,
      email: "",
      password: "",
      cats: []
    };
  },
  computed: {
    ...mapGetters(["allProviderCategories"]),
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    ...mapActions(["fetchProviderCats"]),
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => {
          this.modal = false;
          this.$router.push("/administravimas");
        })
        .catch(err => {
          this.notifyVue("top", "center");
          NProgress.done();
        });
    },
    notifyVue(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "Neteisingi prisijungimo duomenys! Pabandykite dar kartą.",
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "danger"
      });
    },
    notifyPerm(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "Neturite leidimo prisijungti!",
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "danger"
      });
    },
    getData() {
      axios
        .get("provider/categories/?limit=20")
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
    if (this.cats.length == 0) {
      this.getData();
    }
    this.cats = this.allProviderCategories;
    // this.fetchReviews(this.searched);
  }
};
</script>

<style lang="css"></style>

<style>
.md-title a,
.md-title a:hover,
.md-title a:visited {
  color: #fff !important;
}

.md-toolbar .notification {
  display: none !important;
}
.navbar-nav > li:hover > .dropdown-menu,
.dropdown:hover .dropdown-menu {
  opacity: 1;
  filter: alpha(opacity=100);
  visibility: visible;
  margin-top: 0px;
}

.navbar .md-list-item-link {
  color: #fdfffe !important;
  font-family: Roboto;
  font-size: 14px;
  letter-spacing: 0.08px;
  line-height: 16px;
  text-align: center;
  top: 4px;
  padding: 2px 15px;
  text-transform: capitalize !important;
}

.col-md-6 {
  width: 50%;
  float: left;
}

.md-dialog-title {
  text-align: center;
}

.navbar .md-list-item a {
  text-transform: capitalize !important;
  color: #fdfffe !important;
  font-family: Roboto;
  font-size: 14px;
  letter-spacing: 0.08px;
  line-height: 16px;
  top: 1px;
}

.navbar .dropdown-menu li > a {
  color: #333 !important;
}

.navbar .md-list-item .md-list-item-content {
  /* padding: 0!important; */
}

.navbar .md-list-item {
  margin-left: 15px;
}

.navbar .md-list-item .md-list-item-container .md-ripple {
  color: #fdfffe !important;
  font-size: 14px !important;
  line-height: 16px !important;
}

.navbar .md-toolbar.md-transparent .md-title,
.navbar .md-toolbar.md-transparent .md-list .md-list-item-content,
.navbar .md-toolbar.md-transparent,
.navbar .md-toolbar.md-transparent:hover,
.navbar .md-toolbar.md-transparent:focus {
  color: #fdfffe !important;
}
</style>


<style scoped>
.login-container.social a {
  width: 100%;
  text-align: center;
  display: block;
}

p.jei-neturi {
  text-align: center;
  width: 100%;
  display: block;
  float: left;
}

.login-container.social a i {
  font-size: 35px;
}
.container > div,
.container > div > div {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.navbar {
  background-color: #332259;
  height: 80px;
}

.md-title {
  line-height: unset !important;
}

.navbar .md-title {
  color: #fdfffe !important;
  /* font-family: ""; */
  font-size: 27px;
  font-weight: bold;
  letter-spacing: -0.81px;
  line-height: 38px;
  text-align: center;
}

.navbar .md-toolbar {
  padding-top: 15px !important;
  padding-bottom: 15px !important;
}

.imonems {
  border: 1px solid #ffffff;
  border-radius: 3px;
}

.prisijungti {
  border-radius: 3px;
  background-color: #d95204;
}
</style>

<style scoped>
.text-center {
  text-align: center !important;
}

.mb-4,
.my-4 {
  margin-bottom: 1.5rem !important;
}
.mt-4,
.my-4 {
  margin-top: 1.5rem !important;
}
.h4,
h4 {
  font-size: 22px;
  font-weight: 500;
  color: #000;
}
.grey-text {
  color: #9e9e9e !important;
  font-size: 16px;
  margin-bottom: 10px;
  display: block;
}
.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-image: none;
}

.login-container {
  padding: 15px;
}

.btn-indigo {
  background-color: #3f51b5 !important;
  color: #fff;
  cursor: pointer;
}

.btn {
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 0.84rem 2.14rem;
  font-size: 0.81rem;
  -webkit-transition: color 0.15s ease-in-out,
    background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  -o-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  margin: 0.375rem;
  border: 0;
  -webkit-border-radius: 0.125rem;
  border-radius: 0.125rem;
  cursor: pointer;
  text-transform: uppercase;
  white-space: normal;
  word-wrap: break-word;
}
</style>
