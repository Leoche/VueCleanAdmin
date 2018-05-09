<template>
 <section class="content">
  <b-field :label="label">
        <b-datepicker
            v-model="value"
            placeholder="Ajouter une Date"
            icon="calendar-today"
            @input="change">
        </b-datepicker>
  </b-field>
</section>
</template>

<script>
import InputBase from '@/components/inputs/InputBase'

export default {
  name: 'InputDate',
  extends: InputBase,
  data () {
    return {
      value: new Date()
    }
  }
}
</script>