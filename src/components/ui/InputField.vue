<template>
    <div class="field" :class="rootClasses">
        <div v-if="horizontal" class="field-label is-normal">
            <label
                v-if="label"
                :for="labelFor"
                class="label" >
                <IconInput size="is-small" :icon="icon"></IconInput>
                {{ label }}
            </label>
        </div>
        <template v-else>
            <label
                v-if="label"
                :for="labelFor"
                class="label">
                <IconInput size="is-small" :icon="icon"></IconInput>
                {{ label }}
            </label>
        </template>
        <b-field-body
            v-if="horizontal"
            :message="newMessage ? formattedMessage : ''"
            :type="newMessage ? newType : ''">
            <slot/>
        </b-field-body>
        <template v-else>
            <slot/>
        </template>
        <p
            v-if="newMessage && !horizontal"
            class="help"
            :class="newType"
        >
        <i class="mdi mdi-help-circle"></i>
        {{ formattedMessage }}
        </p>
    </div>
</template>

<script>
  import IconInput from '@/components/inputs/IconInput'
  export default {
    name: 'InputField',
    components: {IconInput},
    props: {
      type: String,
      label: String,
      labelFor: String,
      icon: String,
      message: [String, Array],
      grouped: Boolean,
      groupMultiline: Boolean,
      position: String,
      expanded: Boolean,
      horizontal: Boolean,
      addons: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        newType: this.type,
        newMessage: this.message,
        _isField: true
      }
    },
    computed: {
      rootClasses () {
        return [this.fieldType, this.newPosition, {
          'is-expanded': this.expanded,
          'is-grouped-multiline': this.groupMultiline,
          'is-horizontal': this.horizontal
        }]
      },
      newPosition () {
        if (this.position === undefined) return

        const position = this.position.split('-')
        if (position.length < 1) return

        const prefix = this.grouped
            ? 'is-grouped-'
            : 'has-addons-'

        if (this.position) return prefix + position[1]
      },

      fieldType () {
        if (this.grouped) return 'is-grouped'

        if (
          this.$slots.default !== undefined &&
          this.$slots.default.length > 1 &&
          this.addons &&
          !this.horizontal
        ) {
          return 'has-addons'
        }
      },
      formattedMessage () {
        if (this.newMessage) {
          if (Array.isArray(this.newMessage)) {
            return this.newMessage.filter((value) => {
              if (value) {
                return value
              }
            }).join(' <br> ')
          } else {
            return this.newMessage
          }
        } else {
          return this.newMessage
        }
      }
    },
    watch: {
      type (value) {
        this.newType = value
      },
      message (value) {
        this.newMessage = value
      }
    }
  }
  </script>
<style lang="scss" scoped>
.field {
    & label {
        display: block;
        padding-bottom: 8px;
        margin-bottom: 16px;
        border-bottom: 1px solid #dbdbdb;
        & span {
          margin-right: 4px;
        }
    }
    .help{
      font-size: 13px;
      color:rgba(0,0,0,.5);
      padding-top: 4px;
    }
}
</style>