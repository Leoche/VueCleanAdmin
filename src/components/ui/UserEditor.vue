<template>
<form action="">
<transition appear name="fadeup">
    <div class="card card--list">
      <div class="card-image" :class="{'is-admin': user.role==='admin'}">
        <figure class="image is-4by1">
            <UserAvatar :user="user"/>
            <div>
              <a @click.prevent="$parent.close()">
                <b-Icon icon="close"></b-Icon>
              </a>
            </div>
        </figure>
      </div>
      <div class="card-content">
        <b-field label="Nom">
            <b-input v-model="user.name" placeholder="Nom..."></b-input>
        </b-field>
        <b-field label="Email">
            <b-input v-model="user.email" placeholder="Email..." type="email"></b-input>
        </b-field>
        <b-field label="Role">
            <b-input placeholder="Role" disabled value="Utilisateur"></b-input>
        </b-field>
        <b-field label="Mot de passe" v-show="isPasswordActive || index === -1">
            <b-input type="password" v-model="user.newpassword" placeholder="Mot de passe..."></b-input>
        </b-field>
        <button v-show="!isPasswordActive && index !== -1" @click.prevent="isPasswordActive = true" class="button">Changer le mot de passe</button>
        <button @click.prevent="save()" class="button is-info">Sauvegarder</button>
      </div>
    </div>
  </transition>

  </form>
</template>
<script>
  import UserAvatar from '@/components/ui/UserAvatar'
  export default {
    name: 'UserEditor',
    props: ['user', 'index'],
    data () {
      return {
        isPasswordActive: false
      }
    },
    components: {
      UserAvatar
    },
    methods: {
      save () {
        if (this.index === -1) {
          this.$emit('userSave', this.user)
        } else {
          this.$emit('userEdit', this.user, this.index)
        }
        this.$parent.close()
      }
    }
  }
</script>

<style scoped lang="scss">
.avatar-container{
  display: flex;
  justify-content: center;
  align-items:center;
  img{
    border-radius: 5%;
  }
}

.card{
  min-width: 400px;
  border-radius: 10px;
  overflow: hidden;
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
        div{
          position: absolute;
          top: 10px;
          right: 10px;
          & a .icon{
            color:rgba(255,255,255,.6);
            &:hover{
              color:rgba(255,255,255,1);
            }
          }
        }
      }
  }
  .card-image.is-admin{
    background-color: #FBDA61;
    background-image: linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%);
  }
}
</style>
