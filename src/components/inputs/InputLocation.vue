<template>
 <section class="content">
  <InputField :label="label" :message="help" icon="location">
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <GmapMap
        ref="mapRef"
        :center="changingCenter" :zoom="changingZoom"
        @center_changed="changeCenter"
        @zoom_changed="changeZoom"
        @idle="sync"
        :options="{gestureHandling: 'none'}"
        style="width: 500px; height: 300px">
      </GmapMap>
    </div>
  </div>
  <div class="level-right">
    <div class="level-item">
      <div>
        Latitude: <input type="number"
        class="input"
        :disabled="!active"
        v-model.number="changingCenter.lat"
        @change="sync"
        step="0.00001" />
      </div>
      <div>
        Longétude: <input type="number"
        class="input"
        :disabled="!active"
        v-model.number="changingCenter.lng"
        @change="sync"
        step="0.00001" />
      </div>
      <div>
        Zoom: <input type="number"
        class="input"
        :disabled="!active"
        v-model.number="changingZoom"
        @change="sync"
        step="1" />
      </div>
      <div>
        <p><span v-if='active'>Déplacer la carte et réglez le zoom</span></p>
        <button class="button is-blank" v-if='!active' @click="toggleEdition()">Modifier la position</button>
        <button class="button is-info" v-else @click="toggleEdition()">Sauvegarder</button>
      </div>
    </div>
  </div>
</div>
</InputField>
</section>
</template>

<script>
import InputBase from '@/components/inputs/InputBase'
import InputField from '@/components/ui/InputField'

export default {
  name: 'InputLocation',
  extends: InputBase,
  components: {InputField},
  data () {
    return {
      value: false,
      mapZoom: 5,
      active: false,
      changingZoom: 5,
      mapCenter: {lat: 46.50301969076774, lng: 2.7712230251614756},
      changingCenter: {lat: 46.50301969076774, lng: 2.7712230251614756}
    }
  },
  computed: {
    location () {
      return {
        lat: this.mapCenter.lat,
        lng: this.mapCenter.lng,
        zoom: this.changingZoom
      }
    }
  },
  created () {
    this.sync()
  },
  methods: {
    toggleEdition () {
      this.active = !this.active
      if (this.active) {
        this.$refs.mapRef.$mapPromise.then((map) => {
          map.setOptions({gestureHandling: 'auto'})
        })
      } else {
        this.$refs.mapRef.$mapPromise.then((map) => {
          map.setOptions({gestureHandling: 'none'})
        })
        this.change()
      }
    },
    changeCenter (latLng) {
      this.mapCenter = {
        lat: latLng.lat(),
        lng: latLng.lng()
      }
    },
    changeZoom (z) {
      this.mapZoom = z
    },
    sync () {
      this.changingZoom = this.mapZoom
      this.changingCenter = this.mapCenter
    },
    change () {
      this.$emit('changeContent', {value: this.location, name: this.name})
    }
  },
  mounted () {
    if (typeof this.defaultvalue === 'object' && this.defaultvalue.lat) {
      this.value = this.defaultvalue
      this.mapZoom = this.value.zoom
      this.changingZoom = this.value.zoom
      this.changingCenter = {lat: this.value.lat, lng: this.value.lng}
      this.mapCenter = {lat: this.value.lat, lng: this.value.lng}
      this.sync()
    } else {
      this.changingZoom = 5
      this.mapCenter = {lat: 46.50301969076774, lng: 2.7712230251614756}
    }
  }
}
</script>
<style lang="scss" scoped>
.input{
  margin-bottom:  8px;
}
.level{
  justify-content: flex-start;
  .level-right {
    margin-left:32px;
    & .level-item{
      align-items: flex-start;
      flex-direction: column;
    }
  }
}
</style>