<template>
  <div class="navbar">
    <div class="container">
      <md-toolbar md-elevation="0" class="md-transparent">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <h3 class="md-title">Atsiliepimai</h3>
          </div>
          <div class="md-toolbar-section-end">
            <div class="md-collapse">
              <md-list>
                <md-list-item href="#/">Apie mus</md-list-item>
                <md-list-item href="#/">
                  <drop-down>
                    <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                      Kategorijos
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <a href="#">Mike John responded to your email</a>
                      </li>
                      <li>
                        <a href="#">You have 5 new tasks</a>
                      </li>
                      <li>
                        <a href="#">You're now friend with Andrew</a>
                      </li>
                      <li>
                        <a href="#">Another Notification</a>
                      </li>
                      <li>
                        <a href="#">Another One</a>
                      </li>
                    </ul>
                  </drop-down>
                </md-list-item>
                <md-list-item href="#/" class="imonems" v-if="!isLoggedIn">Įmonėms</md-list-item>
                <md-list-item href="#/" class="prisijungti" v-if="!isLoggedIn">Prisijungti</md-list-item>
                <md-list-item href="#/user" v-if="isLoggedIn">
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
                </md-list-item>
              </md-list>
            </div>
          </div>
        </div>
      </md-toolbar>
    </div>
  </div>
</template>

<script>
export default {
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
      ]
    };
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="css"></style>

<style>
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

.navbar .md-list-item a{
    text-transform: capitalize!important;
    color: #fdfffe !important;
  font-family: Roboto;
  font-size: 14px;
  letter-spacing: 0.08px;
  line-height: 16px;
      top: 1px;
}

.navbar .dropdown-menu li > a{
    color: #333!important;
}

.navbar .md-list-item .md-list-item-content {
  /* padding: 0!important; */
}

.navbar .md-list-item{
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
.container > div,
.container > div > div {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.navbar {
  background-color: #332259;
  height: 80px;
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

