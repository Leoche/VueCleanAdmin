<template></template>
<script>
import InputBase from '@/components/inputs/InputBase'

export default {
  name: 'InputOption',
  extends: InputBase,
  props: ['parent'],
  methods: {
    change () {
      let op = {}
      op[this.name] = this.value
      this.$emit('setOptions', op)
    }
  }
}
</script>