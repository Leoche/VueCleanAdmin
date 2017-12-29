<template>
  <aside class="menu">
    <p class="menu-label">
      Adminitration
    </p>
    <ul class="menu-list">
      <li><router-link to="/" exact-active-class="is-active">Accueil</router-link></li>
      <li><a>Lien</a></li>
    </ul>
    <p class="menu-label">
      Super Administration
    </p>
    <ul class="menu-list">
      <li><router-link to="/model" exact-active-class="is-active">Model</router-link></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped lang="scss">
.menu{
  margin-top:16px
}
</style>
