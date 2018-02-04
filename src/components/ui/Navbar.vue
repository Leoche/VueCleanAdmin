<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="/src/assets/va-color.svg" alt="Vuecleanadmin logo">
     </a>
     <div class="navbar-burger" :class="{ 'is-active': open }" @click="toggle">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <div class="navbar-menu" :class="{ 'is-active': open }">
   <div class="navbar-end">
    <b-dropdown position="is-bottom-left">
      <a class="navbar-item" slot="trigger">
        <i class="mdi mdi-account-circle mdi-24px"></i> {{ $session.get('user').name }}
        <b-icon icon="menu-down"></b-icon>
      </a>

      <b-dropdown-item custom paddingless>
        <a class="navbar-item" @click.prevent='logout'>
          Déconnexion
        </a>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    toggle () {
      this.open = !this.open
    },
    logout () {
      this.$session.destroy()
      location.reload()
    }
  },
  data () {
    return {
      open: false
    }
  }
}
</script>

<style scoped lang="scss">
nav{
  box-shadow:0 0 5px rgba(0,0,0,.25)
}
.navbar-item i{
  margin-right:4px;
}
</style>
