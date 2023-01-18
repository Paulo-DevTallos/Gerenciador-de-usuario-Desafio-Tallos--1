<template>
  <footer class="footer-user">
    Usuário <strong> {{ $store.state.user.email }} </strong> logado
  </footer>
</template>

<script>
export default {
  name: 'FooterUser',
}
</script>

<style scoped>
  @import '../../assets/components/footer-user.css';
</style>