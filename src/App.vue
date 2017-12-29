<template>
  <div id="app">
    <template v-if="isLogged()">
      <Dashboard></Dashboard>
    </template>
    <template v-else>
      <Login></Login>
    </template>
  </div>
</template>

<script>
import Dashboard from './components/Dashboard'
import Login from './components/Login'

export default {
  name: 'app',
  components: {
    Dashboard,
    Login
  },
  mounted () {
  // eslint-disable-next-line
    console.log(this.isLogged())
  },
  methods: {
    isLogged () {
      return this.$session.has('user')
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$primary: #167df0;
$blue-color:#11CDC5;
$pink-color:#FC2D79;
$yellow-color:#ffb52a;

$colors: (
  "white": ($white, $black),
  "black": ($black, $white),
  "light": ($light, $light-invert),
  "dark": ($dark, $dark-invert),
  "primary": ($primary, $primary-invert),
  "info": ($info, $info-invert),
  "success": ($success, $success-invert),
  "warning": ($warning, $warning-invert),
  "danger": ($danger, $danger-invert),
  );
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
