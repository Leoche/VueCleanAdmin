<template>
  <div>
    <nav class="level">
      <div class="level-left">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li class="is-active"><a class="is-size-4 has-text-weight-bold" href="#" aria-current="page">Medias Manager</a></li>
          </ul>
        </nav>
      </div>
      <div class="level-right">
        <button class="button is-info is-rounded is-shadowed" @click.prevent="isUploaderActive = true">
          <b-Icon icon="plus"></b-Icon>
          <span>Ajouter un média</span>
        </button>
      </div>
    </nav>

    <div class="assets-container">
      <AssetBox v-on:deleteAsset="deleteAsset" v-for="media in medias.files" :key="media.name" :asset="media"></AssetBox>
    </div>
    <b-modal :active.sync="isUploaderActive" has-modal-card>
      <Uploader :multiple='true' v-on:close="isUploaderActive = false"></Uploader>
    </b-modal>
    {{ medias.files }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Uploader from './ui/Uploader'
import AssetBox from './ui/AssetBox'

export default {
  name: 'MediaManager',
  components: {
    Uploader,
    AssetBox
  },
  data () {
    return {
      dropFiles: [],
      progress: 45,
      isUploaderActive: false
    }
  },
  computed: {
    ...mapGetters({
      medias: 'getMedias'
    })
  },
  methods: {
    deleteAsset (filename) {
      this.$store.dispatch('removeMedia', {user: this.$session.get('user'), filename: filename}).then(res => {
        this.$toast.open({
          message: 'Succès: ' + res.data.message,
          type: 'is-success'
        })
      })
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
.assets-container{
  display: flex;
  flex-wrap: wrap;
    justify-content: space-around;
}
</style>
