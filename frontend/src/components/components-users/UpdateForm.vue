<template>
  <div>
    <form @submit.prevent="$emit('update-user', user)" :userData="user">
      <div>
        <font-awesome-icon :icon="['fas', 'file-pen']" />
      </div>
      <div>
        <input type="text" v-model="user.name" placeholder="Digite um nome de usuário">
        <input type="text" v-model="user.email" placeholder="Digite o e-mail do usuário">
        <select name="permission" v-model="user.rules">
          <option value="" disabled>--Selecione a permissão--</option>
          <option value="operador">Operador</option>
          <option value="admin">Admin</option>
        </select>
        <div class="">
          <button type="submit">
            {{ title }}
          </button>
          <button @click="$emit('close-modal-update')" id="color-btn">
            Cancelar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import PopUpOk from '../alert-popups/PopUpOk.vue';
export default {
  name: "UpdateForm",
  emits: ["update-user", "close-modal-update"],
  components: { PopUpOk },
  props: { 
    userData: Object 
  },
  data() {
    return {
      emits: ["update-user"],
      title: "Atualizar",
      message: 'teste',
      user: {
        name: this.userData.name,
        email: this.userData.email,
        rules: this.userData.user,
      },
    };
  },
  watch: {
    userData: {
      handler(userData) {     
        console.log(userData)       
        this.user.name = userData.name;
        this.user.email = userData.email;
        this.user.rules = userData.rules;
      },
      deep: true,
    }
  },
}
</script>

<style scoped>
  @import '../../assets/components/form-user.css';
</style>
