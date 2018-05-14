<template>
 <section class="content">
  <b-field :label="label">
    <b-input v-model="value" @input="change" type="number" :placeholder="placeholder"/>
  </b-field>
  {{ value }}
</section>
</template>

<script>
import InputBase from '@/components/inputs/InputBase'

export default {
  name: 'InputNumeric',
  extends: InputBase,
  methods: {
    change () {
      if (!this.initialized || !this.fetchedData) {
        this.fetchedData = true
        return false
      }
      if (this.issettings === 'true') {
        let op = {}
        op[this.name] = this.value
        this.$emit('setOptions', op)
      } else {
        this.$emit('changeContent', {value: this.value.toString(), name: this.name})
      }
    }
  }
}
</script>