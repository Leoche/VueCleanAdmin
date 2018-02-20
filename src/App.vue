<template>
  <div id="app">
    <template v-if="isLogged">
      <Dashboard></Dashboard>
    </template>
    <template v-else>
      <Login></Login>
    </template>
    <pre>
      {{ $session.get('user') }}
    </pre>
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
  computed: {
    isLogged () {
      return this.$store.getters.isLogged
    }
  },
  mounted () {
    this.$store.dispatch('initSession', this.$session.get('user'))
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

.fadedown-enter-active, .fadedown-leave-active, .fadeleft-enter-active, .fadeleft-leave-active, .fadeup-enter-active, .fadeup-leave-active {
  transition: all .5s ease;
}
.fadedown-enter, .fadedown-leave-to {
  opacity: 0;
  transform: translateY(-50px) scale(.8);
}
.fadeup-enter, .fadeup-leave-to {
  opacity: 0;
  transform: translateY(50px) scale(.8);
}
.fadeleft-enter, .fadeleft-leave-to {
  opacity: 0;
  transform: translateX(50px) scale(.8);
}
@for $i from 0 through 9 {
  .columns .column .card--list:nth-child(#{$i}), .columns .column--card:nth-child(#{$i}) .card--list {
    transition: all .5s ease #{$i/10}s;
  }
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
}
</style>
