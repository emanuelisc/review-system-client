<template>
  <form>
    <md-card>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Pavadinimas</label>
              <md-input type="text" v-model="category.name" name="name"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-50 text-left">
            <md-button
              v-if="this.$route.name != 'review-new'"
              @click="onDelete()"
              class="md-raised md-danger"
            >Pašalinti kategoriją</md-button>
          </div>
          <div class="md-layout-item md-size-50 text-right">
            <md-button
              v-if="this.$route.name != 'review-cat-new'"
              @click="onUpdate()"
              class="md-raised md-success"
            >Atnaujinti informaciją</md-button>
            <md-button v-else @click="onCreate()" class="md-raised md-success">Sukurti kategoriją</md-button>
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
    ...mapActions(["getReviewCategory", "addReviewCategory"]),
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
      var r = confirm("Ar tikrai pašalinti kategoriją?");
      if (r == true) {
        this.$store
          .dispatch("deleteReviewCategory", this.$route.params.id)
          .then(() => {
            this.notifyVue("Kategorija sėkmingai pašalinta!", "success");
            this.$router.push({ name: "review-cat-list" });
          })
          .catch(err =>
            this.notifyVue("Nepavyko pašalinti kategorijos.", "danger")
          );
      }
    },
    onUpdate() {
      var object = {};
      object["name"] = this.category.name;
      axios
        .patch(`review/categories/${this.$route.params.id}/`, object)
        .then(response => {
          this.notifyVue("Kategorija sėkmingai atnaujinta!", "success");
        })
        .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
    },
    onCreate() {
      var object = {};
      object["name"] = this.category.name;
      axios
        .post("review/categories/", object)
        .then(response => {
          this.addReviewCategory(response.data);
          this.notifyVue("Kategorija sėkmingai pridėta!", "success");
          this.$router.push({
            name: "review-cat-list"
          });
        })
        .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
    },
    getData() {
      axios
        .get(`review/categories/${this.$route.params.id}/`)
        .then(response => {
          this.category = response.data;
          this.getReviewCategory(response.data);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti kategorijos informacijos.", "danger");
          console.log(err);
        });
    }
  },
  computed: mapGetters(["oneReviewCategory", "allReviewCategories"]),
  created() {
    if (this.$route.name != "review-cat-new") {
      this.getData();
      this.category = this.oneReviewCategory;
    }
  },
  data() {
    return {
      category: {}
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
