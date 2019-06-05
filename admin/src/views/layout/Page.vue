<template>
  <div class="content administravimas">
    <div class="container">
      <div class="row">
        <h1>{{ page.title }}</h1>
        <div class="col-md-12" style="margin-bottom: 160px">
            <div v-html="page.text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "@/plugins/axios";

export default {
  components: {},
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
          .then(() => this.$router.push("/admin/puslapiai"))
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
          this.cats = res.data.results;
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
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 30px;
  font-weight: 500;
  width: 100%;
  text-align: left;
  display: block;
}

.col-md-4,
.col-md-8 {
  float: left;
}

.col-md-4 {
  width: 25%;
}

.col-md-8 {
  width: 75%;
}

.left-menu {
  margin-bottom: 120px;
  width: 100%;
  display: block;
}

.left-menu ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.row {
  width: 100%;
  display: block;
}
</style>
