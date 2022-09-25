<script setup>
import { computed } from '@vue/reactivity'
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

const ESCUDO_LEVE_ID = 'W3nfPkvtxhxyUbjd7oGH'
const ARMADURA_DE_COURO_ID = 'DRUqAzFAWFnM8HoqAFPv'
const COURO_BATIDO_ID = 'vGGuZdxInWBk7lN84g04'
const GIBAO_DE_PELES_ID = 'pAfbkJjAtQwbGUCrysTD'
const BRUNEA_ID = 'QQ2lg03xvlwCXLsLyswn'

const armaduras = computed(() => {
  let armadurasArray = []
  let armadurasReturn = []

  if(props.classe.proficiencias.includes('Armaduras pesadas')) {
    armadurasArray = [ARMADURA_DE_COURO_ID, COURO_BATIDO_ID, GIBAO_DE_PELES_ID, BRUNEA_ID]
  } else {
    armadurasArray = [ARMADURA_DE_COURO_ID, COURO_BATIDO_ID, GIBAO_DE_PELES_ID]
  }

  for(const armadura of armadurasArray) {
    armadurasReturn.push(props.equipamentos.find(x => x.id === armadura))
  }

  return armadurasReturn.sort((a, b) => a.nome.localeCompare(b.nome))
})

const escudoLeve = computed(() => {
  return props.equipamentos.find(x => x.id === ESCUDO_LEVE_ID)
})

const handleAdd = (payload) => {
  emit('handle-add', payload)
}
</script>

<template>
  <h3>Você pode escolher entre uma das armaduras como sua armadura inicial</h3>
  <div 
    v-for="armadura in armaduras"
    :key="armadura.id"
  >
    <ItemShopCard 
      :equipamento="armadura"
      no-quantity
      @handle-add="handleAdd" 
    />
  </div>
  <div v-if="classe.proficiencias.includes('Escudos')">
    <h3>Você pode escolher começar com um escudo leve</h3>
    <ItemShopCard 
      :equipamento="escudoLeve"
      no-quantity
      @handle-add="handleAdd"
    />
  </div>
</template>