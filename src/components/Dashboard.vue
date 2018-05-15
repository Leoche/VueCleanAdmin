<template>
  <section>
    <Navbar></Navbar>
    <div class="container is-widescreen is-fluid">
      <div class="columns" v-if='loaded === 3'>
        <div class="column column-sidebar is-one-fifth-desktop is-one-third-tablet is-hidden-touch">
          <Sidebar :model="model"></Sidebar>
          <footer><b-Icon icon="bug" size="is-small"></b-Icon> Version: {{ version }}</footer>
        </div>
        <div class="column column-content">
          <router-view :model="model"></router-view>
        </div>
      </div>
      <div class="columns" v-else>
        <div class="column">
          <div class="centered-container">
            <div class="spinner-container">
              <div class="spinner">
                <div class="dot1"></div>
                <div class="dot2"></div>
                <div class="dot3"></div>
              </div>
              Chargement...
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Sidebar from './ui/Sidebar'
  import Navbar from './ui/Navbar'
  import InputMaterialDesign from './inputs/InputMaterialDesign'
  import ModelManager from './ModelManager'

  export default {
    name: 'Dashboard',
    data () {
      return {
        model: [],
        loaded: 0
      }
    },
    components: {
      Sidebar,
      Navbar,
      InputMaterialDesign,
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
    beforeCreate () {
      this.$store.dispatch('fetchMedias', this.$session.get('user')).then(res => {
        this.loaded++
        this.$toast.open({
          message: 'Succès: ' + res.data.message,
          type: 'is-success'
        })
      })
      this.$store.dispatch('fetchModel', this.$session.get('user')).then(res => {
        this.loaded++
        this.$toast.open({
          message: 'Succès: ' + res.data.message,
          type: 'is-success'
        })
      })
      this.$store.dispatch('fetchContent', this.$session.get('user')).then(res => {
        this.loaded++
        this.$toast.open({
          message: 'Succès: ' + res.data.message,
          type: 'is-success'
        })
      })
    }
  }
</script>

<style scoped lang="scss">
@import "../assets/scss/responsive";
  section {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

      & .container {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin: 52px 32px 0 32px;
      width: calc(100% - 64px);

        & .columns {
          flex: 1;
          margin:0;

          & footer {
            font-size: 12px;
            line-height: 36px;
            color: rgba(0,0,0,.5);
          }
        }
      }
  }
  @media #{$tablet-down} {
    section{
      .container {
        margin: 0 16px 0 16px;
        width: calc(100% - 32px);
      }
    }
  }
  .column-content {
    margin-top: 16px
  }
  .centered-container{
    display: flex;
    width: 100vw;
    height: 50vh;
    font-weight: bold;
    color: #333;
    justify-content: center;
    align-items: center;
  }
  .column-sidebar{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
