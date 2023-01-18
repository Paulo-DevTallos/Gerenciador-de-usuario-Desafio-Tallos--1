<template>
  <header class="header-user">
      <div class="useful-links">
        <a href="https://tallos.com.br/blog/" target="_blank">
          Tallos blog
        </a>
        <a href="https://help.tallos.com.br/" target="_blank">
          FAQ
        </a>
      </div>
      <div>
        <RouterLink to="/painel">
          <img src="/img/tallos-logo-(1).png" alt="botão do menu">
        </RouterLink>
      </div>
      <div @click="toggleCardInfo" class="user-field">
        <p>{{ $store.state.user.name }}</p>
        <div class="user-icon">
          <img src="/img/user.svg" class="icon" alt="icone do usuário">
        </div> 
        <CardInfo v-if="status"/>
      </div>
  </header>
</template>

<script>
import CardInfo from './CardInfo.vue';
export default {
    name: "HeaderUser",
    data() {
      return {
        status: null,
      }
    },
    methods: {
      toggleCardInfo() {
        this.status = !this.status
      }
    },
    components: { CardInfo }
}
</script>

<style scoped>
  @import '../../assets/components/header-user.css';
</style>