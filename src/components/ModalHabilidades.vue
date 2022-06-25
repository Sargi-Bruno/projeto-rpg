<script setup>
import { renderDescricaoCompleta } from '@/utils/viewFunctions'

defineProps({
  habilidadesModal: {
    type: Array,
    default() {
      return []
    }
  }
})

const emit = defineEmits(['handleClose'])

const handleCloseModal = () => {
  emit('handleClose')
}
</script>

<template>
  <div class="modal">
    <div class="modal-header">
      <h4 class="modal-header-title">
        Habilidades de Raça
      </h4>
      <button 
        class="modal-header-button"
        @click="handleCloseModal"
      >
        <i class="pi pi-times" />
      </button>
    </div>
    <div 
      v-for="(habilidade, index) in habilidadesModal"
      :key="index"
      class="modal-habilidades"
    >
      <h4 class="modal-title">
        {{ habilidade.nome }}
      </h4>
      <p class="modal-description">
        {{ renderDescricaoCompleta(habilidade.descricao) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.modal {
  width: 32rem;
  height: 36rem;
  padding: 1rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--tormenta-background);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.modal-header-title {
  margin: 0;
  font-family: 'Tormenta', sans-serif;
  font-size: 24px;
  color: var(--tormenta-red);
}

.modal-header-button {
  border: none;
  background: none;
  cursor: pointer;
}

.modal-habilidades {
  margin-bottom: 1rem;
}

.modal-title {
  margin-top: 0;
  margin-bottom: 0;
  font-family: 'Tormenta', sans-serif;
  font-size: 20px;
  color: var(--tormenta-dark-red);
}

.modal-description {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 14px;
}
</style>