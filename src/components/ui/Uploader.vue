<template>
  <div class="modal-card card--json">
    <div class="modal-card-head">
      <p class="modal-card-title">
        <b-Icon icon="file"></b-Icon> Uploader
      </p>
    </div>
    <div class="modal-card-body">
      <div class="columns">
        <div class="column">
          <b-field>
            <b-upload v-model="dropFiles" :multiple='multiple' drag-drop :disabled="uploading">
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
          <h2>{{ dropFiles.length }} fichier<span v-if="dropFiles.length > 1">s</span> à uploader:</h2>
          <div class="tags">
            <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary" >
              {{file.name}}
              <button class="delete is-small" type="button" :disabled="uploading" @click="deleteDropFile(index)">
              </button>
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
  <footer class="modal-card-foot">
      <div class="columns" style="width: 120%;">
        <div class="column">
          <h6 v-if="uploading">Avancement: {{ getProgress }}%</h6>
          <h6 v-else>Prêt à uploader</h6>
          <progress class="progress is-info is-small" :value="getProgress" max="100">{{ getProgress }}%</progress>
        </div>
        <div class="column is-narrow">
          <div class="upload-button-container">
            <button class="button is-primary" :disabled="uploading || dropFiles.length === 0" @click.prevent="startUpload">
              <b-icon icon="upload"></b-icon>
              <span>Uploader</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Uploader',
  props: ['asset', 'multiple'],
  data () {
    return {
      dropFiles: [],
      uploading: false,
      progress: 0
    }
  },
  computed: {
    ...mapGetters({
      getProgress: 'getProgress'
    })
  },
  methods: {
    startUpload () {
      this.uploading = true
      this.$store.dispatch('resetProgress')
      let formData = new FormData()
      this.dropFiles.forEach((file, index) => formData.append('file' + index, file))

      this.$store.dispatch('addMedias', {user: this.$session.get('user'), formData: formData}).then(res => {
        this.$toast.open({
          message: 'Succès: ' + res.data.message,
          type: 'is-success'
        })
        this.uploading = false
        this.$emit('close', res.body.body)
        this.dropFiles = []
      })
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
