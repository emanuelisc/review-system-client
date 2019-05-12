<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" v-if="oneUser.image" :src="oneUser.image">
      <img class="img" v-else :src="cardUserImage">
    </div>

    <md-card-content>
      <h4 class="category text-gray">Elektroninis paštas - {{ oneUser.email }}</h4>
      <h4 class="card-title">Vardas Pavardė - {{ oneUser.name }}</h4>
      <div class="privilegijos">
        <h5>Aktyvus(neužblokuotas) ir pašto patvirtinimas:</h5>
        <ul>
          <li v-if="oneUser.is_active">Aktyvus</li>
          <li v-else>Užblokuotas</li>
          <li v-if="oneUser.is_confirmed">Patvirtintas</li>
          <li v-else>Nepatvirtintas</li>
        </ul>
      </div>
      <div class="privilegijos">
        <h5 v-if="oneUser.is_staff | oneUser.is_company">Privilegijos:</h5>
        <ul>
          <li v-if="oneUser.is_staff">Administratorius</li>
          <li v-if="oneUser.is_company">Įmonės atstovas</li>
        </ul>
      </div>
      <md-button @click="openForm()" class="md-round md-success">Redaguoti</md-button>
      <md-button @click="deleteThis(oneUser.id)" class="md-round md-danger">Pašalinti</md-button>
    </md-card-content>
  </md-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/default-user-image.png")
    }
  },
  methods: {
    ...mapActions(["getUser", "deleteUser"]),
    deleteThis(id) {
      var r = confirm("Tikrai pašalinti vartotoją!");
      if (r == true) {
        // this.deleteUser(id);
        this.$store
          .dispatch("deleteUser", id)
          .then(() => this.$router.push("/vartotojai"))
          .catch(err => this.notifyVue("top", "center"));
      }
    },
    notifyVue(verticalAlign, horizontalAlign) {
      var color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        message: "Nepavyko pašalinti vartotojo.",
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "danger"
      });
    },
    openForm() {
      this.$router.push({
        name: "user-edit",
        params: { id: this.$route.params.id }
      });
    }
  },
  computed: mapGetters(["oneUser"]),
  mounted() {
    this.getUser(this.$route.params.id);
  }
};
</script>
<style scoped>
h4 {
  text-align: left;
  width: 100%;
}

h5 {
  float: left;
}

.privilegijos {
  width: 100%;
  display: inline-block;
}

ul,
li {
  float: left;
  text-align: left;
}

li {
  margin-right: 25px;
}
</style>
