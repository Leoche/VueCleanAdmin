<template>
<form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Édition de: {{ user.name }}</p>
        <button class="delete" aria-label="close" @click.prevent="$parent.close()"></button>
      </header>
      <section class="modal-card-body">
        test
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click.prevent="save">
          <b-icon icon="check"></b-icon>
          <span>Valider</span>
        </button>
      </footer>
    </div>
  </form>
</template>
<script>
  export default {
    name: 'ProfileEditor',
    props:['user'],
    data () {
      return {
        msg: 'Welcome'
      }
    },
    components: {
    },
    methods: {
      save () {
        console.log('save')
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
