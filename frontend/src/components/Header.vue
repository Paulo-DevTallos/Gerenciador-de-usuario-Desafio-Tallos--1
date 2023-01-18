<template>
  <header class="header">
    <RouterLink to="/">
      <img src="img/tallos-logo.png" alt="Tallos logo">
    </RouterLink>
    <NavBar />
  </header>
</template>

<script>
import NavBar from './NavBar.vue'

export default {
  name: "header",
  components: { 
    NavBar, 
  }
}
</script>

<style scoped>
  @import '../assets/components/header.css';
</style>