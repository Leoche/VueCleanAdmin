<template>
 <section class="content">
  <b-field :label="label">
    <b-input v-model="value" @input="change" :placeholder="placeholder" :type="options.length === 'line' ? 'text' : 'textarea'"/>
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