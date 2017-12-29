<template>
  <div>
    <Navbar></Navbar>
    <div class="container is-widescreen is-fluid">
      <div class="columns">
        <div class="column is-one-quarter">
          <Sidebar></Sidebar>
        </div>
        <div class="column column-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './ui/Sidebar'
import Navbar from './ui/Navbar'
import MaterialDesign from './inputs/MaterialDesign'
import ModelManager from './ModelManager'

export default {
  name: 'Dashboard',
  data () {
    return {
      msg: 'Welcome'
    }
  },
  components: {
    Sidebar,
    Navbar,
    MaterialDesign,
    ModelManager
  },
  mounted () {
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
