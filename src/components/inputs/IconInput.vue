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
          case 'textarea': return 'view-headline'
          case 'text': return 'format-text'
          case 'date': return 'calendar-clock'
          case 'numeric': return 'numeric'
          case 'location': return 'map-marker'
          case 'image': return 'image'
          case 'images': return 'image-multiple'
          case 'group': return 'note'
          case 'boolean': return 'toggle-switch-off'
          case 'tags': return 'tag'
          case 'sub': return 'note-multiple'
          default: return 'help'
        }
      }
    }
  }
</script>
