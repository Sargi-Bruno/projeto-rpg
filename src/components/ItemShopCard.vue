<script setup>
import { ref } from 'vue'
import ItemCardContent from './ItemCardContent.vue'

const props = defineProps({
  equipamento: {
    type: Object,
    required: true
  },
  noQuantity: {
    type: Boolean
  }
})

const emit = defineEmits(['handle-add'])

const quantidade = ref(1);

const handleAdd = () => {
  const payload = {
    equipamento: props.equipamento,
    quantidade: quantidade.value
  }
  emit('handle-add', payload)
  quantidade.value = 1
}
</script>

<template>
  <div class="card">
    <ItemCardContent :equipamento="equipamento" />
    <div class="card-footer">
      <div v-if="!noQuantity">
        <div class="quantity-container">
          <label for="quantidade">Quantidade:</label>
          <p-input-number 
            id="quantidade"
            v-model="quantidade"
          />
        </div>
      </div>
      <p-button
        label="Adicionar"
        @click="handleAdd"
      />
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--tormenta-background);
}
.card-footer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid var(--tormenta-dark-red);
  margin-top: 1rem;
}
.card-footer button {
  margin-top: 1rem;
  margin-left: 1rem;
}
.quantity-container {
  margin-top:  1rem;
}
.quantity-container label {
  margin-right: .5rem;
}
</style>