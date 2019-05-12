<template>
  <router-view></router-view>
</template>

<script>
export default {
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          //   this.$store.dispatch(logout);
        }
        throw err;
      });
    });
  },
};
</script>

<style>
#nprogress .spinner-icon {
    width: 75px;
    height: 75px;
    box-sizing: border-box;
    border: solid 8px transparent;
    border-top-color: #f44336;
    border-left-color: #f44336;
    border-radius: 50%;
    -webkit-animation: nprogress-spinner 400ms linear infinite;
    animation: nprogress-spinner 650ms linear infinite;
    position: absolute;
    top: 40%;
    left: 50%;
}

#nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    /* background-color: #00000045; */
}
</style>