<template>
  <div>
    <section v-if="tableActive">
      <div class="content">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h1>{{ this.input.label }}</h1>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <button class="button is-rounded is-danger is-icon" @click="deleteContent"
                  :disabled="!selected">
                  <b-icon icon="delete"></b-icon>
              </button>
              <button class="button is-rounded is-blank" @click="selected = null"
                  :disabled="!selected">
                  <b-icon icon="pencil"></b-icon>
                  <span>Éditer</span>
              </button>
              <button class="button is-info is-rounded is-shadowed" @click.prevent="tableActive = false">
                <b-Icon icon="plus"></b-Icon>
                <span>Ajouter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
        <div v-if="input.inputs.length === 0">
          <div class="notification has-text-centered">
            <b-Icon icon="emoticon-poop" custom-size="mdi-48px"></b-Icon><br/>
            Il n'y a rien dans ce groupe!
          </div>
        </div>
      <b-table v-else :columns="columns" :selected.sync="selected" :data="data" focusable :hoverable="false"></b-table>
    </section>
    <section class="content" v-else>
      <h1>{{ this.input.label }}: Nouveau</h1>
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
          :options="subinput.options"
          v-on:changeContent="changeContent"></component>
          <div class="spacer"></div>
      </template>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <button class="button is-blank" @click.prevent='tableActive = true'>Annuler</button>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <button class="button is-info" @click.prevent='save'>Sauvegarder</button>
          </div>
        </div>
      </div>

      <div v-if="input.inputs.length === 0">
        <div class="notification has-text-centered">
          <b-Icon icon="emoticon-poop" custom-size="mdi-48px"></b-Icon><br/>
          Il n'y a rien dans ce groupe!
        </div>
      </div>
    </section>
    <hr>
    {{ input }}
    <hr>
    {{ newContent }}
    <hr>
    {{ selected }}
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
/* eslint-enable no-unused-vars */
export default {
  name: 'EditorTable',
  props: ['slug'],
  data () {
    return {
      tableActive: true,
      selected: null,
      columns: [],
      data: [],
      newContent: {}
    }
  },

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
  mounted () {
    this.initTable()
  },
  methods: {
    changeContent (res) {
      console.log('res', res)
      this.$set(this.newContent, res.name, res.value)
      console.log('this.newContent', this.newContent)
    },
    initTable () {
      for (let i in this.input.inputs) {
        let subinput = this.input.inputs[i]
        this.columns.push({
          field: subinput.name,
          label: subinput.label
        })
        this.$set(this.newContent, subinput.name, subinput.default)
      }
      let tmpdata = this.$store.getters.getContentByLabel(this.slug)
      tmpdata.forEach((item, index) => {
        tmpdata[index].id = index
      })
      this.data = tmpdata
    },
    deleteContent () {
      let toDelete = {name: this.input.name, index: this.selected.id}
      this.$store.dispatch('deleteContent', {user: this.$session.get('user'), content: toDelete}).then(res => {
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
    },
    save () {
      let toSave = {name: this.input.name, value: JSON.parse(JSON.stringify(this.newContent)), sub: true, index: -1}
      this.$store.dispatch('saveContent', {user: this.$session.get('user'), content: toSave}).then(res => {
        this.$toast.open({
          message: 'Succès: ' + res,
          type: 'is-success'
        })
        this.tableActive = true
      }).catch(err => {
        this.$toast.open({
          message: 'Error: ' + err,
          type: 'is-danger'
        })
      })
    },
    openEditor () {
      this.$router.go('/new/' + this.input.name)
    }
  }
}
</script>
<style lang="scss" scoped>
.level-item{
  & button{
    margin-left: 8px;
  }
}
</style>