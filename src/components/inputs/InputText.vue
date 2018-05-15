<template>
 <section class="content">
  <InputField :label="label" :message="help" :icon="options.length === 'line' ? 'text' : 'textarea'">
    <b-input v-model="value" @input="change" :placeholder="placeholder" :type="options.length === 'line' ? 'text' : 'textarea'"/>
  </InputField>
</section>
</template>

<script>
import InputBase from '@/components/inputs/InputBase'
import InputField from '@/components/ui/InputField'

export default {
  name: 'InputText',
  components: {InputField},
  extends: InputBase
}
</script>