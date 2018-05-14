<template>
  <section>
    <nav class="level level-header">
      <div class="level-left">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li class="is-active"><a class="is-size-4 has-text-weight-bold" href="#" aria-current="page">User Manager</a></li>
          </ul>
        </nav>
      </div>
      <div class="level-right">
        <button class="button is-rounded" @click.prevent="isJsonActive = true" v-if="$session.get('user').role === 'admin'">
          <b-Icon icon="code-tags"></b-Icon>
          <span>JSON</span>
        </button>
        <button class="button is-info is-rounded is-shadowed" @click.prevent="userAction('add')">
          <b-Icon icon="plus"></b-Icon>
          <span>Ajouter un utilisateur</span>
        </button>
      </div>
    </nav>
    <div class="columns">
      <div v-for="(user, i) in users" v-bind:key="i" class="column column--card">
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
          <pre class="code">
            <blockquote>{{ users }}</blockquote>
          </pre>
        </div>
        <footer class="modal-card-foot"></footer>
      </div>
    </b-modal>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
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
      isUserEditorActive: false,
      isJsonActive: false,
      userEditorData: {},
      userEditorIndex: -1
    }
  },
  computed: {
    ...mapGetters({
      users: 'getUsers'
    })
  },
  methods: {
    userAction (action, index) {
      if (action === 'edit') {
        this.userEditorIndex = index
        this.userEditorData = this.$store.getters.getUsers[index]
        this.isUserEditorActive = true
      } else if (action === 'add') {
        this.userEditorIndex = -1
        this.userEditorData = {
          'name': '',
          'email': '',
          'password': ''
        }
        this.isUserEditorActive = true
      } else if (action === 'remove') {
        this.$store.dispatch('removeUser', {user: this.$session.get('user'), index: index}).then(res => {
          this.$toast.open({
            message: 'Succès: ' + res.data.message,
            type: 'is-success'
          })
        })
      }
    },
    userEdit (user, index, olduser) {
      this.$store.dispatch('editUser', {
        user: this.$session.get('user'),
        newuser: {
          'email': user.email,
          'oldemail': olduser.email,
          'name': user.name,
          'password': user.newpassword || ''
        },
        index: index
      }).then(res => {
        this.$toast.open({
          message: 'Succès: ' + res.data.message,
          type: 'is-success'
        })
      })
    },
    userSave (user) {
      this.$store.dispatch('addUser', {
        user: this.$session.get('user'),
        newuser: {
          email: user.email,
          name: user.name,
          password: user.newpassword
        }
      }).then(res => {
        this.$toast.open({
          message: 'Succès: ' + res.data.message,
          type: 'is-success'
        })
      })
    }
  },
  mounted () {
    this.$store.dispatch('fetchUsers', this.$session.get('user')).then(res => {
      this.$toast.open({
        message: 'Succès: ' + res.data.message,
        type: 'is-success'
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
