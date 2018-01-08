<template>
  <section>
    <b-tabs v-model="activeTab" position="is-centered">
      <b-tab-item label="Model" icon="file-tree">

        <nav class="level">
          <div class="level-left">
            <button v-if="path!==''" class="button" @click.prevent="path=''">
              <b-Icon icon="chevron-left" size="is-small"></b-Icon>
              <span>Retour</span>
            </button>
            <h3>Model Manager</h3>
          </div>
          <div class="level-right">
            <button class="button is-info is-pulled-right" @click.prevent="isInputPickerActive = true">
              <b-Icon icon="plus"></b-Icon>
              <span>Ajouter un contenu</span>
            </button>
          </div>
        </nav>

        <!-- Liste des inputs -->
        <div class="card" v-for="(input, i) in rawData">
          <div class="card-header">
            <p class="card-header-title"><IconInput :icon="input.type"></IconInput> {{ input.label }} <b-tag rounded>{{ input.name }}</b-tag></p>
            <a class="card-header-icon">
              <b-dropdown position="is-top-left">
                <b-Icon icon="settings" slot="trigger"></b-Icon>

                <b-dropdown-item @click="moveInput(i, -1)" v-if="i !== 0">
                  <b-Icon icon="chevron-up" size="is-small"></b-Icon>
                  <span>Monter</span>
                </b-dropdown-item>
                <b-dropdown-item @click="moveInput(i, 1)" v-if="i !== rawData.length - 1">
                  <b-Icon icon="chevron-down" size="is-small"></b-Icon>
                  <span>Descendre</span>
                </b-dropdown-item>
                <b-dropdown-item @click="removeInput(i)">
                  <b-Icon icon="delete" size="is-small"></b-Icon>
                  <span>Supprimer</span>
                </b-dropdown-item>
              </b-dropdown>
            </a>
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
      <InputPicker v-on:newInput="selectInput"></InputPicker>
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
      rawData: {}
    }
  },
  methods: {
    getContents (path) {
      if (this.path === '') {
        return this.rawData
      } else {
        return this.rawData[path]
      }
    },
    selectInput (input) {
      this.rawData.push({
        'name': this.slug(input.name),
        'label': input.name,
        'type': input.type,
        'options': input.options
      })
    },
    removeInput (index) {
      this.rawData.splice(index, 1)
    },
    moveInput (index, direction) {
      let tmpData = JSON.parse(JSON.stringify(this.rawData))
      let tmp = tmpData[index]
      tmpData[index] = tmpData[index + direction]
      tmpData[index + direction] = tmp
      this.rawData = tmpData
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
    this.rawData = require('@/tests/model.json')
  }
}
</script>

<style scoped lang="scss">
.card-header-title{
  font-weight: normal;
  .icon{
    margin-right: 10px;
  }
  .tag{
    margin-left: 10px;
  }
}
.b-tabs .tab-content{
  overflow: auto;
}
.tab-content{
  overflow: auto;
}
</style>
