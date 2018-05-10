<template>
  <div>
   <section class="content" v-if="input && (oldvalue || oldvalue === '')">
      <h1>Édition</h1>
      <component
        issettings="false"
        :key="input.label"
        :is="'input-' + input.type"
        :type="input.type"
        :label="input.label"
        :placeholder="input.label + '...'"
        :defaultvalue="oldvalue"
        :options="input.options"
        v-on:changeContent="change"
        ></component>
   </section>
   <pre>
     {{ typeof oldvalue }}
     {{ oldvalue }}
   </pre>
  </div>
</template>
<script>
  /* eslint-disable no-unused-vars */
  import InputText from '@/components/inputs/InputText'
  import InputTags from '@/components/inputs/InputTags'
  import InputDate from '@/components/inputs/InputDate'
  import InputNumeric from '@/components/inputs/InputNumeric'
  import InputBoolean from '@/components/inputs/InputBoolean'
  import InputLocation from '@/components/inputs/InputLocation'
  import InputImage from '@/components/inputs/InputImage'
  import debounce from 'lodash/debounce'
  /* eslint-enable no-unused-vars */
  export default {
    name: 'Editor',
    props: ['slug'],

    components: {
      InputText,
      InputTags,
      InputDate,
      InputBoolean,
      InputNumeric,
      InputLocation,
      InputImage
    },
    computed: {
      input () {
        return this.$store.getters.getInputByLabel(this.slug)
      },
      oldvalue () {
        let content = this.$store.getters.getContentByLabel(this.slug)
        return content
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