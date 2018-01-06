<template></template>
<script>
import InputBase from '@/components/inputs/InputBase'

export default {
  name: 'InputOption',
  extends: InputBase,
  props: ['parent'],
  methods: {
    change () {
      this.$emit('setOptions', this.$data)
    }
  }
}
</script>