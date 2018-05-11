<template>
  <section>
    <b-field>
      <b-autocomplete
        v-model="name"
        ref="autoMdi"
        :data="filteredDataObj"
        placeholder="e.g. account-circle"
        field="name"
        expanded
        :class="{'is-disable': disabled}"
        @select="onSelect">

        <template slot-scope="props">
          <div class="media">
            <div class="media-left">
              <i class="mdi mdi-16px" :class="props.option.name | iconName"></i>
            </div>
            <div class="media-content">
              {{ props.option.name | readeableName}}
            </div>
          </div>
        </template>
      </b-autocomplete>
      <p class="control" v-if="selected !== null">
        <span class="button is-static">
            <i class="mdi mdi-24px" :class="selected | iconName"></i>
        </span>
      </p>
    </b-field>
  </section>
</template>

<script>
  export default {
    name: 'InputMaterialDesign',
    data () {
      return {
        data: [],
        name: '',
        selected: null,
        disabled: false
      }
    },
    props: ['default'],
    filters: {
      iconName: function (value) {
        console.log('value', value)
        if (!value || value === '') return 'mdi-help'
        return 'mdi-' + value.replace('.svg', '')
      },
      readeableName: function (value) {
        if (!value) return ''
        value = value.toString().replace('.svg', '').replace(/-/g, ' ')
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
    computed: {
      filteredDataObj () {
        return this.data.filter((option) => {
          return (this.name) ? option.name
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0 : ''
        })
      }
    },
    methods: {
      onSelect (option) {
        if (option !== null) {
          console.log('option', option)
          this.selected = option.name
          this.$emit('select', option.name)
        }
      }
    },
    mounted () {
      this.$http.get(`https://api.github.com/repos/Templarian/MaterialDesign/contents/icons/svg`)
      .then(({ data }) => {
        this.data = data
        this.selected = this.default
        this.$refs.autoMdi.setSelected(this.default)
      })
    }
  }
</script>