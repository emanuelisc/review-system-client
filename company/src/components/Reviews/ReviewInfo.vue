<template>
  <form>
    <md-card>
      <md-card-content>
        <!-- <div class="md-headline">{{ review.title }}</div> -->
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <div class="md-subheading md-date-icon">
              <strong>Atsiliepimo informacija</strong>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Pavadinimas:</div>
              <p>{{ review.title }}</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Data:</div>
              <p>{{ review.date }}</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Automatiškai patikrintas:</div>
              <p class="text-danger" v-if="review.is_auto_confirmed">Geras</p>
              <p class="text-info" v-else>Blogas</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Pakeisti būseną:</div>
              <md-switch v-model="review.is_auto_confirmed" @change="onUpdateCheck"></md-switch>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <div class="md-subheading">Kategorijos:</div>
                <div>
                    <ul>
                        <li :key="cat.id" v-for="cat in review.categories">
                            {{ cat.name}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Reitingas: {{ review.rating }}</div>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <div class="md-subheading">Tekstas:</div>
              <p>{{ review.description }}</p>
            </div>
            <md-divider></md-divider>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <div class="md-subheading">
              <strong>Vartotojo informacija - {{ review.user.id }}</strong>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Vardas Pavardė:</div>
              <p>{{ review.user.name }}</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">El. paštas:</div>
              <p>{{ review.user.email }}</p>
            </div>
            <div v-if="review.user.is_company" class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Įmonės atstovas:</div>
              <p v-if="review.user.is_company" class="danger-text">Taip</p>
            </div>
            <div v-if="review.user.is_company" class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Įmonės nuoroda:</div>
              <p>{{ review.user.provider_id }}</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Užblokuotas:</div>
              <p v-if="review.user.is_active" class="text-info">Ne</p>
              <p v-else class="text-danger">Taip</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Patvirtintas el. paštas:</div>
              <p v-if="review.user.is_confirmed" class="text-info">Taip</p>
              <p v-else class="text-danger">Ne</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Viso profilio nuoroda:</div>
              <router-link :to="{ name: 'user-info', params: { id: review.user.id }}">Nuoroda</router-link>
            </div>
            <md-divider></md-divider>
          </div>
          <div class="md-layout-item md-size-50">
            <md-button @click="onDelete()" class="md-raised md-danger">Pašalinti atsiliepimą</md-button>
          </div>
            <div class="md-layout-item md-size-50 text-right">
            <md-button @click="onCheck()" class="md-raised md-danger">Patikrinti, ar tinkamas</md-button>
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
  name: "review-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  methods: {
    ...mapActions(["getReview", "getUser", "updateReview"]),
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
          .dispatch("deleteReview", this.$route.params.id)
          .then(() => this.$router.push("/atsiliepimai"))
          .catch(err =>
            this.notifyVue("Nepavyko pašalinti atsiliepimo.", "danger")
          );
      }
    },
    onUpdate() {
      var form_data = new FormData();
      form_data.append("is_active", this.review.is_active);
      axios
        .patch(`review/reviews/${this.$route.params.id}/`, form_data)
        .then(response => {
          this.getReview(this.review);
          this.updateReview(this.review);
        })
        .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
    },
    onUpdateCheck() {
      var form_data = new FormData();
      form_data.append("is_auto_confirmed", this.review.is_auto_confirmed);
      axios
        .patch(`review/reviews/${this.$route.params.id}/`, form_data)
        .then(response => {
          this.getReview(this.review);
          this.updateReview(this.review);
        })
        .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
    },
    onCheck() {
      var object = {};
      object["title"] = this.review.title;
      object["text"] = this.review.description;
      axios
        .post(`review/reviews/check/`, object)
        .then(response => {
            if(response.data.results == 1){
                this.notifyVue("Turinys tinkamas! " + response.data.probability + "%", "success");
            } else if(response.data.results == 0){
                this.notifyVue("Turinys netinkamas!", "primary");
            }
        })
        .catch(err => { this.notifyVue("Operacija nepavyko", "danger"); this.spinner = false;});
    },
    getData() {
      axios
        .get(`review/reviews/${this.$route.params.id}/`)
        .then(response => {
          this.review = response.data;
          this.getReview(response.data);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti atsiliepimo informacijos.", "danger");
          console.log(err);
        });
    },
  },
  computed: mapGetters(["oneReview", "oneUser"]),
  created() {
    this.getData();
    this.review = this.oneReview
  },
  data() {
    return {
      user: {},
      review: {},
      selectedFile: null,
      selected: [],
      dialog: false,
      dialogResults: null,
      spinner: false
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

.spinner-block{
    padding: 15px;
    text-align: center;
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 30px;
}
</style>

<style>
.editor-label {
  position: absolute !important;
  top: -10px !important;
}
</style>
