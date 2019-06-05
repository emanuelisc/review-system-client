<template>
  <footer class="footer">
    <div class="container">
      <div class="copyright text-center big-footer">
        Susisiekite -
        <a href="mailto:sveiki@atsiliepimai.tk">sveiki@atsiliepimai.lt</a>
      </div>
      <div class="copyright text-center">
        &copy; {{ new Date().getFullYear() }}
        Atsiliepimai, Visos teisės saugomos
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style>
footer {
  background-color: #332259;
}
</style>

<style scoped>
.copyright.big-footer {
  color: #fff;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
}

.big-footer a,
.big-footer a:hover,
.big-footer a:focus,
.big-footer a:active,
.big-footer a:visited {
  color: #ec9c23;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  text-decoration: underline;
}

.copyright {
  color: #fff;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 300;
}
</style>

