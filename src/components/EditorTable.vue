<template>
  <div>
   <section class="content">
    <h1>Édition</h1>
    <b-table :data="data" :columns="columns"></b-table>
  </section>
  {{ input }}
  <hr>
</div>
</template>
<script>
/* eslint-disable no-unused-vars */
import InputText from '@/components/inputs/InputText'
import InputTags from '@/components/inputs/InputTags'
import InputDate from '@/components/inputs/InputDate'
import InputNumeric from '@/components/inputs/InputNumeric'
import InputBoolean from '@/components/inputs/InputBoolean'
import InputLocation from '@/components/inputs/InputLocation'
import InputImage from '@/components/inputs/InputImage'
/* eslint-enable no-unused-vars */
export default {
  name: 'EditorTable',
  props: ['slug'],
  data () {
    return {
      data: [
      ],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'first_name',
          label: 'First Name'
        },
        {
          field: 'last_name',
          label: 'Last Name'
        },
        {
          field: 'date',
          label: 'Date',
          centered: true
        },
        {
          field: 'gender',
          label: 'Gender'
        }
      ]
    }
  },

  components: {
    InputText,
    InputTags,
    InputDate,
    InputBoolean,
    InputNumeric,
    InputLocation,
    InputImage
  },
  computed: {
    input () {
      return this.$store.getters.getInputByLabel(this.slug)
    },
    oldvalue () {
      let content = this.$store.getters.getContentByLabel(this.slug)
      console.log('typeof content', typeof content)
      return content
    }
  },
  mounted () {
    this.initTable()
  },
  updated () {
    this.initTable()
  },
  methods: {
    initTable () {
      let columns = []
      for (let i in this.input.inputs) {
        if (columns.length === 0) {
          columns.push({
            field: 'id',
            label: '#',
            width: 40
          })
        }
        let subinput = this.input.inputs[i]
        console.log('subinput', this.oldvalue)
        columns.push({
          field: subinput.name,
          label: subinput.label
        })
      }
      this.columns = columns
    },
    change (value) {
        // this.save(value)
    },
    save (value) {
      this.$store.dispatch('saveContent', {user: this.$session.get('user'), content: {name: this.input.name, value: value}}).then(res => {
        this.$toast.open({
          message: 'Succès: ' + res,
          type: 'is-success'
        })
      }).catch(err => {
        this.$toast.open({
          message: 'Error: ' + err,
          type: 'is-danger'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>