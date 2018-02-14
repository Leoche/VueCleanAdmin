<template>
  <section>
    <nav class="level">
      <div class="level-right">
        <button class="button is-info" @click.prevent="userNew()">
          <b-Icon icon="plus"></b-Icon>
          <span>Ajouter un utilisateur</span>
        </button>
      </div>
    </nav>

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
      <UserEditor v-on:userSave="userSave" v-on:userEdit="userEdit" :user="userEditorData" :index="userEditorIndex"></UserEditor>
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
      userEditorData: {},
      userEditorIndex: -1,
      rawData: {}
    }
  },
  methods: {
    userAction (action, index) {
      let api = document.querySelector('meta[name=api]').content
      if (action === 'edit') {
        this.isUserEditorActive = true
        this.userEditorIndex = index
        this.userEditorData = this.rawData[index]
      } else if (action === 'remove') {
        this.$server.post(this, {
          'action': 'removeuser',
          'useremail': this.rawData[index].email,
        }, res => {
          this.rawData.splice(index, 1)
        })
      }
    },
    userEdit (user, index) {
      this.rawData[index].name = user.name
      this.rawData[index].email = user.email
    },
    userSave (user) {
      this.$server.post(this, {
        'action': 'adduser',
        'useremail': user.email,
        'username': user.name,
        'userpassword': user.newpassword
      }, res => {
        this.rawData.push({
          'name': user.name,
          'role': 'user',
          'email': user.email
        })
      })
    },
    userNew () {
      this.userEditorIndex = -1
      this.userEditorData = {
        'name': '',
        'email': '',
        'password': ''
      }
      this.isUserEditorActive = true
    }
  },
  mounted () {
    this.$server.post(this, {action: 'getusers'}, res => {
      this.rawData = res.data.body
    })
  }
}
</script>

<style scoped lang="scss">
.column{
  padding-bottom: 50px;
}
</style>
