<template>
  <button @submit.prevent="$emit('submitUser')">{{ btn_title }}</button>
</template>

<script>
export default {
  name: 'ButtonSubmit',
  emits: ['submitUser'],
  props: {
    btn_title: String,
  }
}
</script>

<style scoped>
  button {
    width: 50%;
    height: 40px;
    cursor: pointer;
    border: 1px solid #009acc;
    background-color: #009acc;
    color: #fff;
    border-radius: 20px;
    margin-top: 30px;
    transition: .5s ease;
    filter: drop-shadow(-2px 2px 1px #006d9153);
    text-transform: uppercase;
  }

  button:hover {
    background-color: #006d91;
    border: 1px solid #006d91;
    filter: drop-shadow(-2px 2px 1px #006d9153);
  }
</style>

