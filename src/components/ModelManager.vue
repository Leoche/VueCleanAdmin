<template>
  <section>
    <b-tabs v-model="activeTab" position="is-centered">
      <b-tab-item label="Model" icon="file-tree">

        <nav class="level">
          <div class="level-left">
            <nav class="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li :class="{'is-active': path===''}"><a href="#" aria-current="page" @click.prevent="path=''">Model Manager</a></li>
                <li v-if="path!==''" class='is-active'><a href="#">{{ getLabelByPath() }}</a></li>
              </ul>
            </nav>
          </div>
          <div class="level-right">
            <button class="button is-success" @click.prevent="save" :disabled="saved">
              <b-Icon icon="content-save"></b-Icon>
              <span>Sauvegarder</span>
            </button>
            <button class="button is-info" @click.prevent="openInputPicker">
              <b-Icon icon="plus"></b-Icon>
              <span>Ajouter un champ</span>
            </button>
          </div>
        </nav>

        <!-- Liste des inputs -->
        <div class="card" v-for="(input, i) in getInputByPath()">
          <div class="card-header">
            <p class="card-header-title" v-if="input.type !== 'sub'"><IconInput :icon="input.type"></IconInput> {{ input.label }} <b-tag rounded>{{ input.name }}</b-tag></p>
            <p class="card-header-title" v-else><a href="#" @click.prevent="path = input.name"><IconInput :icon="input.type"></IconInput> {{ input.label }} <b-tag rounded>{{ input.name }}</b-tag></a></p>
            <a class="card-header-icon">
              <b-dropdown position="is-bottom-left" :inline="true">
                <b-Icon icon="settings" slot="trigger"></b-Icon>

                <b-dropdown-item @click="moveInput(i, -1)" v-if="i !== 0">
                  <b-Icon icon="chevron-up" size="is-small"></b-Icon>
                  <span>Monter</span>
                </b-dropdown-item>
                <b-dropdown-item @click="moveInput(i, 1)" v-if="i !== getInputByPath().length - 1">
                  <b-Icon icon="chevron-down" size="is-small"></b-Icon>
                  <span>Descendre</span>
                </b-dropdown-item>
                <b-dropdown-item @click="editInput(i)">
                  <b-Icon icon="pencil" size="is-small"></b-Icon>
                  <span>Éditer</span>
                </b-dropdown-item>
                <b-dropdown-item @click="removeInput(i)">
                  <b-Icon icon="delete" size="is-small"></b-Icon>
                  <span>Supprimer</span>
                </b-dropdown-item>
              </b-dropdown>
            </a>
          </div>
        </div>
        <div v-if="getInputByPath().length === 0">
          <div class="notification has-text-centered">
            <b-Icon icon="emoticon-poop" custom-size="mdi-48px"></b-Icon><br/>
            Il n'y a rien ici!
          </div>
        </div>
      </b-tab-item>

      <!-- Json preview block -->
      <b-tab-item label="Json Preview" icon="json">
        <div class="columns">
          <div class="column has-text-centered">
            <div class="content">
              <h3>JSON Preview</h3>
            </div>
          </div>
        </div>
        <pre>
          <blockquote>{{ rawData }}</blockquote>
        </pre>
      </b-tab-item>
    </b-tabs>

    <b-modal :active.sync="isInputPickerActive" has-modal-card>
      <InputPicker v-on:newInput="saveNewInput" v-on:editInput="saveEditInput" :fromsub="path !== ''" :editable="editableInputData"></InputPicker>
    </b-modal>

  </section>
</template>

<script>
import IconInput from '@/components/inputs/IconInput'
import InputPicker from '@/components/ui/InputPicker'

export default {
  name: 'ModelManager',
  components: {
    IconInput,
    InputPicker
  },
  data () {
    return {
      activeTab: 0,
      isInputPickerActive: false,
      path: '',
      saved: true,
      editableInputData: null,
      rawData: {}
    }
  },
  methods: {
    saveNewInput (input) {
      let newInput = {
        'name': this.slug(input.name),
        'label': input.name,
        'type': input.type,
        'options': input.options
      }
      if (input.type === 'sub') newInput.inputs = []
      this.saved = false
      if (this.path === '') {
        return this.rawData.push(newInput)
      } else {
        return this.getInputByPath().push(newInput)
      }
    },
    saveEditInput (input) {
      let newInput = {
        'name': this.slug(input.name),
        'label': input.name,
        'type': input.type,
        'options': input.options
      }
      this.rawData[input.index] = newInput
    },
    editInput (index) {
      this.editableInputData = this.rawData[index]
      this.editableInputData.index = index
      this.isInputPickerActive = true
    },
    removeInput (index) {
      this.getInputByPath().splice(index, 1)

      this.saved = false
    },
    moveInput (index, direction) {
      let tmpData = JSON.parse(JSON.stringify(this.getInputByPath()))
      let tmp = tmpData[index]
      tmpData[index] = tmpData[index + direction]
      tmpData[index + direction] = tmp

      if (this.path === '') {
        this.rawData = tmpData
      } else {
        this.rawData.filter(input => input.name === this.path)[0].inputs = tmpData
      }

      this.saved = false
    },
    getInputByPath () {
      if (this.path === '') {
        return this.rawData
      } else {
        return this.rawData.filter(input => input.name === this.path)[0].inputs
      }
    },
    getLabelByPath () {
      return this.rawData.filter(input => input.name === this.path)[0].label
    },
    openInputPicker () {
      this.isInputPickerActive = true
      this.editableInputData = null
    },
    save () {
      let dataToSave = JSON.stringify(this.rawData)
      let api = document.querySelector('meta[name=api]').content
      this.$http.post(api, {
        'action': 'setmodel',
        'email': this.$session.get('user').email,
        'password': this.$session.get('user').password,
        'body': dataToSave
      }, {
        emulateJSON: true
      }).then(res => {
        if (res.data.state === 'success') {
          this.$toast.open({
            message: 'Le model vient d\'être sauvegardé avec succès',
            type: 'is-success',
            position: 'is-bottom'
          })
          this.saved = true
        } else {
          this.$toast.open({
            message: 'Erreur lors de la sauvegarde: ' + res.data.message,
            type: 'is-danger',
            position: 'is-bottom'
          })
        }
      }, res => {
        this.$toast.open({
          message: 'Erreur lors de la connexion à l\'api: ' + res.data.message,
          type: 'is-danger',
          position: 'is-bottom'
        })
      })
    },
    slug (str) {
      return str.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
    }
  },
  mounted () {
    let api = document.querySelector('meta[name=api]').content
    this.$http.post(api, {
      'action': 'getmodel',
      'email': this.$session.get('user').email,
      'password': this.$session.get('user').password
    }, {
      emulateJSON: true
    }).then(res => {
      if (res.data.state === 'success') {
        this.$toast.open({
          message: 'Le model vient d\'être chargé avec succès',
          type: 'is-success',
          position: 'is-bottom'
        })
        this.rawData = res.data.body
      } else {
        this.$toast.open({
          message: 'Erreur lors de chargement: ' + res.data.message,
          type: 'is-danger',
          position: 'is-bottom'
        })
      }
    }, res => {
      this.$toast.open({
        message: 'Erreur lors de la connexion à l\'api: ' + res.data.message,
        type: 'is-danger',
        position: 'is-bottom'
      })
    })
  }
}
</script>

<style lang="scss">
.card-header-title{
  font-weight: normal;
  .icon{
    margin-right: 10px;
  }
  .tag{
    margin-left: 10px;
  }
}
.tab-content{
  padding-bottom: 150px !important;
}
.button.is-success{
  margin-right: 16px;
}
</style>
