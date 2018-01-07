<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <svg width="35" height="10" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
         <circle fill="#11CDC5" cx="5" cy="5" r="5" />
         <circle fill="#FC2D79" cx="17.5" cy="5" r="5" />
         <circle fill="#ffb52a" cx="30" cy="5" r="5" />
       </svg>
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
