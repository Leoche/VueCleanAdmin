<template>
 <section class="content">
  <b-field :label="label" :message="help">
    <b-switch
      v-model="value"
      @change.native="change"
      :false-value="false"
      :true-value="true"
      >
      {{ actived }}
    </b-switch>
  </b-field>
</section>
</template>

<script>
import InputBase from '@/components/inputs/InputBase'

export default {
  name: 'InputBoolean',
  extends: InputBase,
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