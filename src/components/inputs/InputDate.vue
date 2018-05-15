<template>
 <section class="content">
  <InputField :label="label" :message="help" icon="date">
        <b-datepicker
            v-model="value"
            placeholder="Ajouter une Date"
            icon="calendar-today"
            @input="change">
        </b-datepicker>
  </InputField>
</section>
</template>

<script>
import InputBase from '@/components/inputs/InputBase'
import InputField from '@/components/ui/InputField'

export default {
  name: 'InputDate',
  components: {InputField},
  extends: InputBase,
  data () {
    return {
      value: new Date()
    }
  }
}
</script>