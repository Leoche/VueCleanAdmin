<template>
  <section>
    <div class="columns">
      <div class="column">
        <h2>Upload</h2>
        <b-field>
          <b-upload v-model="dropFiles" multiple drag-drop @input="addDropFile">
            <section class="section section-upload">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-large">
                  </b-icon>
                </p>
                <p>Drop your files here or click to upload</p>
              </div>
            </section>
          </b-upload>
        </b-field>
      </div>
      <div class="column content">
        <h2>{{ dropFiles.length }} fichiers à uploader:</h2>
        <div class="tags">
          <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary" >
            {{file.name}}
            <button class="delete is-small" type="button" @click="deleteDropFile(index)">
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <h6>Avancement: {{ progress }}%</h6>
        <progress class="progress is-info is-small" :value="progress" max="100">{{ progress }}%</progress>
      </div>
      <div class="column is-narrow">
        <div class="upload-button-container">
          <button class="button is-primary" :disabled="dropFiles.length === 0" @click.prevent="startUpload">
            <b-icon icon="upload"></b-icon>
            <span>Uploader</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Uploader',
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
