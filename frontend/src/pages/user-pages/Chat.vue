<template>
  <HeaderUser />
    <Template>
      <Typography :title="title" />
      <div class="container-chat">
        
        <div class="online-users">
          <button v-if="joined" @click="sairDoChat" style="background: red; cursor: pointer;">sair do chat</button>
          <h3>Usuários online</h3>
          <div>
            <div v-if="emptyList" class="emptyList"> 
              Nenhum usuário está online!
            </div>
            <ul v-else class="users">
              <li v-for="user in users" :key="user"  @click="implement">
                <div class="status"></div>
                {{ user }}
              </li>
            </ul>
          </div>
        </div>
        <div class="message-box">
          <form v-if="!joined" @submit.prevent="join" class="form-user-chat">
            <label>Usuário:</label>
            <input type="text" v-model="name" disabled>
            <button>Iniciar Chat</button>
          </form>
          <div class="messages" v-else>
            <div class="chat-box">
              <!--implementar esquema de other message-->
              <div v-for="message in messages" :key="message" class="messages-container">
                <div class="chat-ballom">
                  <span>{{ message.name }}</span>
                  <p>{{ message.text }}</p>
                </div>
              </div>
            </div>
            <form @submit.prevent="sendMessage" class="write-field">
              <input type="text" v-model="messageText" placeholder="Digite uma mensagem">
              <button>
                <font-awesome-icon :icon="['fas', 'paper-plane']" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </Template>
    <PopUpWarn v-if="hiddenPopup" :info_message="message"/>
    <PopUpOk v-if="hiddenPopupOk" :info_message="message"/>
  <FooterUser />
</template>

<script>
import { io } from 'socket.io-client'

const socket = io('http://localhost:3005')
import HeaderUser from '../../components/components-users/HeaderUser.vue'
import FooterUser from '../../components/components-users/FooterUser.vue'
import Template from '../../components/components-users/Template.vue'
import Typography from '../../components/components-users/Typography.vue'
import PopUpWarn from '../../components/alert-popups/PopUpWarn.vue'
import PopUpOk from '../../components/alert-popups/PopUpOk.vue'

export default {
  name: 'Chat',
  components: {
    HeaderUser,
    FooterUser,
    Typography,
    Template,
    PopUpWarn,
    PopUpOk,
  },
  data() {
    return {
      title: 'Chat',
      name: this.$store.state.user.name,
      messageText: '',
      message: '',
      users: [],
      messages: [],
      hiddenPopup: false,
      hiddenPopupOk: false,
      joined: false,
    }
  },
  computed: {
    emptyList() {
      return this.users.length === 0
    }
  },
  methods: {
    implement() {
      alert('Breve teremos salas individuais')
    },
    join() {
      socket.emit('join', { name: this.name }, () => {
        this.joined = true  
      })
    },
    sendMessage() {
      if(this.messageText === '') {
        this.message = 'Digite uma mensagem!'
        this.hiddenPopup = true
        setTimeout(() => {
          this.hiddenPopup = false
        }, 3000)
      } else {
        socket.emit('createChat', { text: this.messageText, type: 0 }, () => {
          this.messageText = ''
        })
      }
    },
    /*sairDoChat() {
      socket.on('leave-room', () => {
        this.users.shift(this.user)
        console.log('teste')
      })
      socket.on('leave-room', { name: this.name }, () => {
        console.log(this.name, 'usuario saiu do chat')
      })*/
      /*this.joined = false
      this.users.shift(this.user)
      socket.on('leave-room', () => {
        console.log('usuario deixou a sala')
      })
    }*/
  },
  mounted() {
    socket.emit('findAllChat', {}, res => {
      this.messages = res
    })

    socket.on('message', (message) => {
      this.messages.push(message)
      console.log('testando evento')
    })    

    /*socket.on('is-logged', (res) => {
      this.users.push(res)
      

      socket.on('joined-room', (user) => {
        console.log(user)
      })


      socket.on('joined-room', (user) => {
        console.log(user)
        this.message = `Usuário ${user} está online`
        this.hiddenPopupOk = true
        setTimeout(() => {
          this.hiddenPopupOk = false
        }, 3000)
      })
    })*/
    socket.on('join-room', res => {
      //this.users = res

      console.log(this.users.push(res))
    
      socket.on('joined-room', (user) => {
        this.message = `Usuário ${user} está online`
        this.hiddenPopupOk = true
        setTimeout(() => {
          this.hiddenPopupOk = false
        }, 3000)
      })
    })
  }
}
</script>

<style scoped>
  @import '../../assets/chat.css';
</style>