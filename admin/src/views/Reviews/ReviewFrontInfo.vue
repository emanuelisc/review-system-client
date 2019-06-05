<template>
  <div class="content container mb-4 atsiliepimai">
    <div class="md-layout w-100">
      <h1 class="page-title">Atsiliepimas</h1>

      <div class="md-layout-item md-small-size-66 md-size-66">
        <div v-if="review.image" class="md-layout-item md-small-size-100 md-size-50">
          <img :src="review.image" :alt="review.title">
        </div>
        <div v-else class="md-layout-item md-small-size-100 md-size-50">
          <img
            src="https://topekacivictheatre.com/wp-content/uploads/2019/01/no-image.jpg"
            :alt="review.title"
          >
        </div>
        <div class="md-layout-item md-small-size-100 md-size-50">
          <p>{{ review.date }}</p>
          <div class="md-subheading">{{ review.title }}</div>
        </div>

        <div class="md-layout-item md-small-size-100 md-size-100">
          <p v-html="review.description" style="margin-top: 30px;"></p>
        </div>
        <div v-if="review.categories.length" class="md-layout-item md-small-size-100 md-size-100">
          <div class="md-subheading">Kategorijos:</div>
          <div>
            <ul>
              <li :key="cat.id" v-for="cat in review.categories">{{ cat.name}}</li>
            </ul>
          </div>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-50">
          <div class="md-subheading">
            Reitingas: {{ review.rating }}
            <a href="#" @click="rating_up()">
              <md-icon>thumb_up</md-icon>
            </a>
            <a href="#" @click="rating_down()">
              <md-icon>thumb_down</md-icon>
            </a>
          </div>
        </div>
      </div>
      <div class="md-layout-item md-small-size-33 md-size-33">
        <div class="md-subheading">
          <strong>Naudotojo informacija</strong>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-50">
          <div class="md-subheading">El. paštas:</div>
          <p>{{ review.user.email }}</p>
          <div class="md-subheading">Vardas Pavardė:</div>
          <p>{{ review.user.name }}</p>
          <div class="md-subheading">
            <!-- <a v-bind:href="'/naudotojas/' + review.user.id">Naudotojo profilis</a> -->
          </div>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-50">
          <img v-if="review.user.image != ''" :src="review.user.image" :alt="review.user.name">
          <img
            v-else
            src="https://s3-ap-northeast-1.amazonaws.com/cgblogassets/wp-content/uploads/sites/2/2018/06/20045814/default-avatar.png"
            :alt="review.user.name"
          >
        </div>
        <!-- <div class="md-layout-item md-small-size-100 md-size-50">
          <div class="md-subheading">Naudotojo profilis:</div>
          <router-link :to="{ name: 'user-info', params: { id: review.user.id }}">Nuoroda</router-link>
        </div>-->
      </div>
      <div class="md-layout-item md-small-size-80 md-size-80 front-comment">
        <div class="md-subheading">
          <strong>Komentarai</strong>
        </div>
        <md-list class="md-triple-line">
          <md-list-item :key="comment.id" v-for="comment in comments">
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
            <md-list v-if="comment.reply_set" class="md-triple-line">
              <md-list-item :key="reply.id" v-for="reply in comment.reply_set">
                <div class="md-list-item-text">
                  <span>{{ reply.user.name }}</span>
                  <span>{{ reply.date }} {{ reply.id }}</span>
                  <p v-html="reply.content"></p>
                </div>
              </md-list-item>
            </md-list>
          </md-list-item>

          <!-- <md-divider class="md-inset"></md-divider> -->
        </md-list>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <md-field>
            <label v-if="isLoggedIn" class="editor-label">Pridėti naują komentarą</label>
            <label v-else class="editor-label">Norėdami pridėti komentarą, prisijungite!</label>
            <ckeditor v-if="isLoggedIn" :editor="editor" v-model="text" :config="editorConfig"></ckeditor>
          </md-field>
          <div class="md-layout-item md-size-100 text-right">
            <md-button @click="onCreate()" class="md-raised md-success">Pridėti komentarą</md-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "@/plugins/axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  components: {},
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
      NProgress.done();
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
    },
    onCreate() {
      var object = {};
      object["content"] = this.text;
      object["review"] = this.$route.params.id;
      axios
        .post("review/comments/", object)
        .then(response => {
          this.addComment(response.data);
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
    rating_up() {
      //   console.log(localStorage.getItem('id'));
      axios
        .get(
          `review/rating/?user=${localStorage.getItem("id")}&id=${
            this.review.id
          }&val=2/`
        )
        .then(response => {
          NProgress.done();
          this.notifyVue("Reitingas pateiktas", "success");
          this.review.rating = this.review.rating + 1;
        })
        .catch(err => {
          //     console.log()
          //   this.notifyVue(
          //     "Prisijungite prie sistemos norėdami reitinguoti.",
          //     "danger"
          //   );
          var klaida = err.toString();
          if (klaida.includes("403")) {
            this.notifyVue("Jūs jau įvertinote atsiliepimą.", "danger");
          } else if (klaida.includes("401")) {
            this.notifyVue(
              "Prisijungite prie sistemos norėdami reitinguoti.",
              "danger"
            );
          } else if (klaida.includes("500")) {
            this.notifyVue(
              "Prisijungite prie sistemos norėdami reitinguoti.",
              "danger"
            );
          } else {
            this.notifyVue("Reitingas pateiktas", "success");
          }
          NProgress.done();
          //   console.log(err);
        });
    },
    rating_down() {
      axios
        .get(
          `review/rating/?user=${localStorage.getItem("id")}&id=${
            this.review.id
          }&val=1/`
        )
        .then(response => {
          //   console.log(response.data);
          NProgress.done();
          this.notifyVue("Reitingas pateiktas", "success");
          this.review.rating = this.review.rating - 1;
        })
        .catch(err => {
          var klaida = err.toString();
          if (klaida.includes("403")) {
            this.notifyVue("Jūs jau įvertinote atsiliepimą.", "danger");
          } else if (klaida.includes("401")) {
            this.notifyVue(
              "Prisijungite prie sistemos norėdami reitinguoti.",
              "danger"
            );
          } else if (klaida.includes("500")) {
            this.notifyVue(
              "Prisijungite prie sistemos norėdami reitinguoti.",
              "danger"
            );
          } else {
            this.notifyVue("Reitingas pateiktas", "success");
          }
          NProgress.done();
          //   console.log(err);
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
      comments: [],
      userID: 0,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      text: ""
    };
  }
};
</script>

<style>
.front-comment .md-list,
.front-comment .md-list-item-content {
  display: block !important;
}

.front-comment .md-list-item-text,
.front-comment .md-avatar {
  float: left;
}

.front-comment .md-list ul {
  margin-left: 30px;
      margin-top: 27px;
}

.front-comment .md-list ul li .md-list-item-text{
        border: 1px solid #332259;
    padding: 5px 15px;
    min-width: 350px;
    background-color: #3322590f;
}
.w-100 {
  width: 100%;
}

.md-list-item-content .md-list-action:last-of-type {
  margin: 0 15px 0 16px;
}

.md-list.md-triple-line.md-theme-default {
  width: 100%;
}
</style>


<style scoped>
.btn-width {
  width: 150px !important;
  margin-right: 30px;
}
.btn-width2 {
  width: 200px !important;
}

.md-layout-item {
  float: left;
}
</style>
