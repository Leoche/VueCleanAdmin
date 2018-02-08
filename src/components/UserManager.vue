<template>
  <section>
    <b-tabs v-model="activeTab" position="is-centered">
      <b-tab-item label="Utilisateurs" icon="account-multiple">
        <div class="columns">
          <div v-for="(user, i) in this.rawData" v-bind:key="i" class="column column--card">
            <UserCard :user="user" :index="i" v-on:userAction="userAction"></UserCard>
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
    <b-modal :active.sync="isUserEditorActive" has-modal-card>
      <UserEditor v-on:userSave="userSave" :user="userEditorData"></UserEditor>
    </b-modal>
  </section>
</template>

<script>
import UserCard from '@/components/ui/UserCard'
import UserEditor from '@/components/ui/UserEditor'

export default {
  name: 'UserManager',
  components: {
    UserCard,
    UserEditor
  },
  data () {
    return {
      activeTab: 0,
      isUserEditorActive: false,
      userEditorData: null,
      rawData: {}
    }
  },
  methods: {
    userAction (action, index) {
      if (action === 'edit') {
        this.isUserEditorActive = true
        this.userEditorData = this.rawData[index]
      }
      console.log('action', action)
      console.log('index', index)
    },
    userSave (user, index) {
      console.log('user', user)
      console.log('index', index)
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
