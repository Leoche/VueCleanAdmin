<template>
  <section>
    <b-tabs type="is-boxed" expanded v-model="activeTab">
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

        <div class="card" v-for="input in rawData">
          <div class="card-header">
            <p class="card-header-title"><IconInput :icon="input.type"></IconInput> {{ input.label }} <b-tag rounded>{{ input.name }}</b-tag></p>
            <a class="card-header-icon"><b-Icon icon="settings"></b-Icon></a>
          </div>
        </div>
      </b-tab-item>

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
      if (this.path === '') return this.rawData
      else return this.rawData[path]
    },
    selectInput (args) {
      console.log(args)
      this.rawData.push({
        'name': 'default',
        'label': 'Label par defaut',
        'type': args
      })
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
</style>
