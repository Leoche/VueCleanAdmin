<template>
  <section class="hero is-login is-fullheight">
    <div class="hello">
      <h1>{{ msg }} {{ $session.get('user').name }}</h1>
      <button class="btn btn-danger" @click="logout()">Déconnexion</button>
    </div>
    <button class="btn btn-error">error button</button>
    <div class="container">
  <div class="columns">
    <div class="column col-6">col-6</div>
    <div class="column col-3">col-3</div>
    <div class="column col-2">col-2</div>
    <div class="column col-1">col-1</div>
  </div>

  <div class="columns col-gapless">
    <div class="column col-6">col-6</div>
    <div class="column col-6">col-6</div>
  </div>

  <div class="columns col-oneline">
    <div class="column col-8">col-8</div>
    <div class="column col-8">col-8</div>
  </div>
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
.hero.is-login{
  background-color:#ccd;
  background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAF0lEQVQYV2PU1NT8z4AEGEkTeP36NQMA8G0IrhzLffYAAAAASUVORK5CYII=);
  background:url(https:////wallpapertag.com/wallpaper/middle/3/2/7/347905-free-download-blurred-background-1920x1200-computer.jpg);
  background-size: cover;
  & .card{
    width: 500px;
    margin: 0 auto;
    border-radius: .25rem;
  }
}
</style>
