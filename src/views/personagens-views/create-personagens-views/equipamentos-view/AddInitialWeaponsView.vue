<script setup>
import { computed } from '@vue/reactivity'
import { onMounted, ref } from 'vue'
import ItemShopCard from '../../../../components/ItemShopCard.vue'

const props = defineProps({
  equipamentos: {
    type: Array,
    required: true
  },
  classe: {
    type: Object, 
    required: true
  }
})

const emit = defineEmits(['handle-add'])
const armasSimples = ref([])
const armasMarciais = ref([])

onMounted(() => {
  for(const equipamento of props.equipamentos) {
    if(equipamento.categoria === 'Arma') {
      if(equipamento.facilidadeDeUso === 'Simples') {
        armasSimples.value.push(equipamento)
      }

      if(equipamento.facilidadeDeUso === 'Marcial') {
        armasMarciais.value.push(equipamento)
      }
    }
  }
})

const armasSimplesSorted = computed(() => {
  return armasSimples.value.sort((a, b) => a.nome.localeCompare(b.nome))
})

const armasMarciaisSorted = computed(() => {
  return armasMarciais.value.sort((a, b) => a.nome.localeCompare(b.nome))
})

const handleAdd = (payload) => {
  emit('handle-add', payload)
}
</script>

<template>
  <h3>Você pode adicionar uma arma simples a sua escolha</h3>
  <div 
    v-for="arma in armasSimplesSorted"
    :key="arma.id"
  >
    <ItemShopCard 
      :equipamento="arma"
      no-quantity
      @handle-add="handleAdd" 
    />
  </div>
  <div v-if="classe.proficiencias.includes('Armas marciais')">
    <h3>Você pode adicionar uma arma marcial a sua escolha</h3>
    <div 
      v-for="arma in armasMarciaisSorted"
      :key="arma.id"
    >
      <ItemShopCard 
        :equipamento="arma"
        no-quantity
        @handle-add="handleAdd" 
      />
    </div>
  </div>
</template>