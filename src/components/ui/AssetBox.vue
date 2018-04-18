<template>
  <transition appear name="fadeup">
    <div class="card card--asset card--list">
      <div class="card-image">
        <figure class="image is-4by3">
          <img class="asset-image" :src="url" :alt="asset.name">
        </figure>
      </div>
      <div class="card-content">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <p><strong>{{ name }}</strong></p>
              <p class="is-small">{{ size }}</p>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item content">
              <div>
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
  props: ['asset'],
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
      return this.asset.name.substring(800, 14)
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
p.is-small{
  color:#888;
  font-size:12px;
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
      & img.asset-image{
        object-fit: cover;
      }
    }
  }
}
</style>
