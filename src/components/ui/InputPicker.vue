<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Ajout d'un champ</p>
        <button class="delete" aria-label="close" @click.prevent="$parent.close()"></button>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div v-for="set in this.inputsTypes" class="column">
            <a v-for="input in set" class="button button-large" @click.prevent="selectInput(input.name)">
              <div>
                <div><IconInput :icon="input.name" size="is-medium"></IconInput></div>
                <div>{{ input.label }}</div>
              </div>
            </a>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click.prevent="$parent.close()">Close</button>
        <button class="button is-primary">Ajouter</button>
      </footer>
    </div>
  </form>
</template>

<script>
import IconInput from '@/components/inputs/IconInput'

export default {
  name: 'InputPicker',
  components: {
    IconInput
  },
  data () {
    return {
      inputsTypes: []
    }
  },
  methods: {
    selectInput (type) {
      this.$emit('newInput', type)
      Object.assign(this.$data, this.$options.data())
      this.$parent.close()
    }
  },
  mounted () {
    let chunk = (r, j) => r.reduce((a, b, i, g) => !(i % j) ? a.concat([g.slice(i, i + j)]) : a, [])
    this.inputsTypes = chunk(require('@/input_types.json'), 2)
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
</style>
