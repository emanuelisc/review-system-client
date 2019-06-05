<template>
  <div class="left-menu">
    <h3>Meniu</h3>
    <ul>
      <li @click="onOpen('user-review')">Atsiliepimai</li>
      <li @click="onOpen('user-comment')">Komentarai</li>
      <li @click="onOpen('user-mistake')">Pranešti apie klaidą</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "administration-menu",
  components: {},
  methods: {
    onOpen(name) {
      this.$router.push({
        name: name
      });
    }
  }
};
</script>

<style scoped>
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

li{
    cursor: pointer;
}
</style>
