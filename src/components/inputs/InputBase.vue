<template></template>
<script>
export default {
  name: 'InputBase',
  props: ['name', 'label', 'defaultvalue', 'options'],
  data () {
    return {
      value: null
    }
  },
  mounted () {
    this.value = this.defaultvalue
  }
}
</script>