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
      <hr>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th v-for="column in columns"><IconInput :icon='column.type' size="is-small"></IconInput> {{ column.label }}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data">
            <td>{{ index }}</td>
            <td v-for="column in columns">
              <ContentCell :type="column.type" :content="item[column.field]"></ContentCell>
            </td>
            <td>
              <span class="icon" @click.prevent="editContent(index)"><i class="mdi mdi-pencil-circle mdi-24px"></i></span>
              <span class="icon" @click.prevent="tryDeleteContent(index)"><i class="mdi mdi-delete-circle mdi-24px"></i></span>
            </td>
          </tr>
        </tbody>
      </table>

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
          :defaultvalue="(selected === null) ? subinput.default : selected[subinput.name]"
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
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import IconInput from '@/components/inputs/IconInput'
import InputText from '@/components/inputs/InputText'
import InputTags from '@/components/inputs/InputTags'
import InputDate from '@/components/inputs/InputDate'
import InputNumeric from '@/components/inputs/InputNumeric'
import InputBoolean from '@/components/inputs/InputBoolean'
import InputLocation from '@/components/inputs/InputLocation'
import InputImage from '@/components/inputs/InputImage'
import ContentCell from '@/components/ui/ContentCell'
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
    ContentCell,
    IconInput,
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
          type: subinput.type,
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
    editContent (id) {
      this.selected = this.data[id]
      this.newContent = this.data[id]
      this.newContent.id = id
      this.tableActive = false
      console.log('de')
    },
    tryDeleteContent (id) {
      this.$snackbar.open({
        duration: 5000,
        message: 'Voulez vous vraiment supprimer cette entrée?',
        type: 'is-danger',
        position: 'is-bottom',
        actionText: 'Confirmer',
        queue: false,
        onAction: () => {
          this.deleteContent(id)
        }
      })
    },
    deleteContent (id) {
      let toDelete = {name: this.input.name, index: id}
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
      if (typeof this.newContent.id !== 'undefined' && this.newContent.id > -1) {
        toSave.index = this.newContent.id
        delete this.newContent['id']
        toSave.value = JSON.parse(JSON.stringify(this.newContent))
      }
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
table{
  width: 100%;
}
.mdi-pencil-circle{
  cursor:pointer;
  transition: all .2s;
  &:hover{
    transform: scale(1.1);
    color:#222;
  }
}
.mdi-delete-circle{
  cursor:pointer;
  transition: all .2s;
  &:hover{
    transform: scale(1.1);
    color:#e20c0c;
  }
}
</style>