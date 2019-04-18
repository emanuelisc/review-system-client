<template>
  <form>
    <md-card>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Vardas Pavardė</label>
              <md-input type="text" v-model="name" name="name"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Elektroninis paštas</label>
              <md-input type="email" v-model="email" name="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Slaptažodis</label>
              <md-input type="password" name="password" v-model="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label class="check">Administratorius?</label>
              <input type="checkbox" name="is_staff" v-model="is_staff">
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label class="check">Įstaigos atst?</label>
              <input type="checkbox" name="is_company" v-model="is_company">
            </md-field>
          </div>
          <div class="md-layout-item md-size-50">
            <md-field maxlength="5" v-if="this.$route.name != 'user-new'">
              <label>Nuotrauka</label>
              <a class="img" :href="this.oneUser.image" target="_blank">Nuoroda</a>
              <input @change="onFileSelected" type="file" accept="image/*" id="file-input">
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label class="check">Aktyvus</label>
              <input type="checkbox" name="is_active" v-model="is_active">
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label class="check">Patvirtintas el.p.?</label>
              <input type="checkbox" name="is_confirmed" v-model="is_confirmed">
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button
              v-if="this.$route.name != 'user-new'"
              @click="onUpdate()"
              class="md-raised md-success"
            >Atnaujinti informaciją</md-button>
            <md-button v-else @click="onCreate()" class="md-raised md-success">Pridėti vartotoją</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "user-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  methods: {
    ...mapActions(["getUser", "updateUser"]),
    notifyVue(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "Operacija nepavyko.",
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "danger"
      });
    },
    notifySuccess(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "Vartotojo informacija sėkmingai atnaujinta.",
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success"
      });
    },
    notifyAddSuccess(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "Vartotojas sėkmingai sukurtas.",
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success"
      });
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    onUpdate() {
      const fd = new FormData();
      fd.append("name", this.name);
      fd.append("email", this.email);
      fd.append("is_staff", this.is_staff);
      fd.append("is_company", this.is_company);
      fd.append("is_active", this.is_active);
      fd.append("is_confirmed", this.is_confirmed);
      if (this.selectedFile) {
        fd.append("image", this.selectedFile, this.selectedFile.name);
      }
      if (this.password != "") {
        fd.append("password", this.password);
      }
      this.$store
        .dispatch("updateUser", { updUser: fd, id: this.$route.params.id })
        .then(
          () => this.getUser(this.$route.params.id),
          this.notifySuccess("top", "center")
        )
        .catch(err => this.notifyVue("top", "center"));
    },
    onCreate() {
      const fd = new FormData();
      fd.append("name", this.name);
      fd.append("email", this.email);
      fd.append("is_staff", this.is_staff);
      fd.append("is_company", this.is_company);
      fd.append("is_active", this.is_active);
      fd.append("is_confirmed", this.is_confirmed);
      fd.append("password", this.password);
      this.$store
        .dispatch("addUser", fd)
        .then(
          () =>
            this.$router.push({
              name: "user-list"
            }),
          this.notifyAddSuccess("top", "center")
        )
        .catch(err => this.notifyVue("top", "center"));
    }
  },
  computed: mapGetters(["oneUser"]),
  mounted() {
    if (this.$route.name != "user-new") {
      this.getUser(this.$route.params.id);
      this.name = this.oneUser.name;
      this.email = this.oneUser.email;
      this.is_staff = this.oneUser.is_staff;
      this.is_company = this.oneUser.is_company;
      this.is_active = this.oneUser.is_active;
      this.is_confirmed = this.oneUser.is_confirmed;
      this.image = this.oneUser.image;
      if (!this.oneUser.name && !this.oneUser.email) {
        this.$router.push({
          name: "user-info",
          params: { id: this.$route.params.id }
        });
      }
    }
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      is_staff: false,
      is_company: false,
      is_active: true,
      is_confirmed: false,
      image: "",
      selectedFile: null
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
