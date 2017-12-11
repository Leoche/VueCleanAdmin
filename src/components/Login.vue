<template>
  <section class="hero is-login is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Connexion Administration
            </p>
            <span class="card-header-icon">
              <svg width="35" height="10" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
               <circle fill="#11CDC5" cx="5" cy="5" r="5" />
               <circle fill="#FC2D79" cx="17.5" cy="5" r="5" />
               <circle fill="#ffb52a" cx="30" cy="5" r="5" />
             </svg>
           </span>
         </header>
         <div class="card-content">
          <div class="content">
            <b-field>
              <b-input placeholder="Email" type="email" icon="email-outline" v-model="vemail"></b-input>
            </b-field>
            <b-field>
              <b-input placeholder="Mot de passe" type="password" icon="key" v-model="vpassword" password-reveal autocomplete="off"></b-input>
            </b-field>
            <div class="field">
              <b-switch v-model="remember">
                Se souvenir de moi
              </b-switch>
            </div>
            <b-field grouped position="is-right">
              <p class="control">
                <button class="button is-light" @click="clear">Annuler</button>
                <button class="button is-primary" @click="login" v-bind:class="{ 'is-loading': isLoading }">Connexion</button>
              </p>
            </b-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: 'Login',
  data: () => {
    return {
      isLoading: false,
      remember: false,
      vemail: '',
      vpassword: ''
    }
  },
  methods: {
    login () {
      const vm = this
      vm.isLoading = true
      if (this.$auth.login()) {
        vm.isLoading = false
        vm.$toast.open({
          message: 'Bienvenue ' + this.$auth.user.name,
          type: 'is-success',
          position: 'is-bottom'
        })
        this.$router.push('/')
      } else {
        vm.isLoading = false
        vm.$toast.open({
          message: 'Mauvais identifiants',
          type: 'is-danger',
          position: 'is-bottom'
        })
      }
    },
    clear () {
      this.vemail = ''
      this.vpassword = ''
    }
  }
}
</script>

<style scoped lang="scss">
.hero.is-login{
  background-color:#ccd;
  background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAF0lEQVQYV2PU1NT8z4AEGEkTeP36NQMA8G0IrhzLffYAAAAASUVORK5CYII=);
  & .card{
    width: 500px;
    margin: 0 auto;
    border-radius: .25rem;
  }
}
</style>