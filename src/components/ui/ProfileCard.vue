<template>
  <transition appear name="fadeup">
    <div class="card card--list">
      <div class="card-image" :class="{'is-admin': user.role==='admin'}">
        <figure class="image is-4by1">
            <img  :src="'https://www.gravatar.com/avatar/' + user.avatar + '.jpg?s=256&avatar'" :alt="user.name + 'gravatar'">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <small v-if="user.role==='admin'" class="has-text-grey-light is-uppercase has-text-weight-light">Administrateur</small>
            <small v-else class="has-text-grey-light is-uppercase has-text-weight-light">Utilisateur</small>
            <p class="title is-4">{{ user.name }}</p>
            <p class="subtitle is-6 has-text-grey">{{ user.email }}</p>
          </div>
          <div class="media-right">
            <b-Icon v-if="user.role==='admin'" icon="account-star"></b-Icon>
            <b-Icon v-else icon="account"></b-Icon>
            <a v-if="user.role==='user'">
              <b-dropdown position="is-bottom-left">
                <b-Icon icon="settings" slot="trigger"></b-Icon>
                <b-dropdown-item @click="action('edit', index)">
                  <b-Icon icon="pencil" size="is-small"></b-Icon>
                  <span>Éditer</span>
                </b-dropdown-item>
                <b-dropdown-item @click="action('remove', index)">
                  <b-Icon icon="delete" size="is-small"></b-Icon>
                  <span>Supprimer</span>
                </b-dropdown-item>
              </b-dropdown>
            </a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: ['user', 'index'],
  methods: {
    action (action, index) {
      this.$emit('profileAction', action, index)
    }
  }
}
</script>

<style scoped lang="scss">
.card{
  box-shadow: 0 2px 6px rgba(10, 10, 10, 0.1), 0 10px 6px 1px rgba(10, 10, 10, 0.03);
  .card-image{
    background-color: #8EC5FC;
    background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
      position:relative;
      .is-4by1{
        padding-top:25%;
        img{
          position: absolute;
          width: auto;
          height: 120%;
          left: 50%;
          transform:translateX(-50%);
          top: 30%;
          border-radius: 50%;
          background:white;
          border: 5px solid white;
          box-shadow:0 2px 5px rgba(0,0,0,.1);
        }
      }
  }
  .card-image.is-admin{
    background-color: #FBDA61;
    background-image: linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%);
  }
}
</style>
