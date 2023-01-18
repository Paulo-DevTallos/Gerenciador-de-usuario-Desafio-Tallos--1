<template>
  <nav class="navigation">
    <span>Acesse a plataforma</span>
    <RouterLink to="/login">
      <button>Entrar</button>
    </RouterLink>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
}
</script>

<style>
  @import "../assets/components/navbar.css";
</style>