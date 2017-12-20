<template>
  <div>
    <Navbar></Navbar>
    <div class="container is-widescreen is-fluid">
      <div class="columns">
        <div class="column is-one-quarter">
          <Sidebar></Sidebar>
        </div>
        <div class="column column-content">
          <h1>{{ msg }}</h1>
          <button class="button is-danger" @click="logout()">Déconnexion</button>
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default {
  name: 'Dashboard',
  data () {
    return {
      msg: 'Welcome'
    }
  },
  components: {
    Sidebar,
    Navbar
  },
  methods: {
    logout () {
      this.$session.destroy()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="scss">
.column-content{
  margin-top:16px
}
</style>
