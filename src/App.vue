<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created () {
    if (localStorage.getItem('adminAccessToken')) {
      this.$store.commit('set_admin_token', localStorage.getItem('adminAccessToken'))
      this.$store.commit('set_admin_name', localStorage.getItem('adminName'))
    }
  }
}
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin: 0 auto;
  height:100%;
</style>
