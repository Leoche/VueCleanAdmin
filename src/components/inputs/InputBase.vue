<template></template>
<script>
export default {
  name: 'InputBase',
  props: ['name', 'label', 'defaultvalue', 'type', 'options', 'parent', 'issettings', 'placeholder'],
  data () {
    return {
      value: null
    }
  },
  mounted () {
    if (this.type === 'date') {
      console.log('this.defaultvalue', this.defaultvalue)
      if (this.defaultvalue === 'null' || this.defaultvalue === '' || this.defaultvalue === null) {
        this.value = new Date()
      } else {
        this.value = new Date(this.defaultvalue)
      }
    } else {
      this.value = this.defaultvalue
    }
  },
  methods: {
    change () {
      if (this.issettings === 'true') {
        let op = {}
        op[this.name] = this.value
        this.$emit('setOptions', op)
      } else {
        this.$emit('changeContent', this.value)
      }
    }
  }
}
</script>