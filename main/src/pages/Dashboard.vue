<template>
  <div class="content">
    <section class="main-image">
      <div class="container">
        <h2>Nuo šiol vertinkite ir raskite specialistus greitai ir patogiai</h2>
      </div>
    </section>
    <section class="filtras">
      <div class="container">
        <div class="col-md-4-a">
          <h4>Ieškokite. Išsirinkite. Pasinaudokite. Įvertinkite.</h4>
          <div class="filtras-block">
            <md-field>
              <label>Įmonės / asmens pavadinimas</label>
              <md-input v-model="type"></md-input>
            </md-field>
            <md-autocomplete v-model="selectedValue" :md-options="values">
              <label>Veiklos sritis</label>
            </md-autocomplete>
            <md-autocomplete v-model="selectedCountry" :md-options="countries">
              <label>Miestas</label>
            </md-autocomplete>
            <a href="#">Ieškoti</a>
          </div>
        </div>
        <div class="col-md-8-a">
          <div class="veik-block pirmas">
            <label>01.</label>
            <h3>Pavadinimas</h3>
            <p>Jei žinote, įveskite įmonės pavadinimą ar asmens vardą ir pavardę.</p>
          </div>
          <div class="veik-block">
            <label>02.</label>
            <h3>Veiklos sritis</h3>
            <p>Pasirinkite sritį veiklos kurios įmonės ar specialisto ieškote</p>
          </div>
          <div class="veik-block antras">
            <label>03.</label>
            <h3>Miestas</h3>
            <p>Išsirinkite miestą kuriame ieškote paslaugos</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable
} from "@/components";

export default {
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable
  },
  data: () => ({
    selectedCountry: null,
    selectedValue: null,
    countries: [
      "Vilnius",
      "Kaunas",
      "Klaipėda",
      "Panevėžys",
      "Šiauliai",
      "Tauragė",
      "Šilalė",
      "Elektrėnai"
    ],
    values: [
      "Programavimas",
      "Langų valymas",
      "Kompiuterių priežiūra",
      "Restoranas",
      "Auklė"
    ]
  })
};
</script>

<style>
.main-image {
  background-color: #ec9c23;
  height: 486px;
  width: 100%;
}

.main-image .container {
  background-image: url("../assets/img/shutterstock_1175990215.png");
  background-size: contain;
  background-position-x: right;
  height: 486px;
  background-repeat: no-repeat;
}

.main-image .container h2 {
  width: 557px;
  color: #fdfffe;
  font-family: "Roboto";
  font-size: 57px;
  font-weight: bold;
  letter-spacing: -0.73px;
  line-height: 54px;
  margin-top: 90px;
}

.filtras h4 {
  color: #fdfffe;
  font-family: Roboto;
  font-size: 17px;
  font-weight: 300;
  letter-spacing: 0.1px;
  line-height: 21px;
  text-align: center;
}

.col-md-4-a {
  width: 360px;
  float: left;
  position: relative;
  top: -155px;
}
.col-md-8-a {
  width: 780px;
  float: left;
}

.filtras {
  width: 100%;
  height: 260px;
  padding-bottom: 60px;
}

.filtras-block {
  height: 308px;
  width: 360px;
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0 3px 7px 0 rgba(212, 212, 212, 0.5);
  padding: 14px 20px;
}

.filtras-block a,
.filtras-block a:active,
.filtras-block a:focus,
.filtras-block a:visited {
  height: 43px;
  width: 100%;
  border-radius: 3px;
  background-color: #d95204;
  color: #fdfffe !important;
  font-family: Roboto;
  font-size: 14px;
  letter-spacing: 0.08px;
  line-height: 16px;
  text-align: center;
  padding-top: 15px;
  padding-bottom: 15px;
  display: block;
}

.filtras-block a:hover {
  opacity: 0.8;
}

.veik-block {
  width: 265px;
  float: left;
  margin-left: 15px;
}

.veik-block.antras {
  width: 165px;
}

.veik-block.pirmas {
  margin-left: 25px;
}

.veik-block label {
  color: #ec9c23;
  font-family: "Roboto";
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.11px;
  line-height: 28px;
  margin-top: 30px;
  display: block;
}

.veik-block label::after {
  content: "";
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 2px;
  float: right;
  display: inline-block;
  width: 211px;
  position: relative;
  border: 1px solid #e8e8e8;
  top: 15px;
}

.veik-block.antras label::after {
  display: none;
}

.veik-block h3 {
  color: #332259;
  font-family: "Roboto";
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 0.14px;
  line-height: 35px;
  margin-top: 10px;
}

.veik-block p {
  color: #332259;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.08px;
  line-height: 23px;
  width: 165px;
}
</style>

