<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import url from '../static/js/url.js'
export default {
  name: "App",
  created() {
    // this.wechatapiWxLogin()
  },
  methods: {
    wechatapiWxLogin() {
      let openId = localStorage.getItem("openId");
      if (openId === "" || openId === undefined || openId === null) {
        openId = this.getopenid("openId");
        if (openId === "" || openId === undefined || openId === null) {
          window.location.href = url.wechatapiWxLogin;
        } else {
          localStorage.setItem("openId", openId);
        }
      } else {
        localStorage.setItem("openId", openId);
      }
      // this.$Spin.hide()
    },
    getopenid(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    }
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
