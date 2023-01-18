<template>
  <div class="table">
    <table class="table-thead">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Permissão</th>
          <th id="op-size">Opções</th>
        </tr>
      </thead>
      <tbody v-for="user in users" :key="user._id">
        <tr>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.rules }}</td>
          <td class="command-user">
            <font-awesome-icon @click="() => editUser(user._id, user)" :icon="['fas', 'user-pen']" />
            <font-awesome-icon @click="() => toggleHidden(user._id)" :icon="['fas', 'trash-can']" />
          </td>
          <ConfirmModal 
            v-if="hidden && id === user._id" 
            @delete-user="deleteUser(user._id)"
            @close-modal="closeModal"
          />
        </tr>
      </tbody>
    </table>
    <div class="modal-update" v-show="call_form">
      <UpdateForm 
        :userData="userToUpdate"
        @update-user="(updateUser)"  
        @close-modal-update="(closeModalUpdate)"
      />
    </div>
    <PopUpOk 
      :info_message="message"
      v-if="hiddenPopupOk"
    />
    <PopUpAlert 
      :info_message="message"
      v-if="hiddenPopupAlert"
    />
    <PopUpWarn 
      :info_message="message"
      v-if="hiddenPopupWarn"
    />
  </div>
</template>

<script>
import { io } from 'socket.io-client'
import Services from '../../services/axios-request';
import ConfirmModal from './ConfirmModal.vue';
import UpdateForm from './UpdateForm.vue';
import PopUpOk from '../alert-popups/PopUpOk.vue';
import PopUpAlert from '../alert-popups/PopUpAlert.vue';
import PopUpWarn from '../alert-popups/PopUpWarn.vue';

const socket = io('http://localhost:3005')

export default {
  name: "CardUsers",
  components: {
    ConfirmModal,
    UpdateForm,
    PopUpOk,
    PopUpAlert,
    PopUpAlert,
    PopUpWarn,
},
  data() {
    return {
      users: [],
      userToUpdate: { name: '', email: '', rules: '' }, //capturando dados a serem enviados para o form de update
      call_form: false,
      hidden: false,
      isCurrentUser: true,
      id: 0,
      teste_id: null,
      accessLevel: true,
      message: '',
      hiddenPopupOk: false,
      hiddenPopupAlert: false,
      hiddenPopupWarn: false,  
    };
  },
  computed: {
    emptyList() {
      return this.users.length === 0
    }
  },
  async created() {
    //register user
    await this.emitter.on('handleSubmitUser', (data) => {
      Services.createUser(data).catch(Error => {
        console.log(Error.code, 'usuário já existe')
        this.popupTimeoutAlert('Usuário já existe!')
      })
      this.popupTimeoutOk(`Usuário ${data.name} cadastrado com sucesso!`)
    })
    //search users
    await this.emitter.on('finduser', (user) => {
      Services.findOne(user).then(res => {
        return this.users = res.data
      })
    }),
    //clean input search
    this.emitter.on('cleanAndUpdateList', (email) => {
      if(!email) {
        this.listUsers()
      }
    })
  },
  methods: {
    //method popup
    popupTimeoutOk(msg) {
      this.hiddenPopupOk = true
      this.message = msg
      setTimeout(() => {
        this.hiddenPopupOk = false
      }, 3000)
    },
    popupTimeoutAlert(msg) {
      this.hiddenPopupAlert = true
      this.message = msg
      setTimeout(() => {
        this.hiddenPopupAlert = false
      }, 3000)
    },
    popupTimeoutWarn(msg) {
      this.hiddenPopupWarn = true
      this.message = msg
      setTimeout(() => {
        this.hiddenPopupWarn = false
      }, 3000)
    },
    //list users 
    async listUsers() {
      await Services.listar().then(res => {
        const dataUser = this.users = res.data
        return this.users = dataUser.filter(user => user.name !== this.$store.state.user.name)
      })
    },
    //update user
    async updateUser(user) {
      const id = this.teste_id
      console.log(id)
    
      await Services.update(user, id)
      this.call_form = false
    },
    //delete user
    async deleteUser(id) {
      await Services.removeUser(id).then(res => {
        if (res.status === 200) {
          this.listUsers()
        }
        this.hidden = false
      })
    },
    //toggle functions
    editUser(id, user) {
      this.call_form = !this.call_form

      this.userToUpdate.name = user.name
      this.userToUpdate.email = user.email
      this.userToUpdate.rules = user.rules
      console.log(this.id = id)
      console.log(this.userToUpdate)

      this.teste_id = id
    },
    toggleHidden(id) {
      this.hidden = true
      this.id = id
    },
    closeModal() {
      this.hidden = false
    },
    closeModalUpdate() {
      this.call_form = false
    }
  },
  async mounted() {
    this.listUsers()

    socket.on('user-created', () => {
      this.listUsers()
    })

    await socket.on('update-user', (id) => {
      this.listUsers()

      if(localStorage.getItem('session_id') === id) {
        this.popupTimeoutWarn('Suas permissões foram alteradas. Logue novamente')
        setTimeout(() => {
          localStorage.clear()
          this.$router.push('/login')
        }, 5000)
      }
    })

    await socket.on('remove-user', () => {
      this.listUsers()
    })

  },
}
</script>

<style scoped>
  @import '../../assets/components/card-users.css';
  @import '../../assets/components/form-update.css';
</style>