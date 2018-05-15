<template>
 <section class="content">
  <InputField :label="label" :message="help" icon="tags">
        <b-taginput
            maxtags="5"
            v-model="value"
            placeholder="Ajouter un tag"
            icon="label"
            @input="change">
        </b-taginput>
</InputField>
</section>
</template>

<script>
import InputBase from '@/components/inputs/InputBase'
import InputField from '@/components/ui/InputField'

export default {
  name: 'InputTags',
  extends: InputBase,
  components: {InputField},
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