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
  <div class="habilidades-modal">
    <div class="habilidades-modal-header">
      <h4 class="habilidades-modal-header-title">
        Habilidades de Raça
      </h4>
      <button 
        class="habilidades-modal-header-button"
        @click="handleCloseModal"
      >
        <i class="pi pi-times" />
      </button>
    </div>
    <div 
      v-for="(habilidade, index) in habilidadesModal"
      :key="index"
      class="habilidades-modal-habilidades"
    >
      <h4 class="habilidades-modal-title">
        {{ habilidade.nome }}
      </h4>
      <p class="habilidades-modal-description">
        {{ renderDescricaoCompleta(habilidade.descricao) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.habilidades-modal {
  width: 32rem;
  height: 36rem;
  padding: 1rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--tormenta-background);
}

.habilidades-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.habilidades-modal-header-title {
  margin: 0;
  font-family: 'Tormenta', sans-serif;
  font-size: 24px;
  color: var(--tormenta-red);
}

.habilidades-modal-header-button {
  border: none;
  background: none;
  cursor: pointer;
}

.habilidades-modal-habilidades {
  margin-bottom: 1rem;
}

.habilidades-modal-title {
  margin-top: 0;
  margin-bottom: 0;
  font-family: 'Tormenta', sans-serif;
  font-size: 20px;
  color: var(--tormenta-dark-red);
}

.habilidades-modal-description {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 14px;
}
</style>