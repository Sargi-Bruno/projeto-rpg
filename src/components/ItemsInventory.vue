<script setup>
import ItemCardContent from './ItemCardContent.vue'

const props = defineProps ({
  equipamento: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['handle-change-quantity', 'handle-remove'])

const handleChangeQuantity = (e) => {
  const payload = {
    quantidade: e.value,
    id: props.equipamento.id
  }
  emit('handle-change-quantity', payload)
}

const handleRemove = () => {
  emit('handle-remove', props.equipamento.id)
}
</script>

<template>
  <div class="card">
    <ItemCardContent :equipamento="equipamento" />
    <div class="card-footer">
      <div class="quantity-container">
        <label for="quantidade">Quantidade:</label>
        <p-input-number 
          id="quantidade"
          :value="equipamento.quantidade"
          @input="handleChangeQuantity"
        />
      </div>
      <p-button
        label="Remover"
        class="p-button-text p-button-danger"
        @click="handleRemove"
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