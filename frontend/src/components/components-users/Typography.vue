<template>
  <div class="title">
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Typography',
  props: {
    title: String,
  }
}
</script>

<style scoped>
  @import '../../assets/components/typography.css';
</style>