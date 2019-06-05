<template>
  <div class="login-container">
    <form class="login" @submit.prevent="register">
      <p class="h4 text-center mb-4">Registruotis</p>
      <label class="grey-text">Elektroninis paštas</label>
      <input ref="input" required v-model="email" type="email" name="email" class="form-control">
      <label class="grey-text">Vardas Pavardė</label>
      <input ref="input" required v-model="name" type="name" name="name" class="form-control">
      <br>
      <label class="grey-text">Slaptažodis</label>
      <input required v-model="password" type="password" class="form-control">
      <br>
      <label class="grey-text" for="password-confirm">Patvirtinti slaptažodį</label>
      <input
        id="password-confirm"
        type="password"
        class="form-control"
        v-model="password_confirmation"
        required
      >
      <div class="text-center mt-4">
        <button class="btn btn-indigo" type="submit">Sukurti paskyrą</button>
      </div>
      <span class="span-register">Jau esate užiregistravę? <router-link :to="{ name: 'login'}">Prisijungti</router-link></span>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      is_admin: null
    };
  },
  methods: {
    register: function() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    },
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.checkPermissions())
        .catch(err => this.notifyVue("top", "center"));
    },
    checkPermissions() {
      if (!this.$store.getters.me.is_company) {
        this.$store.dispatch("logout").then(() => {
          this.$router.push("/login");
          this.notifyPerm("top", "center");
        });
      } else {
        this.$router.push("/");
      }
    },
    notifyVue(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "Neteisingi prisijungimo duomenys! Pabandykite dar kartą.",
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "danger"
      });
    },
    notifyPerm(verticalAlign, horizontalAlign) {
      this.$notify({
        message: "Neturite leidimo prisijungti!",
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "danger"
      });
    }
  }
};
</script>

<style scoped>
.text-center {
  text-align: center !important;
}

.span-register{
        text-align: center;
    width: 100%;
    display: block;
    position: relative;
    top: 11px;
}

form {
  padding: 30px 15px;
  background-color: white;
  border-radius: 5px;
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.mb-4,
.my-4 {
  margin-bottom: 1.5rem !important;
}
.mt-4,
.my-4 {
  margin-top: 1.5rem !important;
}
.h4,
h4 {
  font-size: 27px;
  font-weight: 500;
  color: #000;
}
.grey-text {
  color: #9e9e9e !important;
  font-size: 16px;
  margin-bottom: 10px;
  display: block;
}
.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-image: none;
}

.login-container {
  width: 350px;
  margin-top: 160px;
  margin: 0 auto;
  padding: 160px 0;
}

.btn-indigo {
  background-color: #3f51b5 !important;
  color: #fff;
  cursor: pointer;
}

.btn {
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 0.84rem 2.14rem;
  font-size: 0.81rem;
  -webkit-transition: color 0.15s ease-in-out,
    background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  -o-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  margin: 0.375rem;
  border: 0;
  -webkit-border-radius: 0.125rem;
  border-radius: 0.125rem;
  cursor: pointer;
  text-transform: uppercase;
  white-space: normal;
  word-wrap: break-word;
}
</style>
