<template>
  <div class="content container mb-4 atsiliepimai">
    <div class="md-layout w-100">
      <h1 class="page-title">Atsiliepimas</h1>
      <review-form></review-form>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "@/plugins/axios";

import { ReviewForm } from "@/components";

export default {
  components: {
    ReviewForm
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
    }
  },
  computed: mapGetters(["oneReview", "oneUser"]),

  data() {
    return {
      user: {},
      review: {},
      selectedFile: null,
      selected: [],
      dialog: false,
      dialogResults: null,
      spinner: false,
      comments: []
    };
  }
};
</script>

<style>
.w-100 {
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
