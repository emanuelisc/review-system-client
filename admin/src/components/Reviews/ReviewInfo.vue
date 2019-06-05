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
            <div class="md-layout-item md-small-size-100 md-size-50" v-if="perm !== 'company'">
              <div class="md-subheading">Automatiškai patikrintas:</div>
              <p class="text-danger" v-if="review.is_auto_confirmed">Geras</p>
              <p class="text-info" v-else>Blogas</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50" v-if="perm !== 'company'">
              <div class="md-subheading">Pakeisti būseną:</div>
              <md-switch v-model="review.is_auto_confirmed" @change="onUpdateCheck"></md-switch>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <div class="md-subheading">Kategorijos:</div>
              <div>
                <ul>
                  <li :key="cat.id" v-for="cat in review.categories">{{ cat.name}}</li>
                </ul>
              </div>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <div class="md-subheading">Reitingas: {{ review.rating }}</div>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <div class="md-subheading">Tekstas:</div>
              <p v-html="review.description"></p>
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
            <div class="md-layout-item md-small-size-100 md-size-50" v-if="perm !== 'company'">
              <div class="md-subheading">Užblokuotas:</div>
              <p v-if="review.user.is_active" class="text-info">Ne</p>
              <p v-else class="text-danger">Taip</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50" v-if="perm !== 'company'">
              <div class="md-subheading">Patvirtintas el. paštas:</div>
              <p v-if="review.user.is_confirmed" class="text-info">Taip</p>
              <p v-else class="text-danger">Ne</p>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50" v-if="perm !== 'company'">
              <div class="md-subheading">Viso profilio nuoroda:</div>
              <router-link :to="{ name: 'user-info', params: { id: review.user.id }}">Nuoroda</router-link>
            </div>
            <md-divider></md-divider>
          </div>
          <div class="md-layout-item md-size-50" v-if="perm !== 'company'">
            <md-button @click="onDelete()" class="md-raised md-danger">Pašalinti atsiliepimą</md-button>
          </div>
          <div class="md-layout-item md-size-50 text-right" v-if="perm !== 'company'">
            <md-button @click="onCheck()" class="md-raised md-danger">Patikrinti, ar tinkamas</md-button>
          </div>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100 admin-comment">
          <div class="md-subheading">
            <strong>Komentarai</strong>
            <md-list class="md-triple-line">
              <md-list-item :key="comment.id" v-for="comment in allComments">
                <md-avatar>
                  <img :src="comment.user.image" :alt="comment.user.name">
                </md-avatar>

                <div class="md-list-item-text">
                  <span>{{ comment.user.name }}</span>
                  <span>{{ comment.date }}</span>
                  <p v-html="comment.content"></p>
                </div>

                <md-button
                  v-if="comment.user.id == userID"
                  @click="onDeleteComment(comment.id)"
                  class="md-icon-button md-list-action"
                >
                  <md-icon class="md-primary">remove</md-icon>
                </md-button>
                <md-button @click="onComment(comment.id)" class>Atsakyti</md-button>
                <md-list v-if="comment.reply_set" class="md-triple-line">
                  <md-list-item :key="reply.id" v-for="reply in comment.reply_set">
                    <div class="md-list-item-text">
                      <span>{{ reply.user.name }}</span>
                      <span>{{ reply.date }} {{ reply.id }}</span>
                      <p v-html="reply.content"></p>
                    </div>

                    <md-button
                      @click="onDeleteComment(reply.id)"
                      class="md-icon-button md-list-action"
                    >
                      <md-icon class="md-primary">remove</md-icon>
                    </md-button>
                  </md-list-item>
                </md-list>
              </md-list-item>

              <!-- <md-divider class="md-inset"></md-divider> -->
            </md-list>
          </div>
        </div>
      </md-card-content>
    </md-card>
    <md-dialog :md-active.sync="modal2">
      <md-dialog-title>Atsakyti į komentarą</md-dialog-title>
      <md-content md-dynamic-height>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <md-field>
            <label v-if="isLoggedIn" class="editor-label">Atsakyti į komentarą</label>
            <label v-else class="editor-label">Norėdami pridėti komentarą, prisijungite!</label>
            <ckeditor v-if="isLoggedIn" :editor="editor" v-model="text" :config="editorConfig"></ckeditor>
          </md-field>
          <!-- <div class="md-layout-item md-size-100"> -->
          <md-button @click="onCreate()" class="md-raised md-success">Atsakyti</md-button>
          <!-- </div> -->
        </div>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="modal2 = false">Atšaukti</md-button>
      </md-dialog-actions>
    </md-dialog>
  </form>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "@/plugins/axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "review-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  isLoggedIn: function() {
    return this.$store.getters.isLoggedIn;
  },
  methods: {
    ...mapActions([
      "getReview",
      "getUser",
      "updateReview",
      "addComment",
      "fetchComments"
    ]),
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
          .then(() => this.$router.push("/admin/atsiliepimai"))
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
          if (response.data.results == 1) {
            this.notifyVue(
              "Turinys tinkamas! " + response.data.probability + "%",
              "success"
            );
          } else if (response.data.results == 0) {
            this.notifyVue("Turinys netinkamas!", "primary");
          }
        })
        .catch(err => {
          this.notifyVue("Operacija nepavyko", "danger");
          this.spinner = false;
        });
    },
    onComment(id) {
      this.modal2 = true;
      this.selComment = id;
    },
    onCreate() {
      var object = {};
      object["content"] = this.text;
      object["review"] = this.$route.params.id;
      object["parent"] = this.selComment;
      object["is_provider"] = true;
      axios
        .post("review/comments/", object)
        .then(response => {
          //   this.addComment(response.data);
          location.reload();
          //   this.comments.push(response.data);
          //   this.$store
          //     .dispatch("addComment", {
          //       id: response.data.id,
          //       param: form_data
          //     }
          //     )
          // .then(() => {})
          // .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
        })
        .catch(err => this.notifyVue("Operacija nepavyko", "danger"));
    },
    onDeleteComment(id) {
      //   var r = confirm("Tikrai pašalinti vartotoją!");
      //   if (r == true) {
      // this.deleteUser(id);
      this.$store
        .dispatch("deleteComment", id)
        .then(() => {
          //   const projectIndex = this.comments.findIndex(
          //     p => p.id === comment.id
          //   );
          //   this.comments.splice(projectIndex, 1);
        })
        .catch(err => this.notifyVue("Nepavyko pašalinti!", "Danger"));
      //   }
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
      axios
        .get(`review/comments/?review=${this.$route.params.id}`)
        .then(response => {
          this.comments = response.data.results;
          console.log(this.comments);
          this.fetchComments(response.data.results);
        })
        .catch(err => {
          this.notifyVue("Nepavyko gauti komentarų.", "danger");
          console.log(err);
        });
    }
  },
  computed: {
    ...mapGetters(["oneReview", "oneUser", "allComments"]),
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  created() {
    this.getData();
    this.review = this.oneReview;
    this.comments = this.allComments;
    this.userID = localStorage.getItem("id");
    this.perm = localStorage.getItem("permissions");
  },
  data() {
    return {
      user: {},
      review: {},
      selectedFile: null,
      selected: [],
      dialog: false,
      dialogResults: null,
      spinner: false,
      perm: "",
      userID: "",
      text: "",
      modal2: false,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      selComment: ""
    };
  }
};
</script>

.<style>
.admin-comment .md-list,
.admin-comment .md-list-item-content {
  display: block !important;
}

.admin-comment .md-list-item-text,
.admin-comment .md-avatar {
  float: left;
}

.admin-comment .md-list ul {
  margin-left: 30px;
}
</style>

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

.spinner-block {
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
