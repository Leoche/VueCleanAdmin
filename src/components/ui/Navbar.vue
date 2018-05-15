<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="/src/assets/imgs/newlogo/logo-color-dark.svg" alt="Vuecleanadmin logo">
      </a>
      <a class="navbar-item is-hidden-touch" href="/">
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
      <b-dropdown class="is-hidden-touch" position="is-bottom-left">
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
      <!-- Mobile -->
      <div class="navbar-item is-subitem is-hidden-desktop" style='margin-top: 0;'>
          Mon Site internet
      </div>
      <router-link  @click.native="toggle" v-for="input in model" class="navbar-item navbar-flex is-hidden-desktop" :key="input.name" :to="((input.type === 'sub') ? '/show/' : '/edit/') + input.name" exact-active-class="is-active">
        <span>{{ input.label }}</span>
        <b-Icon :icon="(input.icon) ? input.icon.replace('mdi-','') : 'help'" size="is-small"></b-Icon>
      </router-link>
      <hr class="navbar-divider is-hidden-desktop" style="display: block;">
      <div class="navbar-item is-subitem is-hidden-desktop">
          Administration
      </div>
      <router-link @click.native="toggle" to="/model" class="navbar-item navbar-flex is-hidden-desktop" exact-active-class="is-active"><span>Model Manager</span><b-icon icon="file-tree" size="is-small"></b-icon></router-link>
      <router-link @click.native="toggle" to="/users" class="navbar-item navbar-flex is-hidden-desktop" exact-active-class="is-active"><span>Users Manager</span><b-icon icon="account-multiple" size="is-small"></b-icon></router-link>
      <router-link @click.native="toggle" to="/medias" class="navbar-item navbar-flex is-hidden-desktop" exact-active-class="is-active"><span>Medias Manager</span><b-icon icon="image-multiple" size="is-small"></b-icon></router-link>
      <hr class="navbar-divider is-hidden-desktop" style="display: block;">
      <div class="navbar-item is-subitem is-hidden-desktop">
          Autres
      </div>
      <a href="#/" @click.native="toggle" class="navbar-item  navbar-flex is-hidden-desktop">
          <span>Retour au site</span>
          <b-icon icon="arrow-left" size="is-small"></b-icon>
      </a>
      <a href="#/" @click.native="toggle" class="navbar-item  navbar-flex is-hidden-desktop" style='padding-bottom: 1rem;'>
          <span>Se déconnecter</span>
          <b-icon icon="logout" size="is-small"></b-icon>
      </a>
    </div>
  </div>
</nav>
</template>

<script>
import { mapGetters } from 'vuex'
import UserAvatar from '@/components/ui/UserAvatar'

export default {
  name: 'Navbar',
  components: {
    UserAvatar
  },
  computed: {
    getUser () {
      return this.$store.getters.getUser
    },
    ...mapGetters({
      model: 'getRootModel'
    })
  },
  methods: {
    toggle () {
      this.open = !this.open
    },
    logout () {
      this.toggle()
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
@import "../../assets/scss/responsive";
@media #{$tablet-down} {
  nav{
    position: static !important;
    height: 52px !important;
  }
}
nav{
  position: fixed;
  top: 0;
  left: 0;
  height:52px;
  width: 100%;
  z-index: 38;
  box-shadow:0 10px 35px rgba(0,0,0,.1), 0 2px 5px rgba(0,0,0,.1);

  .menu-avatar{
    border-radius: 50%;
    margin-right:8px;
  }
  .navbar-brand{
    height:52px;

    & img{
      height: 40px;
      width: 125px;
      max-width: none;
      max-height: none;
    }
  }
  .navbar-brand .navbar-item span{
    margin-right:8px;
  }
  .navbar-menu .navbar-item span{
    margin-left:8px;
  }
  .navbar-flex{
    display: flex;
    & span:first-child{
      flex: 1;
    }
  }
  .navbar-end{
    & .navbar-item.is-subitem{
      margin-top: 1rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      text-transform: uppercase;
      color: #7a7a7a;
    }
  }
}
</style>
