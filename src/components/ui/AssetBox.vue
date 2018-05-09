<template>
  <transition appear name="fadeup">
    <div class="card card--asset card--list">
      <div class="card-image">
        <figure class="image is-4by3">
          <template v-if="type === 'image'">
            <img class="asset-image" :src="url" :alt="asset.name">
          </template>
          <template v-else>
            <div class="asset-file">
              <b-Icon v-if='type==="video"' icon="file-video" size="is-large"></b-Icon>
              <b-Icon v-else-if='type==="audio"' icon="file-audio" size="is-large"></b-Icon>
              <b-Icon v-else-if='type==="text"' icon="file-document" size="is-large"></b-Icon>
              <b-Icon v-else-if='extension==="pdf"' icon="file-pdf" size="is-large"></b-Icon>
              <b-Icon v-else-if='extension==="vnd.rar" || extension==="x-rar" || extension==="zip"' icon="package-variant-closed" size="is-large"></b-Icon>
              <b-Icon v-else-if='extension==="zip"' icon="file-pdf" size="is-large"></b-Icon>
              <b-Icon v-else icon="file" size="is-large"></b-Icon>
            </div>
          </template>
        </figure>
      </div>
      <div class="card-content">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <p><strong>{{ name }}</strong></p>
              <p class="is-small">{{ size }} {{extension}} {{type}}</p>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item content">
              <div v-if="canDelete">
                <button @click="remove()" class="button button-blank" :class="{'is-loading': pending}">
                  <b-Icon icon="delete" size="is-small"></b-Icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
import prettyBytes from 'pretty-bytes'

export default {
  name: 'AssetBox',
  props: ['asset', 'canDelete'],
  data () {
    return {
      pending: false
    }
  },
  computed: {
    size () {
      return prettyBytes(this.asset.size)
    },
    url () {
      return document.querySelector('meta[name=api]').content + '?asset=' + this.asset.name
    },
    name () {
      let fullName = this.asset.name.substring(800, 14)
      let ext = fullName.split('.')[fullName.split('.').length - 1]
      let shortName = fullName.split('.').shift()
      if (fullName.length > 15) fullName = shortName.substring(15, 0) + '(...).' + ext
      return fullName
    },
    isImage () {
      let imageTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp', 'image/gif', 'image/svg']
      return imageTypes.indexOf(this.asset.type) !== -1
    },
    type () {
      return this.asset.type.split('/')[0]
    },
    extension () {
      return this.asset.type.split('/')[1]
    }
  },
  methods: {
    remove () {
      this.pending = true
      this.$emit('deleteAsset', this.asset.name)
    }
  }
}
</script>

<style scoped lang="scss">
p{
  font-size:14px;
  &.is-small{
    color:#888;
    font-size:12px;
  }
}
.card--asset{
  box-shadow: 0 2px 6px rgba(10, 10, 10, 0.1), 0 10px 6px 1px rgba(10, 10, 10, 0.03);
  min-width: 20%;
  margin:10px;
  border-radius: 5px;
  overflow: hidden;
  .card-content{
    padding:0.5rem 0.75rem;

    & .level-item{
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
    }

    & .level-right{
      & .level-item{
        align-items: flex-end;
      }
    }
  }
  .card-image{
    overflow: hidden;

    & .image{
      height: 150px;
      padding-top: 0;
      width: 235px;
      display: inline-block;

      & img.asset-image{
        object-fit: cover;
      }
    }
  }
  .asset-file{
    width: 100%;
    height: 150px;
    background: #e6e6e6;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#c1c1c1;
  }
}
.content figure{
  margin-left: 0;
  margin-right: 0;
}
</style>
