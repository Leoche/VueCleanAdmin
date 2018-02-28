<template>
  <div>
    <h1>Édition: {{ slug }}</h1>
    test: {{ input }}
  </div>
</template>
<script>
  export default {
    name: 'Editor',
    props: ['slug'],
    computed: {
      input () {
        return this.$store.getters.getInputByLabel(this.slug)
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>