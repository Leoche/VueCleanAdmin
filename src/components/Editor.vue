<template>
  <div>
   <section class="content editor-fields" v-if="input && (oldvalue || oldvalue === '')">
      <h1>Édition: {{ input.label }}</h1>
      <template v-if="input.type === 'group'">
        <template v-for="subinput in input.inputs">
          <component
            issettings="false"
            :key="subinput.label"
            :is="'input-' + subinput.type"
            :type="subinput.type"
            :label="subinput.label | ucfirst"
            :name="subinput.name"
            :help="subinput.help"
            :placeholder="subinput.label + '...'"
            :defaultvalue="oldvalue(subinput.name)"
            :options="subinput.options"
            v-on:changeContent="save"></component>
            <div class="spacer"></div>
        </template>

        <div v-if="input.inputs.length === 0">
          <div class="notification has-text-centered">
            <b-Icon icon="emoticon-poop" custom-size="mdi-48px"></b-Icon><br/>
            Il n'y a rien dans ce groupe!
          </div>
        </div>
      </template>
      <component
        issettings="false"
        :key="input.label"
        :is="'input-' + input.type"
        :type="input.type"
        :label="input.label"
        :name="input.name"
        :help="input.help"
        :placeholder="input.label + '...'"
        :defaultvalue="oldvalue(input.name)"
        :options="input.options"
        v-on:changeContent="save"
        v-else></component>
   </section>
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
    filters: {
      ucfirst (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }
    },
    computed: {
      input () {
        return this.$store.getters.getInputByLabel(this.slug)
      }
    },
    methods: {
      oldvalue (label) {
        let content = null
        if (this.input.type === 'group') {
          content = this.$store.getters.getContentByLabel(this.slug + '/' + label)
        } else {
          content = this.$store.getters.getContentByLabel(this.slug)
        }
        return content
      },
      save (value, oldvalue) {
        if (!this.$store.getters.isContentFetched) return false
        let toSave = {name: this.input.name, value: value.value}
        if (this.input.type === 'group') toSave = {name: this.input.name, value: value.value, group: true, subname: value.name}
        this.$store.dispatch('saveContent', {user: this.$session.get('user'), content: toSave}).then(res => {
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
.spacer{
  width: 100%;
  height: 32px;
}
</style>