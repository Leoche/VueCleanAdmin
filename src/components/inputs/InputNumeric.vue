<template>
 <section class="content">
  <InputField :label="label" :message="help" icon="numeric">
    <b-input v-model="value" @input="change" type="number" :placeholder="placeholder"/>
  </InputField>
</section>
</template>

<script>
import InputBase from '@/components/inputs/InputBase'
import InputField from '@/components/ui/InputField'

export default {
  name: 'InputNumeric',
  extends: InputBase,
  components: {InputField},
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