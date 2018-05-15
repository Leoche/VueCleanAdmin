<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="/src/assets/imgs/newlogo/logo-color-dark.svg" alt="Vuecleanadmin logo">
      </a>
      <a class="navbar-item" href="/">
        <b-icon icon="arrow-left" size="is-small"></b-icon> Retour au site
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
          <UserAvatar class="menu-avatar" :user="getUser" size="30" />
          <span>Mon compte</span>
          <b-icon icon="menu-down"></b-icon>
        </a>

        <b-dropdown-item custom paddingless>
          <a class="navbar-item" @click.prevent="logout">
            Déconnexion
          </a>
        </b-dropdown-item>
      </b-dropdown>
  </div>
</div>
</nav>
</template>

<script>
import UserAvatar from '@/components/ui/UserAvatar'

export default {
  name: 'Navbar',
  components: {
    UserAvatar
  },
  computed: {
    getUser () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
    },
    logout () {
      this.$session.destroy()
      this.$store.dispatch('logout')
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
  position: fixed;
  top: 0;
  left: 0;
  height:56px;
  width: 100%;
  z-index: 38;
  box-shadow:0 10px 35px rgba(0,0,0,.1), 0 2px 5px rgba(0,0,0,.1);

  .menu-avatar{
    border-radius: 50%;
    margin-right:8px;
  }
  .navbar-brand img{
    height: 40px;
    width: 125px;
    max-width: none;
    max-height: none;
  }
  @media only screen and (max-width: 900px) {
    .navbar-brand .navbar-item:first-child {
      overflow: hidden;
      width: 50px;
    }
  }
  .navbar-brand .navbar-item span{
    margin-right:8px;
  }
  .navbar-menu .navbar-item span{
    margin-left:8px;
  }
}
</style>
