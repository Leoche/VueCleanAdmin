<template>
  <section>
    <b-tabs v-model="activeTab" position="is-centered">
      <b-tab-item label="Utilisateurs" icon="account-multiple">
        <div class="columns">
          <div v-for="(user, i) in this.rawData" v-bind:key="i" class="column column--card">
            <ProfileCard :user="user" :index="i" v-on:profileAction="profileAction"></ProfileCard>
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
    <b-modal :active.sync="isProfileEditorActive" has-modal-card>
      <ProfileEditor :user="profileEditorData"></ProfileEditor>
    </b-modal>
  </section>
</template>

<script>
import ProfileCard from '@/components/ui/ProfileCard'
import ProfileEditor from '@/components/ui/ProfileEditor'

export default {
  name: 'UserManager',
  components: {
    ProfileCard,
    ProfileEditor
  },
  data () {
    return {
      activeTab: 0,
      isProfileEditorActive: false,
      profileEditorData: null,
      rawData: {}
    }
  },
  methods: {
    profileAction (action, index) {
      if (action === 'edit') {
        this.isProfileEditorActive = true
        this.profileEditorData = this.rawData[index]
      }
      console.log('action', action)
      console.log('index', index)
    },
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
.column{
  padding-bottom: 50px;
}
</style>
