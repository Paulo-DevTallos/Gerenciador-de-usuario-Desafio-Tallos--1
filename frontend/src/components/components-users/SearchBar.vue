<template>
  <div class="user-avaliable">
    <form @submit.prevent="finduser">
      <input type="text" v-model="email" placeholder="Digite um e-mail de usuário">
      <div class="btn-container">
        <button type="submit">Listar usuario</button>
        <button @click="cleanAndUpdateList" id="btn-list-all">Listar todos</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      email: '',
      //emptyInput: false
    }
  },
  methods: {
    finduser() {
      this.emitter.emit('finduser', this.email)
    },
    cleanAndUpdateList() {
      this.email = ''
      this.emitter.emit('cleanAndUpdateList', this.email)
    }
  }
}
</script>

<style scoped>
.user-avaliable input {
  padding: 3px 15px;
  border: 1px solid gray;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.user-avaliable .btn-container {
  display: inline;
}

.user-avaliable button {
  padding: 4px 10px;
  background-color: #009acc;
  color: #fff;
  border: none;
  cursor: pointer;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

#btn-list-all {
  border-radius: 5px;
  margin: 0 5px;
}

@media(max-width: 510px) {
  .user-avaliable input {
    width: 100%;
    border-radius: 5px;
  }
  .user-avaliable .btn-container {
    display: block;
    margin: 5px 0;
  }

  .user-avaliable .btn-container button:first-child {
    border-radius: 5px;
  }
}
</style>