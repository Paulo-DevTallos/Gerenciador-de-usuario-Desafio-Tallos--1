<template>
  <form @submit.prevent="handleSubmitUser">
    <div>
      <font-awesome-icon :icon="['fas', 'user-plus']" />
    </div>
    <div>
      <input type="text" v-model="user.name" placeholder="Digite um nome de usuário">
      <input type="text" v-model="user.email" placeholder="Digite o e-mail do usuário">
      <select name="permission" v-model="user.rules">
        <option value="" disabled>--Selecione a permissão--</option>
        <option value="operador">Operador</option>
        <option value="admin">Admin</option>
      </select>
      <input type="password" v-model="user.password" placeholder="Digite uma senha para o usuário">
      <button type="submit">
        {{ title }}
      </button>
    </div>
    <PopUpAlert 
      :info_message="message"
      v-if="hiddenPopupAlert"
    />
  </form>
</template>

<script>
import PopUpAlert from '../alert-popups/PopUpAlert.vue';
export default {
  name: "FormUserData",
  components: { PopUpAlert },
  data() {
    return {
      title: "Cadastrar",
      hiddenPopupAlert: false,
      user: {
        name: "",
        email: "",
        rules: "",
        password: "",
      }
    };
  },
  methods: {
    popupTimeoutAlert(msg) {
      this.hiddenPopupAlert = true
      this.message = msg
      setTimeout(() => {
        this.hiddenPopupAlert = false
      }, 3000)
    },
    //submit event
    async handleSubmitUser() {
      if (this.user.name === "") {
        this.popupTimeoutAlert('Digite um nome para o usuário!')
      }
      else if (this.user.email === "") {
        this.popupTimeoutAlert('Digite um e-mail para o usuário!')
      }
      else if (this.user.rules === "") {
        this.popupTimeoutAlert('Digite um departamento para o usuário!')
      }
      else if (this.user.password === "") {
        this.popupTimeoutAlert('Digite uma senha para o usuário!')
      }
      else {
        await this.emitter.emit("handleSubmitUser", this.user);
        this.user.name = "";
        this.user.email = "";
        this.user.rules = "";
        this.user.password = "";
      }
    }
  },
}
</script>

<style scoped>
  @import '../../assets/components/form-user.css';
</style>