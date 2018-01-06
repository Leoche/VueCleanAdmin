<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Ajout d'un champ</p>
        <button class="delete" aria-label="close" @click.prevent="$parent.close()"></button>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedType === null" class="columns">
          <div v-for="(set, i) in inputsTypesChunked" class="column">
            <a v-for="(input, j) in set" class="button button-large" @click.prevent="selectInput(input.name, i*2 + j)">
              <div>
                <div><IconInput :icon="input.name" size="is-medium"></IconInput></div>
                <div>{{ input.label }}</div>
              </div>
            </a>
          </div>
        </div>
        <div v-else>
          <div class="card">
            <div class="card-header">
              <p class="card-header-title"><IconInput :icon="inputsTypes[selectedType].name"></IconInput> {{ inputsTypes[selectedType].label }} <b-tag rounded>{{ inputsTypes[selectedType].name }}</b-tag></p>
            </div>
            <div class="card-content"  v-if="inputsTypes[selectedType].settings">
              <div class="content"><h6>Options</h6></div>
              <component v-for="setting in inputsTypes[selectedType].settings"
                :parent="inputsTypes[selectedType].name"
                :key="setting.name"
                :defaultvalue="setting.default"
                is="InputGroupRadio"
                :name="setting.name"
                :label="setting.label"
                :options="setting.options"
                v-on:setOptions="setOptions"
              ></component>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click.prevent="selectedType = null" v-show="selectedType !== null">
          <b-icon icon="chevron-left"></b-icon>
          <span>Retour</span>
        </button>
        <button class="button is-primary" :disabled="selectedType === null" @click.prevent="pick">
          <b-icon icon="check"></b-icon>
          <span>Valider</span>
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import IconInput from '@/components/inputs/IconInput'
import InputGroupRadio from '@/components/inputs/InputGroupRadio'

export default {
  name: 'InputPicker',
  components: {
    IconInput,
    InputGroupRadio
  },
  data () {
    return {
      inputsTypes: [],
      inputsTypesChunked: [],
      selectedType: null,
      selected: {
        options: {}
      }
    }
  },
  methods: {
    selectInput (type, i) {
      this.selected.name = type
      this.selectedType = i
      // this.$emit('newInput', type)
      // this.$parent.close()
    },
    setOptions (args) {
      this.selected.options = args
    },
    pick () {
      console.log(Object.assign({}, this.selected))
      console.log(JSON.parse(JSON.stringify(this.selected)))
    }
  },
  computed: {
    validate () {

    }
  },
  mounted () {
    let chunk = (r, j) => r.reduce((a, b, i, g) => !(i % j) ? a.concat([g.slice(i, i + j)]) : a, [])
    this.inputsTypes = require('@/input_types.json')
    this.inputsTypesChunked = chunk(this.inputsTypes, 2)
  }
}
</script>

<style scoped lang="scss">
.button-large{
  width: 100%;
  height: 100px;
  margin-bottom:15px;
  flex-direction: column;

  &>div{
    display: block;
    width:100%;
    text-align:center;
  }

  .icon{
    width:48px;
    height:48px;
  }
}
.modal-card-foot{
  justify-content: space-around;
}
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
