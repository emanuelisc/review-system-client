<template>
  <div class="content administravimas">
    <div class="container">
      <div class="row">
        <h1>Administravimas</h1>
        <div class="col-md-4">
          <administration-menu/>
        </div>
        <div class="col-md-8">
          <h3>Naudotojo administracinis puslapis</h3>
          <p>Norėdami atlikti veiksmus, pasirinkite meniu punktą kairėje.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdministrationMenu from "./AdministrationMenu";
export default {
  components: { AdministrationMenu },
  data() {
    return {
      modal: false
    };
  },
  created(){
      this.modal = false;
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
