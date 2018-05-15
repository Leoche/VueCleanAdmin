<template>
 <section>
  <InputField :label="label" :icon="(this.options.length !== 'one') ? 'images' : 'image'"></InputField>
    <div class="buttons" v-if="(value.length === 0) || this.options.length !== 'one'">
      <button class="button is-blank is-rounded is-shadowed" @click.prevent="isAssetPickerActive = true">
        <span>Choisir dans les images existantes</span>
      </button>
      <button class="button is-info is-rounded is-shadowed" @click.prevent="isUploaderActive = true">
        <b-Icon icon="plus"></b-Icon>
        <span v-if='this.options.length !== "one"'>Ajouter des images</span>
        <span v-else>Ajouter une image</span>
      </button>
    </div>
    <div class="assets-container">
      <template v-if="value.length != 0">
        <AssetBox :canDelete="true" v-on:deleteAsset="deleteAsset" v-for="media in value" :key="media.name" :asset="media"></AssetBox>
      </template>
      <template v-else>
       <div class="empty">Aucune images séléctionné</div>
      </template>
    </div>
    <p v-if="help !== ''" class="help">
      <i class="mdi mdi-help-circle"></i>
      {{ help }}
    </p>
    <b-modal :active.sync="isUploaderActive" has-modal-card>
      <Uploader :multiple='this.options.length !== "one"' v-on:close="addedImage"></Uploader>
    </b-modal>
    <b-modal :active.sync="isAssetPickerActive" has-modal-card>
      <InputAsset :multiple='this.options.length !== "one"' v-on:close="addedImage"></InputAsset>
    </b-modal>
    <div class="spacer"></div>
</section>
</template>

<script>
import InputBase from '@/components/inputs/InputBase'
import InputAsset from '@/components/inputs/InputAsset'
import InputField from '@/components/ui/InputField'
import Uploader from '../ui/Uploader'
import AssetBox from '../ui/AssetBox'

export default {
  name: 'InputImage',
  extends: InputBase,
  components: {
    Uploader,
    InputAsset,
    AssetBox,
    InputField
  },
  data () {
    return {
      isUploaderActive: false,
      isAssetPickerActive: false,
      value: []
    }
  },
  methods: {
    addedImage (value) {
      if (!this.initialized || !this.fetchedData) {
        this.fetchedData = true
        return false
      }
      this.isUploaderActive = false
      this.isAssetPickerActive = false
      let newValue = []
      console.log('value', value)
      if (typeof value === 'string') {
        newValue = JSON.parse(value)
      } else if (Array.isArray(value)) {
        newValue = value
      } else if (typeof value === 'object') {
        newValue = [value]
      }
      if (this.options.length !== 'one') {
        this.value = this.value.concat(newValue)
      } else {
        this.value = newValue
      }
      this.$emit('changeContent', {value: this.value, name: this.name})
    },
    deleteAsset (filename) {
      for (var i in this.value) {
        if (this.value[i].name === filename) {
          this.value.splice(i, 1)
          this.$emit('changeContent', {value: this.value, name: this.name})
        }
      }
    }
  },
  mounted () {
    this.value = Array.isArray(this.defaultvalue) ? this.defaultvalue : []
  }
}
</script>
<style scoped lang="scss">
.spacer{
  width: 100%;
  height: 32px;
}
.empty{
  height:235px;
  width: 210px;
  margin-bottom:16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 2px dashed rgba(0,0,0,.3);
}
.button.is-blank{
  margin-right: 16px;
}
.upload-button-container{
  display: flex;
  width: 100%;
  height: 100%;
  align-items: flex-end;
}
.assets-container{
  display: flex;
  flex-wrap: wrap;
}
.help{
  font-size: 13px;
  color:rgba(0,0,0,.5);
  padding-top: 4px;
}
</style>