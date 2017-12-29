<template>
  <aside class="menu">
    <p class="menu-label">
      Adminitration
    </p>
    <ul class="menu-list">
      <li><router-link to="/">Accueil</router-link></li>
      <li><a>Lien</a></li>
    </ul>
    <p class="menu-label">
      Super Administration
    </p>
    <ul class="menu-list">
      <li><router-link to="/model">Model</router-link></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
  }
}
</script>

<style scoped lang="scss">
.menu{
  margin-top:16px
}
</style>
