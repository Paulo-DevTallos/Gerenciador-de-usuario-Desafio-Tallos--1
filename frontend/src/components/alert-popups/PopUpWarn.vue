<template>
  <div id="box-modal">
    <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
    {{ info_message }}
  </div>
</template>

<script>
export default {
  name: 'PopUpAlert',
  props: {
    info_message: String,
  }
}
</script>

<style scoped>
  #box-modal {
    padding: 30px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 0 5px #121212a9;
    background-color: var(--primary-color);
    position: fixed;
    bottom: 30px;
    right: 25px;
    font-size: 15px;
    font-weight: 500;
    animation: roar .5s;
  }

  @keyframes roar {
    from {
      opacity: 0;
      visibility: hidden;
    }
    to {
      opacity: 1;
      visibility: visible;
    }
  }

  #box-modal svg {
    padding-right: 10px;
    font-size: 30px;
    color: #f3d700;
  }
</style>