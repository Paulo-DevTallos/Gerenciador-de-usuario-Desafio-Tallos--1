<template>
  <main class="main-container">
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: 'Template',
}
</script>

<style scoped>
  .main-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 10px 100px;
    min-height: 78vh;
    background-color: var(--primary-main-bg);
  }

  @media(max-width: 1024px) {
    .main-container {
      padding: 10px 20px;
    }
  }

  @media(max-width: 768px) {
    .main-container {
      padding: 0; 
    }
  }
</style>