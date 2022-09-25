<script setup>
import { computed } from '@vue/reactivity'
import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import DividerRedVue from '../../../../components/DividerRed.vue';
import ItemsInventory from '../../../../components/ItemsInventory.vue'

const props = defineProps({
  personagem: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['handle-change-tibares', 'handle-roll-tibares', 'handle-change-quantity', 'handle-remove'])

const handleChangeTibares = (e) => {
  emit('handle-change-tibares', e.value)
}

const handleRollTibares = () => {
  const roll = new DiceRoll('4d6')
  emit('handle-roll-tibares', roll.total)
}

const handleChangeQuantity = (payload) => {
  emit('handle-change-quantity', payload)
}

const handleRemove = (id) => {
  emit('handle-remove', id)
}

const inventarioSorted = computed(() => {
  const aux = [...props.personagem.inventario]
  return aux.sort((a, b) => a.nome.localeCompare(b.nome))
})
</script>

<template>
  <div class="my-inventory">
    <h1 class="page-title">
      Meu Inventário
    </h1>
    <DividerRedVue />
    <div class="inventory-list">
      <div class="tibar-container">
        <h3>T$</h3>
        <p-input-number 
          :value="personagem.tibares.prata" 
          @input="handleChangeTibares"
        />
        <p-button
          label="Rolar novamente (4d6)"
          @click="handleRollTibares"
        />
      </div>
      <div 
        v-for="equipamento in inventarioSorted"
        :key="equipamento.id"
      >
        <ItemsInventory 
          :equipamento="equipamento"
          @handle-change-quantity="handleChangeQuantity"
          @handle-remove="handleRemove"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.inventory-list {
  margin-top: 1rem;
}
.tibar-container {
  display: flex;
  align-items: center;
}

.tibar-container h3 {
  margin-right: .25rem;
}

.tibar-container button {
  margin-left: 1rem;
}
</style>