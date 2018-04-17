<template>
  <aside class="menu">
    <p class="menu-label">
      Mon Site
    </p>
    <ul class="menu-list">
      <li v-for="input in model">
        <router-link :to="'/edit/' + input.name" exact-active-class="is-active"><IconInput :icon='input.type' size="is-small"></IconInput> {{ input.label }}</router-link></li>
    </ul>
    <template v-if="user.role === 'admin'">
    <p class="menu-label">
      Administration
    </p>
    <ul class="menu-list">
      <li><router-link to="/model" exact-active-class="is-active"><b-icon icon="file-tree" size="is-small"></b-icon> Model Manager</router-link></li>
      <li><router-link to="/users" exact-active-class="is-active"><b-icon icon="account-multiple" size="is-small"></b-icon> Users Manager</router-link></li>
      <li><router-link to="/medias" exact-active-class="is-active"><b-icon icon="image-multiple" size="is-small"></b-icon> Medias Manager</router-link></li>
    </ul>
    </template>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'
import IconInput from '@/components/inputs/IconInput'

export default {
  name: 'Sidebar',
  components: {
    IconInput
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      model: 'getRootModel'
    })
  }
}
</script>

<style scoped lang="scss">
.menu{
  margin-top:16px
}
</style>
