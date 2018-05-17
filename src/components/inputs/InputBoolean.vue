<template>
 <section class="content">
  <b-field :label="label">
    <b-switch
      v-model="value"
      @input="change"
      :false-value="false"
      :true-value="true"
      >
      {{ actived }}
    </b-switch>
  </b-field>
</section>
</template>

<script>
import InputBase from '@/components/inputs/InputBase'

export default {
  name: 'InputBoolean',
  extends: InputBase,
  data () {
    return {
      value: false
    }
  },
  computed: {
    actived () {
      if (this.value) {
        return 'Activé'
      } else {
        return 'Désactivé'
      }
    }
  },
  mounted () {
    this.fetchedData = true
  }
}
</script>