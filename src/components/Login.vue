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
      vemail: '',
      vpassword: ''
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
      let user = this.$auth.login(this.vemail, this.vpassword)
      if (user) {
        if (this.$localStorage.get('remember', false)) {
          this.$localStorage.set('vemail', this.vemail)
          this.$localStorage.set('vpassword', this.vpassword)
        }
        this.$session.set('user', user)
        vm.isLoading = false
        vm.$toast.open({
          message: 'Bienvenue ' + this.$session.get('user').name,
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
  },
  mounted () {
    // Remove margin html
    let className = "has-navbar-fixed-top"
    let el = document.documentElement
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')

    if (this.$localStorage.get('remember', false)) {
      this.vemail = this.$localStorage.get('vemail', '')
      this.vpassword = this.$localStorage.get('vpassword', '')
    } else {
      this.vemail = this.$localStorage.set('vemail', '')
      this.vpassword = this.$localStorage.set('vpassword', '')
    }
  },
  destroyed () {
    // Add margin html
    let className = "has-navbar-fixed-top"
    let el = document.documentElement
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  }
}
</script>

<style scoped lang="scss">
.hero.is-login{
  background-color:#ccd;
  background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAF0lEQVQYV2PU1NT8z4AEGEkTeP36NQMA8G0IrhzLffYAAAAASUVORK5CYII=);
  background:url(https:////wallpapertag.com/wallpaper/middle/3/2/7/347905-free-download-blurred-background-1920x1200-computer.jpg);
  background-size: cover;
  & .card{
    width: 500px;
    margin: 0 auto;
    border-radius: .25rem;
  }
}
</style>