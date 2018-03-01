<template>
  <div>
   <section class="content" v-if="input && (oldvalue || oldvalue === '')">
      <h1>Édition: {{ input.label }}</h1>
      <component
        issettings="false"
        :is="'input-' + input.type"
        :label="input.label"
        :placeholder="input.label + '...'"
        :defaultvalue="oldvalue"
        v-on:changeContent="change"
        ></component>
   </section>
   <pre>
     {{ oldvalue }}
   </pre>
  </div>
</template>
<script>
  /* eslint-disable no-unused-vars */
  import InputText from '@/components/inputs/InputText'
  import debounce from 'lodash/debounce'
  /* eslint-enable no-unused-vars */
  export default {
    name: 'Editor',
    props: ['slug'],
    components: {
      InputText
    },
    computed: {
      input () {
        return this.$store.getters.getInputByLabel(this.slug)
      },
      oldvalue () {
        return this.$store.getters.getContentByLabel(this.slug)
      }
    },
    methods: {
      change: debounce(function (value) {
        this.save(value)
      }, 500),
      save (value) {
        this.$store.dispatch('saveContent', {user: this.$session.get('user'), content: {name: this.input.name, value: value}}).then(res => {
          this.$toast.open({
            message: 'Succès: ' + res,
            type: 'is-success'
          })
        }).catch(err => {
          this.$toast.open({
            message: 'Error: ' + err,
            type: 'is-danger'
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>