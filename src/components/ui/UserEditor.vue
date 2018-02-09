<template>
<form action="">
    <div class="modal-card">
      <header class="modal-card-head">
         <p v-if="index === -1" class="modal-card-title">Nouvel utilisateur</p>
         <p v-else class="modal-card-title">Édition de {{ user.name }}</p>
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
        <b-field label="Mot de passe" v-show="isPasswordActive || index === -1">
            <b-input type="password" v-model="user.newpassword" placeholder="Mot de passe..."></b-input>
        </b-field>
        <button v-show="!isPasswordActive && index !== -1" @click.prevent="isPasswordActive = true" class="button">Changer le mot de passe</button>
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
    props: ['user', 'index'],
    data () {
      return {
        isPasswordActive: false
      }
    },
    components: {
    },
    methods: {
      save () {
        if (this.index === -1) {
          this.$emit('userSave', this.user)
        } else {
          this.$emit('userEdit', this.user, this.index)
        }
        this.$parent.close()
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
