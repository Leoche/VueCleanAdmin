<template>
  <section>
    <b-tabs v-model="activeTab" position="is-centered">
      <b-tab-item label="Utilisateurs" icon="account-multiple">
        <div class="columns">
          <div v-for="(user, i) in this.rawData" v-bind:key="i" class="column column--card">
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

                    <a class="card-header-icon">
                      <b-dropdown position="is-bottom-left">
                        <b-Icon icon="settings" slot="trigger"></b-Icon>
                        <b-dropdown-item @click="editInput(i)">
                          <b-Icon icon="pencil" size="is-small"></b-Icon>
                          <span>Éditer</span>
                        </b-dropdown-item>
                        <b-dropdown-item @click="removeInput(i)">
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
          </div>
        </div>
      </b-tab-item>

      <!-- Json preview block -->
      <b-tab-item label="Json Preview" icon="json">
        <div class="columns">
          <div class="column has-text-centered">
            <div class="content">
              <h3>JSON Preview</h3>
            </div>
          </div>
        </div>
        <pre>
          <blockquote>{{ rawData }}</blockquote>
        </pre>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>

export default {
  name: 'UserManager',
  components: {
  },
  data () {
    return {
      activeTab: 0,
      isInputPickerActive: false,
      path: '',
      saved: true,
      editableInputData: null,
      rawData: {}
    }
  },
  methods: {
    save () {
      // TODO
    }
  },
  mounted () {
    let api = document.querySelector('meta[name=api]').content
    this.$http.post(api, {
      'action': 'getusers',
      'email': this.$session.get('user').email,
      'password': this.$session.get('user').password
    }, {
      emulateJSON: true
    }).then(res => {
      if (res.data.state === 'success') {
        this.$toast.open({
          message: 'Les utilisateurs viennent d\'être chargé avec succès',
          type: 'is-success',
          position: 'is-bottom'
        })
        this.rawData = res.data.body
      } else {
        this.$toast.open({
          message: 'Erreur lors de chargement: ' + res.data.message,
          type: 'is-danger',
          position: 'is-bottom'
        })
      }
    }, res => {
      this.$toast.open({
        message: 'Erreur lors de la connexion à l\'api: ' + res.data.message,
        type: 'is-danger',
        position: 'is-bottom'
      })
    })
  }
}
</script>

<style scoped lang="scss">
.card{
  overflow: hidden;
  border-radius: 10px;
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
