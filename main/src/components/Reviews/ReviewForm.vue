<template>
  <form>
    <md-card>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Pavadinimas</label>
              <md-input type="text" v-model="review.title" name="title"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label class="editor-label">Tekstas</label>
              <ckeditor :editor="editor" v-model="review.description" :config="editorConfig"></ckeditor>
            </md-field>
          </div>
          <div class="md-layout-item md-size-50 kategorija">
            <md-table class="md-scrollbar">
              <md-table-row>
                <md-table-cell :key="cat.id" v-for="cat in cats">
                  <input type="checkbox" :id="cat.name" :value="cat" v-model="selected">
                  <label :for="cat.name">{{ cat.name }}</label>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
          <div class="md-layout-item md-size-50 kategorija">
            <md-field>
                <label>Reitingas</label>
                <md-input v-model="review.rating" type="number"></md-input>
            </md-field>
          </div>
          <!-- <div class="md-layout-item md-size-50">
            <md-chips class="md-primary" md-limit=7 v-model="tags" md-placeholder="Pridėti tagų..."></md-chips>
          </div> -->

          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>Nuotrauka</label>
              <a class="img" :href="review.image" target="_blank">Nuoroda</a>
              <input @change="onFileSelected" type="file" accept="image/*" id="file-input">
            </md-field>
          </div>
          <div class="md-layout-item md-size-50 text-left">
            <md-button
              v-if="this.$route.name != 'review-new'"
              @click="onDelete()"
              class="md-raised md-danger"
            >Pašalinti atsiliepimą</md-button>
          </div>
          <div class="md-layout-item md-size-50 text-right">
            <md-button
              v-if="this.$route.name != 'review-new'"
              @click="onUpdate()"
              class="md-raised md-success"
            >Atnaujinti informaciją</md-button>
            <md-button v-else @click="onCreate()" class="md-raised md-success">Sukurti atsiliepimą</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
 import VueHashtagTextarea from 'vue-hashtag-textarea'
import axios from "@/plugins/axios";
export default {
  name: "review-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  components: {
      VueHashtagTextarea,
    },
  methods: {
    ...mapActions(["getReview", "fetchReviewCats", "addReview"]),
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
      var r = confirm("Ar tikrai pašalinti atsiliepimą?");
      if (r == true) {
        this.$store
          .dispatch("deleteReview", this.$route.params.id)
          .then(() => this.$router.push("/atsiliepimai"))
          .catch(err =>
            this.notifyVue("Nepavyko pašalinti atsiliepimą.", "danger")
          );
      }
    },
    getCatIds(categories){
        var newCats = [];
        for (var i = 0; i < categories.length; i++) { 
            newCats.push(categories[i].id);
        }
        return newCats;
    },
    onUpdate() {
      var object = {};
      object["title"] = this.review.title;
      object["description"] = this.review.description;
      object["categories"] = this.getCatIds(this.selected);
      object["user"] = this.review.user;
      object["rating"] = this.review.rating;
      var form_data = new FormData();
      form_data.append("title", this.review.title);
      if (this.selectedFile) {
        form_data.append("image", this.selectedFile, this.selectedFile.name);
      }
      axios
        .patch(`review/reviews/${this.$route.params.id}/`, object)
        .then(response => {
          this.$store
            .dispatch("updateReview", { id: response.data.id, param: form_data })
            .then(() =>
              this.$router.push({
                name: "review-list"
              })
            )
            .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
        })
        .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
    },
    onCreate() {
      var object = {};
      object["title"] = this.review.title;
      object["description"] = this.review.description;
      object["categories"] = this.getCatIds(this.selected);
      object["rating"] = this.review.rating;
      var form_data = new FormData();
      form_data.append("title", this.review.title);
      if (this.selectedFile) {
        form_data.append("image", this.selectedFile, this.selectedFile.name);
      }
      axios
        .post("review/reviews/", object)
        .then(response => {
          this.addReview(response.data);
          this.$store
            .dispatch("updateReview", { id: response.data.id, param: form_data })
            .then(() =>
              this.$router.push({
                name: "review-list"
              })
            )
            .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
        })
        .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
    },
    getData() {
      axios
        .get(`review/reviews/${this.$route.params.id}/`)
        .then(response => {
          this.review = response.data;
          this.selected = response.data.categories;
          this.getReview(response.data);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti atsiliepimo informacijos.", "danger");
          console.log(err);
        });
    },
    getCats() {
      axios
        .get("review/categories/")
        .then(res => {
          this.cats = res.data.results;
          this.fetchReviewCats(this.cats);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti kategorijų sąrašo.", "danger");
          console.log(err);
        });
    }
  },
  computed: mapGetters(["oneReview", "allReviewCategories"]),
  created() {
    if (this.$route.name != "review-new") {
      this.getData();
      this.review = this.oneReview;
      this.selected = this.oneReview.categories;
    }
    if (this.allReviewCategories.length <= 0) {
      this.getCats();
    }
    this.cats = this.allReviewCategories;
  },
  data() {
    return {
      cats: [],
      review: {},
      selectedFile: null,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      selected: [],
      tags: []
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

.kategorija .md-table-content.md-scrollbar{
    max-height: 200px;
}

.kategorija .md-table-content.md-scrollbar td{
    width: 100%;
    display: block;
}
</style>
