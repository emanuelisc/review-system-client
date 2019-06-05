<template>
  <ul class="nav nav-mobile-menu">
    <li>
      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        <i class="material-icons">dashboard</i>
        <p>Dashboard</p>
      </a>
    </li>
    <li>
      <drop-down>
        <a href="#" data-toggle="dropdown" class="dropdown-toggle">
          <i class="material-icons">person</i>
          <p>Profilis</p>
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
          <li>
            <a href="#">Admin Nustatymai</a>
          </li>
          <li>
            <a href="#" @click="logout">Atsijungti</a>
          </li>
        </ul>
      </drop-down>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      search: null,
      selectedEmployee: null
    };
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/admin/login");
      });
    }
  }
};
</script>
