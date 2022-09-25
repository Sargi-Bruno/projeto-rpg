<script setup>
import { computed } from '@vue/reactivity'
import ItemShopCard from '../../../../components/ItemShopCard.vue'

const props = defineProps({
  equipamentos: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['handle-add'])

const equipamentosSorted = computed(() => {
  const aux = [...props.equipamentos]
  return aux.sort((a, b) => a.nome.localeCompare(b.nome))
})

const handleAdd = (payload) => {
  emit('handle-add', payload)
}
</script>

<template>
  <div 
    v-for="equipamento in equipamentosSorted"
    :key="equipamento.id"
  >
    <ItemShopCard 
      :equipamento="equipamento" 
      @handle-add="handleAdd" 
    />
  </div>
</template>