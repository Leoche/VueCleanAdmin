<template>
 <section class="content">
  <b-field :label="label">
    <b-input v-model="value" @input.native="change" :placeholder="placeholder"/>
  </b-field>
</section>
</template>

<script>
import InputBase from '@/components/inputs/InputBase'

export default {
  name: 'InputText',
  extends: InputBase
}
</script>