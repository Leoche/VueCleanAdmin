<template>
  <section class="hero is-login is-fullheight">
    <div class="hello">
      <h1>{{ msg }} {{ $session.get('user').name }}</h1>
      <button class="button is-danger" @click="logout()">Déconnexion</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome'
    }
  },
  methods: {
    logout () {
      console.log('de')
      this.$session.destroy()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
