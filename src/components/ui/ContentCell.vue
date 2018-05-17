<template>
<p>
  <span v-if="type === 'text' || type === 'numeric'">{{ content }}</span>
  <span v-else-if="type === 'date'">{{ content | formatDate }}</span>
  <span v-else-if="type === 'location'"><b-Icon icon="map-marker" size="is-small"></b-Icon></span>
  <span v-else-if="type === 'boolean'">
    <b-Icon v-if="content === false" icon="close-circle-outline" size="is-small"></b-Icon>
    <b-Icon v-else icon="checkbox-marked-circle" size="is-small"></b-Icon>
  </span>
  <span v-else-if="type === 'tags'" class="tags">
    <span v-for="tag in content" class="tag">{{ tag }}</span>
  </span>
  <span v-else-if="type === 'image'" class="tags">
    <span class="img-container">
      <img v-for="image in content" :src="image.name | imageUrl" alt="image">
    </span>
  </span>
</p>
</template>
<script>
export default {
  name: 'ContentCell',
  props: ['type', 'content'],
  filters: {
    formatDate (date) {
      let dateobj = new Date(date)
      return [dateobj.getDate(), (dateobj.getMonth() + 1), dateobj.getFullYear().toString().substring(2, 4)].join('/')
    },
    imageUrl (image) {
      return document.querySelector('meta[name=api]').content + '?asset=' + image
    }
  }
}
</script>
<style scoped lang="scss">
.img-container{
  width:24px;
  height:24px;
  display: inline-block;
  overflow: hidden;
  border-radius:50%;
  & img{
    object-fit: cover;
  }
}
</style>
