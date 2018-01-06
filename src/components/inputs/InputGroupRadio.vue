<template>
 <section class="content">
  <b-field>
    <b-radio v-for="(option, o) in options" v-model="value" :key="o" :native-value="option.name" @input="change">
      <span>{{ option.label }}</span>
    </b-radio>
  </b-field>
</section>
</template>

<script>
import InputBase from '@/components/inputs/InputBase'

export default {
  name: 'InputGroupRadio',
  extends: InputBase,
  data () {
    return {
      radioButton: null
    }
  }
}
</script>