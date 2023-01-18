<template>
  <Header />
    <main>
      <div class="content-home">
        <div class="size-content">
          <h1>Conheça a plataforma que nasceu para impulsionar o seu negócio!</h1>
        </div>
        <div class="size-content">
          <img src="img/home-page.png" alt="home page image">
        </div>
      </div>
    </main>
  <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Template from '../components/components-users/Template.vue';

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Template
  },
}
</script>

<style scoped>
  @import '../assets/home.css';
</style>