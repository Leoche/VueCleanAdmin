<template>
    <b-Icon :icon="customSizeByPack" :size="size"></b-Icon>
</template>

<script>
  export default {
    name: 'IconInput',
    props: {
      icon: String,
      size: String
    },
    computed: {
      customSizeByPack () {
        switch (this.icon) {
          case 'text': return 'view-headline'
          case 'date': return 'calendar-clock'
          case 'numeric': return 'numeric'
          case 'location': return 'map-marker'
          case 'image': return 'image'
          case 'boolean': return 'toggle-switch-off'
          case 'tags': return 'tag'
          case 'sub': return 'subdirectory-arrow-right'
          default: return 'help'
        }
      }
    }
  }
</script>
