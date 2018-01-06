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
import InputOption from '@/components/inputs/InputOption'

export default {
  name: 'InputGroupRadio',
  extends: InputOption,
  data () {
    return {
      radioButton: null
    }
  }
}
</script>