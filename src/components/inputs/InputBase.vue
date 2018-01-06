<template></template>
<script>
export default {
  name: 'InputBase',
  props: ['name', 'label', 'defaultvalue', 'options', 'parent', 'issettings'],
  data () {
    return {
      value: null
    }
  },
  mounted () {
    this.value = this.defaultvalue
  },
  methods: {
    change () {
      if (this.issettings === 'true') {
        let op = {}
        op[this.name] = this.value
        this.$emit('setOptions', op)
      }
    }
  }
}
</script>