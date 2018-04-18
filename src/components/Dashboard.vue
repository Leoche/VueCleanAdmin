<template>
  <div>
    <Navbar></Navbar>
    <div class="container is-widescreen is-fluid">
      <div class="columns">
        <div class="column is-one-fifth">
          <Sidebar :model="model"></Sidebar>
        </div>
        <div class="column column-content">
          <router-view :model="model"></router-view>
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
        model: []
      }
    },
    components: {
      Sidebar,
      Navbar,
      MaterialDesign,
      ModelManager
    },
    methods: {
      setModel (model) {
        this.model = model
      },
      logout () {
        this.$session.destroy()
        this.$router.push('/login')
      }
    },
    mounted () {
      this.$store.dispatch('fetchMedias', this.$session.get('user')).then(res => {
        this.$toast.open({
          message: 'Succès: ' + res.data.message,
          type: 'is-success'
        })
      })
      this.$store.dispatch('fetchModel', this.$session.get('user')).then(res => {
        this.$toast.open({
          message: 'Succès: ' + res.data.message,
          type: 'is-success'
        })
      })
      this.$store.dispatch('fetchContent', this.$session.get('user')).then(res => {
        this.$toast.open({
          message: 'Succès: ' + res.data.message,
          type: 'is-success'
        })
      })
    }
  }
</script>

<style scoped lang="scss">
  .column-content {
    margin-top: 16px
  }
</style>
