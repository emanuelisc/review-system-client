<template>
  <form>
    <md-card>
      <md-card-content>
        <div class="md-headline">{{ ticket.title }}</div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <div class="md-subheading md-date-icon">
              <strong>Pranešimo informacija</strong>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Pavadinimas:</div>
              <p>{{ ticket.title }}</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Data:</div>
              <p>{{ ticket.date }}</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Būsena:</div>
              <p class="text-danger" v-if="ticket.is_active">Atsakytas</p>
              <p class="text-info" v-else>Neatsakytas</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Pakeisti būseną:</div>
              <md-switch v-model="ticket.is_active" @change="onUpdate"></md-switch>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <div class="md-subheading">Tekstas:</div>
              <p>{{ ticket.description }}</p>
            </div>
            <md-divider></md-divider>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <div class="md-subheading">
              <Strong>Susijusi informacija</Strong>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <div class="md-subheading">Iš kur pranešimas išsiųstas:</div>
              <p v-if="ticket.object_type===0">Kita</p>
              <p v-else-if="ticket.object_type===1">Kitas atsiliepimas</p>
              <p v-else-if="ticket.object_type===2">Įmonės atsiliepimas</p>
              <p v-else-if="ticket.object_type===3">Įmonės paslaugos atsiliepimas</p>
              <div v-if="ticket.object_type!==0" class="md-subheading">Nuoroda į objektą:</div>
            </div>
            <md-divider></md-divider>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <div class="md-subheading">
              <strong>Vartotojo informacija</strong>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Vardas Pavardė:</div>
              <p>{{ user.name }}</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">El. paštas:</div>
              <p>{{ user.email }}</p>
            </div>
            <div v-if="user.is_company" class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Įmonės atstovas:</div>
              <p v-if="user.is_company" class="danger-text">Taip</p>
            </div>
            <div v-if="user.is_company" class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Įmonės nuoroda:</div>
              <p>{{ user.provider_id }}</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Užblokuotas:</div>
              <p v-if="user.is_active" class="text-info">Ne</p>
              <p v-else class="text-danger">Taip</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Patvirtintas el. paštas:</div>
              <p v-if="user.is_confirmed" class="text-info">Taip</p>
              <p v-else class="text-danger">Ne</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Viso profilio nuoroda:</div>
              <router-link :to="{ name: 'user-info', params: { id: user.id }}">Nuoroda</router-link>
            </div>
            <md-divider></md-divider>
          </div>
          <div class="md-layout-item md-size-100">
            <md-button @click="onDelete()" class="md-raised md-danger">Pašalinti pranešimą</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "@/plugins/axios";
export default {
  name: "ticket-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  methods: {
    ...mapActions(["getTicket", "getUser", "updateTicket"]),
    notifyVue(message, type) {
      this.$notify({
        message: message,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: type
      });
    },
    onDelete() {
      var r = confirm("Ar tikrai pašalinti pranešimą?");
      if (r == true) {
        this.$store
          .dispatch("deleteTicket", this.$route.params.id)
          .then(() => this.$router.push("/pranesimai"))
          .catch(err =>
            this.notifyVue("Nepavyko pašalinti pranešimo.", "danger")
          );
      }
    },
    onUpdate() {
      var form_data = new FormData();
      form_data.append("is_active", this.ticket.is_active);
      axios
        .patch(`ticket/admin/${this.$route.params.id}/`, form_data)
        .then(response => {
          this.getTicket(this.ticket);
          this.updateTicket(this.ticket);
        })
        .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
    },
    getData() {
      axios
        .get(`ticket/admin/${this.$route.params.id}/`)
        .then(response => {
          this.ticket = response.data;
          this.getVartotojas(this.ticket.user);
          this.getTicket(response.data);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti puslapio informacijos.", "danger");
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
    }
  },
  computed: mapGetters(["oneTicket", "oneUser"]),
  created() {
    this.getData();
    this.ticket = this.oneTicket;
    this.user = this.oneUser;
  },
  data() {
    return {
      user: {},
      ticket: {},
      selectedFile: null,
      selected: []
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

.md-layout-item.md-size-50 {
  float: left;
}

.md-layout-item.md-size-100 {
  float: left;
}
</style>

<style>
.editor-label {
  position: absolute !important;
  top: -10px !important;
}
</style>
