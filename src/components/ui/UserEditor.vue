<template>
<form action="">
    <div class="modal-card">
      <header class="modal-card-head">
         <p class="modal-card-title">
            Édition de {{ user.name }}
         </p>
        <button class="delete" aria-label="close" @click.prevent="$parent.close()"></button>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column">
            <div class="avatar-container">
              <img class="avatar" :src="'https://www.gravatar.com/avatar/' + user.avatar + '.jpg?s=256&avatar'" :alt="user.name + 'gravatar'">
            </div>
          </div>
          <div class="column is-three-quarters">
            <b-field label="Nom">
                <b-input v-model="user.name" placeholder="Nom..."></b-input>
            </b-field>
            <b-field label="Email">
                <b-input v-model="user.email" placeholder="Email..." type="email"></b-input>
            </b-field>
          </div>
        </div>
        <b-field label="Role">
            <b-input placeholder="Role" disabled value="Utilisateur"></b-input>
        </b-field>
        <b-field label="Mot de passe" v-show="isPasswordActive">
            <b-input type="password" v-model="user.newpassword" placeholder="Laissez vide pour ne pas changer"></b-input>
        </b-field>
        <button v-show="!isPasswordActive" @click.prevent="isPasswordActive = true" class="button">Changer le mot de passe</button>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click.prevent="save">
          <b-icon icon="check"></b-icon>
          <span>Valider</span>
        </button>
      </footer>
    </div>
  </form>
</template>
<script>
  export default {
    name: 'UserEditor',
    props: ['user'],
    data () {
      return {
        isPasswordActive: false
      }
    },
    components: {
    },
    methods: {
      save () {
        this.$emit('userSave', this.user, this.index)
      }
    }
  }
</script>

<style scoped lang="scss">
.avatar-container{
  display: flex;
  justify-content: center;
  align-items:center;
  img{
    border-radius: 5%;
  }
}
</style>
