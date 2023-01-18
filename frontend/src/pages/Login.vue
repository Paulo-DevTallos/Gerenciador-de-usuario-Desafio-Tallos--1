import { mapGetters } from 'vuex';
import { mapGetters } from 'vuex';
<template>
  <div class="container-login">
    <div class="banner"> 
    </div>
    <div class="login-container">
      <form @submit.prevent="handleSubmitLogin">
        <div class="logo-container">
          <img src="/img/tallos-logo-(1).png" alt="Logo Tallos">
        </div>
        <div>
          <input type="email" v-model="user.email" placeholder="Digite seu e-mail">
          <div class="reveling-password">
            <input :type="inputType" v-model="user.password" placeholder="Digite sua senha">  
            <span @click="togglePassword">
              <font-awesome-icon :icon="['fas', 'eye']" v-if="isPassword"/>
              <font-awesome-icon :icon="['fas', 'eye-slash']" v-else/>
            </span>
          </div>
          <div>
          </div>
          <ButtonSubmit 
            @submitUser="handleSubmitLogin"
            :btn_title="title"
          />
          <p>Desafio Tallos gerenciador de funcionários &copy;2022</p>
        </div>
      </form>
      <PopUpAlert 
        :info_message="message"
        v-if="hiddenPopup"/>
    </div>
  </div>
</template>

<script>
import PopUpAlert from '../components/alert-popups/PopUpAlert.vue';
import ButtonSubmit from '../components/components-users/ButtonSubmit.vue';

export default {
  name: "About",
  components: {
    PopUpAlert,
    ButtonSubmit
  },
  data() {
    return {
      message: '',
      hiddenPopup: false,
      title: 'Login',
      inputType: 'password',
      user: {
        email: "",
        password: "",
      }
    };
  },
  computed: {
    isPassword() {
      return this.inputType === 'password'
    }
  },
  methods: {
    togglePassword() {
      this.inputType = this.isPassword ? 'text' : 'password'
    },
    popupTimeout(msg) {
      this.hiddenPopup = true
      this.message = msg
      setTimeout(() => {
        this.hiddenPopup = false
      }, 3000)
    },
    async handleSubmitLogin() {
      if(this.user.email === '' && this.user.password === '') {
        this.popupTimeout('Digite um usuário válido')
      }
      else if(this.user.email === '') {
        this.popupTimeout('Precisamos identificá-lo, digite um e-mail válido')
      }
      else if(this.user.password === '') {
        this.popupTimeout('Digite uma senha válida!')
      } 
      else {
        await this.$store.dispatch('handleSubmitLogin', this.user)
        .catch(Error => {
          console.error(Error, 'dados incorretos')
          this.popupTimeout('Seus dados estão incorretos!')
        })

        this.$router.push('/painel')
      } 
    }
  },
}
</script>

<style scoped>
  @import '../assets/login.css';
</style>