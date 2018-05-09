<template>
  <div class="modal-card card--json">
    <div class="modal-card-head">
      <p class="modal-card-title">
        <b-Icon icon="image"></b-Icon> Medias
      </p>
    </div>
    <div class="modal-card-body">
      <div class="assets-container">
        <AssetBox :canDelete="false" v-for="media in medias.files" :key="media.name" :asset="media" v-on:click.native="selectImage(media)"></AssetBox>
      </div>
    </div>
  </div>
</template>

<script>
import AssetBox from '../ui/AssetBox'
import { mapGetters } from 'vuex'

export default {
  name: 'InputAsset',
  components: {
    AssetBox
  },
  computed: {
    ...mapGetters({
      medias: 'getMedias'
    })
  },
  data () {
    return {
      selected: []
    }
  },
  methods: {
    selectImage (value) {
      this.$emit('close', value)
    }
  }
}
</script>
<style scoped lang="scss">
.modal-card{
  width: 100%;
}
.assets-container{
  display: flex;
  flex-wrap: wrap;
  justify-content:space-around;
}
</style>