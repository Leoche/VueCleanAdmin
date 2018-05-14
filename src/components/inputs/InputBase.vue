<template></template>
<script>
export default {
  name: 'InputBase',
  props: ['name', 'label', 'defaultvalue', 'type', 'options', 'parent', 'issettings', 'placeholder'],
  computed: {
    initialized () {
      return this.$store.getters.isContentFetched
    }
  },
  data () {
    return {
      value: null,
      fetchedData: false
    }
  },
  mounted () {
    if (this.type === 'date') {
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
    change (newValue) {
      if (!this.initialized || !this.fetchedData) {
        this.fetchedData = true
        return false
      }
      if (this.issettings === 'true') {
        let op = {}
        op[this.name] = newValue
        this.$emit('setOptions', op)
      } else {
        this.$emit('changeContent', {value: newValue, name: this.name})
      }
    }
  }
}
</script>