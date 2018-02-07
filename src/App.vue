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

.fadedown-enter-active, .fadedown-leave-active, .fadeleft-enter-active, .fadeleft-leave-active {
  transition: all .5s ease;
}
.fadedown-enter, .fadedown-leave-to {
  opacity: 0;
  transform: translateY(-50px)
}
.fadeleft-enter, .fadeleft-leave-to {
  opacity: 0;
  transform: translateX(50px)
}
.card--list {
  transition: all 0.9s ease;
}
@for $i from 1 through 9 {
  .card--list:nth-child(#{$i}) {
    transition: all #{$i/10}s ease;
  }
}
</style>
