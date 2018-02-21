<template>
  <section class="hero is-login is-fullheight">
    <div class="hero-body">
      <div class="container">
        <transition appear name="fadedown">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Connexion Administration
              </p>
              <span class="card-header-icon">
                <img src="/src/assets/va-color.svg" alt="Vuecleanadmin logo">
              </span>
            </header>
            <div class="card-content">
              <div class="content">
                <b-field>
                  <b-input placeholder="Email" type="email" icon="email-outline" v-model="vemail"></b-input>
                </b-field>
                <b-field>
                  <b-input placeholder="Mot de passe" type="password" icon="key" @keyup.enter.native="login" v-model="vpassword" password-reveal autocomplete="off"></b-input>
                </b-field>
                <div class="field">
                  <b-switch v-model="$localStorage.remember">
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
        </transition>
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
      vemail: 'test@test.com',
      vpassword: '0000'
    }
  },
  localStorage: {
    remember: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    login () {
      const vm = this
      vm.isLoading = true
      this.$store.dispatch('login', {email: this.vemail, password: this.vpassword}).then(res => {
        this.$session.set('user', JSON.parse(JSON.stringify(res)))
        vm.isLoading = false
        vm.$toast.open({
          message: 'Hello ' + res.name,
          type: 'is-success'
        })
        this.$router.go('/')
      }).catch((err) => {
        console.log('err', err)
        vm.isLoading = false
        vm.$toast.open({
          message: 'ERROR:' + err,
          type: 'is-danger'
        })
      })
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
  background-color: #CCD;

  & .card{
    width: 500px;
    margin: 0 auto;
    border-radius: .25rem;
  }
}
</style>