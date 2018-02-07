<template>
  <aside class="menu">
    <p class="menu-label">
      Mon Site
    </p>
    <ul class="menu-list">
      <li><router-link to="/" exact-active-class="is-active">Accueil</router-link></li>
      <li><a>Lien</a></li>
    </ul>
    <template v-if="$session.get('user').role === 'admin'">
    <p class="menu-label">
      Administration
    </p>
    <ul class="menu-list">
      <li><router-link to="/model" exact-active-class="is-active"><b-icon icon="file-tree" size="is-small"></b-icon> Model Manager</router-link></li>
      <li><router-link to="/users" exact-active-class="is-active"><b-icon icon="account-multiple" size="is-small"></b-icon> Users Manager</router-link></li>
    </ul>
    </template>
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
