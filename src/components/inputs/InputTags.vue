<template>
 <section class="content">
  <b-field :label="label" :message="help">
        <b-taginput
            maxtags="5"
            v-model="value"
            placeholder="Ajouter un tag"
            icon="label"
            @input="change">
        </b-taginput>
  </b-field>
</section>
</template>

<script>
import InputBase from '@/components/inputs/InputBase'

export default {
  name: 'InputTags',
  extends: InputBase,
  data () {
    return {
      value: []
    }
  },
  mounted () {
    this.fetchedData = true
    this.value = Array.isArray(this.defaultvalue) ? this.defaultvalue : []
  }
}
</script>