<template>
  <form>
    <md-card>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Pavadinimas</label>
              <md-input type="text" v-model="page.title" name="title"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label class="editor-label">Tekstas</label>
              <ckeditor :editor="editor" v-model="page.text" :config="editorConfig"></ckeditor>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Slug (nuorodos tekstas)</label>
              <md-input type="text" v-model="page.slug" name="slug"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-datepicker v-model="page.date" name="date" md-immediately>
              <label>Sukūrimo data</label>
            </md-datepicker>
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
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>Nuotrauka</label>
              <a class="img" :href="page.image" target="_blank">Nuoroda</a>
              <input @change="onFileSelected" type="file" accept="image/*" id="file-input">
            </md-field>
          </div>
          <div class="md-layout-item md-size-50 text-left">
            <md-button
              v-if="this.$route.name != 'page-new'"
              @click="onDelete()"
              class="md-raised md-danger"
            >Pašalinti puslapį</md-button>
          </div>
          <div class="md-layout-item md-size-50 text-right">
            <md-button
              v-if="this.$route.name != 'page-new'"
              @click="onUpdate()"
              class="md-raised md-success"
            >Atnaujinti informaciją</md-button>
            <md-button v-else @click="onCreate()" class="md-raised md-success">Sukurti puslapį</md-button>
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
  name: "page-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  methods: {
    ...mapActions(["getPage", "fetchPageCats", "addPage"]),
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
      var r = confirm("Ar tikrai pašalinti puslapį?");
      if (r == true) {
        this.$store
          .dispatch("deletePage", this.$route.params.id)
          .then(() => this.$router.push("/puslapiai"))
          .catch(err =>
            this.notifyVue("Nepavyko pašalinti puslapio.", "danger")
          );
      }
    },
    onUpdate() {
      var object = {};
      object["title"] = this.page.title;
      object["text"] = this.page.text;
      object["categories"] = this.selected;
      object["slug"] = this.page.slug;
      var form_data = new FormData();
      form_data.append("title", this.page.title);
      if (this.selectedFile) {
        form_data.append("image", this.selectedFile, this.selectedFile.name);
      }
      axios
        .patch(`page/pages/${this.$route.params.id}/`, object)
        .then(response => {
          this.$store
            .dispatch("updatePage", { id: response.data.id, param: form_data })
            .then(() =>
              this.$router.push({
                name: "page-list"
              })
            )
            .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
        })
        .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
    },
    onCreate() {
      var object = {};
      object["title"] = this.page.title;
      object["text"] = this.page.text;
      object["slug"] = this.page.slug;
      object["categories"] = this.selected;
      var form_data = new FormData();
      form_data.append("title", this.page.title);
      if (this.selectedFile) {
        form_data.append("image", this.selectedFile, this.selectedFile.name);
      }
      axios
        .post("page/pages/", object)
        .then(response => {
          this.addPage(response.data);
          this.$store
            .dispatch("updatePage", { id: response.data.id, param: form_data })
            .then(() =>
              this.$router.push({
                name: "page-list"
              })
            )
            .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
        })
        .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
    },
    getData() {
      axios
        .get(`page/pages/${this.$route.params.id}/`)
        .then(response => {
          this.page = response.data;
          this.selected = response.data.categories;
          this.getPage(response.data);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti puslapio informacijos.", "danger");
          console.log(err);
        });
    },
    getCats() {
      axios
        .get("page/categories/")
        .then(res => {
          this.cats = res.data;
          this.fetchPageCats(this.cats);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti kategorijų sąrašo.", "danger");
          console.log(err);
        });
    }
  },
  computed: mapGetters(["onePage", "allPageCategories"]),
  created() {
    if (this.$route.name != "page-new") {
      this.getData();
      this.page = this.onePage;
      this.selected = this.onePage.categories;
    }
    if (this.allPageCategories.length <= 0) {
      this.getCats();
    }
    this.cats = this.allPageCategories;
  },
  data() {
    return {
      cats: [],
      page: {},
      selectedFile: null,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
      },
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
</style>

<style>
.editor-label {
  position: absolute !important;
  top: -10px !important;
}
</style>
