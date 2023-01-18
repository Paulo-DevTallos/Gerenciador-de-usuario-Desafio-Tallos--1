<template>
  <RouterView />
  <PopUpWarn 
    :info_message="message"
    v-if="hiddenPopupWarn"  
  />
  <PopUpAlert 
    :info_message="message"
    v-if="hiddenPopupAlert"  
  />
</template>

<script>
import { io } from 'socket.io-client';
import PopUpWarn from './components/alert-popups/PopUpWarn.vue';
import PopUpAlert from './components/alert-popups/PopUpAlert.vue';
const socket = io('http://localhost:3005')
export default {
  name: 'App',
  components: {
    PopUpWarn,
    PopUpAlert
},
  data() {
    return {
      message: '',
      hiddenPopupWarn: false,
      hiddenPopupAlert: false,
    }
  },
  methods: {
    popupTimeoutWarn(msg) {
      this.hiddenPopupWarn = true
      this.message = msg
      setTimeout(() => {
        this.hiddenPopupWarn = false
      }, 5000)
    },
    popupTimeoutLogout(msg) {
      this.hiddenPopupAlert = true
      this.message = msg
      setTimeout(() => {
        this.hiddenPopupAlert = false
      }, 3000)
    },
  },
  async mounted() {
    //evento de login simultaneo
    await socket.on('is-logged', (id) => {
      const sessionLogin = localStorage.getItem('session_id')
      const currentUserId = id._id.user._id

      if (currentUserId === sessionLogin) {
        this.popupTimeoutWarn(`Você será deslogado devido a um novo acesso`)
        setTimeout(() => {
          localStorage.clear()
          this.$router.push('/login')
        }, 5000)
      }
    })
    //derrubando login do usuario
    await socket.on('remove-user', (id) => {
      const sessionId = localStorage.getItem('session_id')
      if(sessionId === id) {
        this.popupTimeoutLogout('Acesso excluido, você será deslogado!')
        setTimeout(() => {
          localStorage.clear()
          this.$router.push('/login')
        }, 4000)
      }
    })
  }
}
</script>

<style>
  @import './assets/base.css';
</style>