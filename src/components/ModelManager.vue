<template>
  <section>

    <nav class="level">
      <div class="level-left">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li :class="{'is-active': path===''}"><a class="is-size-4 has-text-weight-bold" href="#" aria-current="page" @click.prevent="setPath('')">Model Manager</a></li>
            <li v-if="path!==''" class='is-active'><a href="#">{{ pathlabel }}</a></li>
          </ul>
        </nav>
      </div>
      <div class="level-right">
        <button class="button is-rounded" @click.prevent="isJsonActive = true" v-if="$session.get('user').role === 'admin'">
          <b-Icon icon="code-tags"></b-Icon>
          <span>JSON</span>
        </button>
        <button class="button is-success is-rounded" @click.prevent="save" :disabled="saved">
          <b-Icon icon="content-save"></b-Icon>
          <span>Sauvegarder</span>
        </button>
        <button class="button is-info is-rounded is-shadowed" @click.prevent="launchNew">
          <b-Icon icon="plus"></b-Icon>
          <span>Ajouter un champ</span>
        </button>
      </div>
    </nav>

    <!-- Liste des inputs -->
    <draggable v-model="inputs" @end="onDrag" :options="dragOptions">
      <transition-group name="slide">
        <div class="card card--list" v-for="(input, i) in inputs" v-bind:key="i" :class="'card--'+input.type">
          <div class="card-header">
            <p class="card-header-title" v-if="input.type !== 'sub'">
              <IconInput :icon="input.type"></IconInput> {{ input.label }}
              <b-tag rounded>{{ input.name }}</b-tag>
            </p>
            <p class="card-header-title" v-else>
              <a href="#" @click.prevent="setPath(input.name)">
                <IconInput :icon="input.type"></IconInput> {{ input.label }}
                <b-tag rounded>{{ input.name }}</b-tag>
              </a>
            </p>
            <div class="card-header-icon">
              <div><b-Icon icon="arrow-all" class="handle"></b-Icon></div>
              <b-dropdown position="is-bottom-left">
                <b-Icon icon="settings" slot="trigger"></b-Icon>
                <b-dropdown-item @click="launchEdit(i)">
                  <b-Icon icon="pencil" size="is-small"></b-Icon>
                  <span>Éditer</span>
                </b-dropdown-item>
                <b-dropdown-item @click="removeInput(i)">
                  <b-Icon icon="delete" size="is-small"></b-Icon>
                  <span>Supprimer</span>
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
          <div class="card-content" v-if="input.type === 'sub' && input.inputs.length !== 0">
            <div class="content is-small">
              <ul class="">
                <li v-for="subinput in input.inputs"><IconInput size="is-small" :icon="subinput.type"></IconInput> {{ subinput.name }}</li>
              </ul>
            </div>
          </div>
        </div>
      </transition-group>
    </draggable>
    <div v-if="inputs.length === 0">
      <div class="notification has-text-centered">
        <b-Icon icon="emoticon-poop" custom-size="mdi-48px"></b-Icon><br/>
        Il n'y a rien ici!
      </div>
    </div>

    <b-modal :active.sync="isInputEditorActive" has-modal-card>
      <InputEditor v-on:newInput="newInput" v-on:editInput="editInput" :fromsub="path !== ''" :editable="editableInputData"></InputEditor>
    </b-modal>

    <b-modal :active.sync="isJsonActive" has-modal-card>
      <div class="modal-card card--json">
        <div class="modal-card-head">
          <p class="modal-card-title has-text-centered">
            <b-Icon icon="json"></b-Icon> Code Json
          </p>
        </div>
        <div class="modal-card-body">
          <pre>
            <blockquote>{{ rootinputs }}</blockquote>
          </pre>
        </div>
        <footer class="modal-card-foot"></footer>
      </div>
    </b-modal>

  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import IconInput from '@/components/inputs/IconInput'
import InputEditor from '@/components/ui/InputEditor'
import draggable from 'vuedraggable'

export default {
  name: 'ModelManager',
  components: {
    draggable,
    IconInput,
    InputEditor
  },
  props: ['model'],
  data () {
    return {
      isInputEditorActive: false,
      isJsonActive: false,
      saved: true,
      editableInputData: null
    }
  },
  computed: {
    ...mapGetters({
      rootinputs: 'getRootModel',
      path: 'getModelPath',
      pathlabel: 'getModelPathLabel'
    }),
    inputs: {
      get () {
        return this.$store.getters.getModel
      },
      set (value) {
        this.$store.commit('SET_MODEL', value)
      }
    },
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        ghostClass: 'ghost',
        handle: '.handle'
      }
    }
  },
  methods: {
    // DATA
    newInput (input) {
      this.$store.commit('ADD_INPUT_TO_MODEL', input)
      this.saved = false
    },
    editInput (input) {
      this.$store.commit('EDIT_INPUT_TO_MODEL', {input})
      this.saved = false
    },
    removeInput (index) {
      this.$store.commit('REMOVE_INPUT_TO_MODEL', index)
      this.saved = false
    },
    save () {
      this.$store.dispatch('saveModel', this.$session.get('user')).then(res => {
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
      this.saved = true
    },

    // UI
    launchEdit (index) {
      this.editableInputData = this.inputs[index]
      this.editableInputData.index = index
      this.isInputEditorActive = true
    },
    launchNew () {
      this.isInputEditorActive = true
      this.editableInputData = null
    },
    setPath (path) {
      this.$store.commit('SET_PATH_TO_MODEL', path)
    },
    onDrag (evt) {
      this.saved = evt.oldIndex === evt.newIndex && this.saved
    }
  },
  mounted () {
    this.$store.dispatch('fetchModel', this.$session.get('user')).then(res => {
      this.$toast.open({
        message: 'Succès: ' + res.data.message,
        type: 'is-success'
      })
    })
  }
}
</script>

<style lang="scss">

.tab-item{
  display: block;
}
.card--sub{
  .card-header{
    box-shadow: none;
  }
  .card-content{
    padding-top: 0;
  }
}
.card--json{
  .card-content{
    height: 600px;
    overflow: scroll;
  }
}
.card-header-title{
  font-weight: normal;
  transition: all .5s;
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
.level-right .button{
  margin-left: 16px;
}
.ghost .card-header-title{
  padding-top:30px;
  padding-bottom:30px;
  box-shadow: inset 5px 0 0 #ffb52a;
}
pre{
  background: #333;
  color:#EEE;
  padding: 0 30px;
  border-radius: 5px;
  font-size: 0.75em;
  line-height: 1.2em;
}
</style>
