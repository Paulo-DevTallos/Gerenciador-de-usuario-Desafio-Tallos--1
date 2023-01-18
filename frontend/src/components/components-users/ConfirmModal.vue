<template>
  <div class="confirm-modal">
    <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
    <span>Deseja realmente excluir o usuário?</span>
    <div class="btn-actions">
      <button @click="$emit('delete-user')">Confirmar</button>
      <button @click="$emit('close-modal')">Cancelar</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ConfirmModal',
  emits: ['delete-user', 'close-modal'],
}
</script>

<style scoped>
  @import '../../assets/components/confirm-modal.css';
</style>