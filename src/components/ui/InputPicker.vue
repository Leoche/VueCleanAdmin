<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p v-if="selectedType === null" class="modal-card-title">Ajout d'un champ</p>
        <p v-else class="modal-card-title">
          <IconInput :icon="inputsTypes[selectedType].name"></IconInput> Ajout d'un champ: {{ inputsTypes[selectedType].label }}
        </p>
        <button class="delete" aria-label="close" @click.prevent="$parent.close()"></button>
      </header>
      <section class="modal-card-body">
        <!-- Boxes -->
        <div v-if="selectedType === null" class="columns">
          <div v-for="(set, i) in inputsTypesChunked" class="column">
            <a v-for="(input, j) in set" class="button button-large" @click.prevent="selectInput(input.name, i*2 + j)" v-if="canSub(input)">
              <div>
                <div><IconInput :icon="input.name" size="is-medium"></IconInput></div>
                <div>{{ input.label }}</div>
              </div>
            </a>
          </div>
        </div>
        <!-- Options -->
        <div v-else>
          <!-- Name input -->
          <b-field label="Nom du champ">
            <b-input v-model="selected.name" placeholder="Nom..."></b-input>
          </b-field>
          <div class="content" v-if="inputsTypes[selectedType].settings">
            <h6>Options</h6>
            <component
            v-for="setting in inputsTypes[selectedType].settings"
            issettings="true"
            :is="setting.component"
            :parent="inputsTypes[selectedType].name"
            :key="setting.name"
            :defaultvalue="setting.default"
            :name="setting.name"
            :label="setting.label"
            :options="setting.options"
            v-on:setOptions="setOptions"
            ></component>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click.prevent="selectedType = null" v-show="selectedType !== null">
          <b-icon icon="chevron-left"></b-icon>
          <span>Retour</span>
        </button>
        <button class="button is-primary" :disabled="!validate" @click.prevent="pick">
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
  props: ['fromsub'],
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
      this.selected.type = type
      this.selectedType = i
    },
    setOptions (args) {
      this.selected.options = args
    },
    pick () {
      let finalInput = JSON.parse(JSON.stringify(this.selected))
      this.$emit('newInput', finalInput)
      this.$parent.close()
    },
    canSub (input) {
      return input.name !== 'sub' || this.fromsub === false
    }
  },
  computed: {
    validate () {
      return this.selected.type && this.selected.name.length > 3
    }
  },
  mounted () {
    console.log(this.fromsub)
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
