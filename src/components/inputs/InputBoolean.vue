<template>
 <section class="content">
  <InputField :label="label" :message="help" icon="boolean">
    <b-switch
      v-model="value"
      @change.native="change"
      :false-value="false"
      :true-value="true"
      >
      {{ actived }}
    </b-switch>
  </InputField>
</section>
</template>

<script>
import InputBase from '@/components/inputs/InputBase'
import InputField from '@/components/ui/InputField'

export default {
  name: 'InputBoolean',
  extends: InputBase,
  components: {InputField},
  data () {
    return {
      value: false
    }
  },
  computed: {
    actived () {
      if (this.value) {
        return 'Activé'
      } else {
        return 'Désactivé'
      }
    }
  },
  methods: {
    change () {
      if (!this.initialized) {
        return false
      }
      if (this.issettings === 'true') {
        let op = {}
        op[this.name] = this.value
        this.$emit('setOptions', op)
      } else {
        this.$emit('changeContent', {value: !this.value, name: this.name})
      }
    }
  }
}
</script>