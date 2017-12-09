<template>
  <div id="app">
    <section class="hero is-login is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Administration - leoche.org
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
                <b-input placeholder="Email" type="email" icon="email-outline"></b-input>
              </b-field>
              <b-field>
                <b-input placeholder="Mot de passe" type="password" icon="key"></b-input>
              </b-field>
              <div class="field">
                <b-switch v-model="remember">
                  Se souvenir de moi
                </b-switch>
              </div>
              <b-field grouped position="is-right">
                <p class="control">
                  <button class="button is-light">Annuler</button>
                  <button class="button is-primary">Connexion</button>
                </p>
              </b-field>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      remember: false
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$primary: #167df0;
$blue-color:#11CDC5;
$pink-color:#FC2D79;
$yellow-color:#ffb52a;

$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
);
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.hero.is-login{
  background-color:#ccd;
  background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAF0lEQVQYV2PU1NT8z4AEGEkTeP36NQMA8G0IrhzLffYAAAAASUVORK5CYII=);
  & .card{
    width: 400px;
    margin: 0 auto;
    border-radius: .25rem;
  }
}
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
