<template>
  <section>
    <nav class="level">
      <div class="level-left">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li class="is-active"><a class="is-size-4 has-text-weight-bold" href="#" aria-current="page">User Manager</a></li>
          </ul>
        </nav>
      </div>
      <div class="level-right">
        <button class="button is-rounded is-shadowed" @click.prevent="isJsonActive = true" v-if="$session.get('user').role === 'admin'">
          <b-Icon icon="code-tags"></b-Icon>
          <span>JSON</span>
        </button>
        <button class="button is-info is-rounded is-shadowed" @click.prevent="userNew()">
          <b-Icon icon="plus"></b-Icon>
          <span>Ajouter un utilisateur</span>
        </button>
      </div>
    </nav>
    <div class="columns">
      <div v-for="(user, i) in this.rawData" v-bind:key="i" class="column column--card">
        <UserCard :user="user" :index="i" v-on:userAction="userAction"></UserCard>
      </div>
    </div>

    <b-modal :active.sync="isUserEditorActive" has-modal-card>
      <UserEditor v-on:userSave="userSave" v-on:userEdit="userEdit" :olduser="userEditorData" :index="userEditorIndex"></UserEditor>
    </b-modal>
    <b-modal :active.sync="isJsonActive" has-modal-card>
      <div class="modal-card card--json">
        <div class="modal-card-head">
          <p class="modal-card-title has-text-centered">
            <b-Icon icon="json"></b-Icon> Code Json
          </p>
        </div>
        <div class="modal-card-body">
          <pre>
            <blockquote>{{ rawData }}</blockquote>
          </pre>
        </div>
        <footer class="modal-card-foot"></footer>
      </div>
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
      isJsonActive: false,
      userEditorData: {},
      userEditorIndex: -1,
      rawData: {}
    }
  },
  methods: {
    userAction (action, index) {
      if (action === 'edit') {
        this.userEditorIndex = index
        this.userEditorData = this.rawData[index]
        this.isUserEditorActive = true
      } else if (action === 'remove') {
        this.$server.post(this, {
          'action': 'removeuser',
          'useremail': this.rawData[index].email
        }, res => {
          this.rawData.splice(index, 1)
        })
      }
    },
    userEdit (user, index, olduser) {
      console.log('user', user)
      this.$server.post(this, {
        'action': 'edituser',
        'useremail': user.email,
        'useroldemail': olduser.email,
        'username': user.name,
        'userpassword': user.newpassword || ''
      }, res => {
        this.rawData[index].name = user.name
        this.rawData[index].email = user.email
      })
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
