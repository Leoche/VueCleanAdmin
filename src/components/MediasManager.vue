<template>
  <div class="content">
    <h2>Liste des médias:</h2>
    <hr>
    <Uploader></Uploader>
  </div>
</template>

<script>
import Uploader from './ui/Uploader'

export default {
  name: 'MediaManager',
  components: {
    Uploader
  },
  data () {
    return {
      dropFiles: [],
      progress: 45
    }
  },
  methods: {
    startUpload () {

    },
    addDropFile (args) {
      console.log('args', args)
    },
    deleteDropFile (index) {
      this.dropFiles.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="scss">
.upload-button-container{
  display: flex;
  width: 100%;
  height: 100%;
  align-items: flex-end;
}
</style>
