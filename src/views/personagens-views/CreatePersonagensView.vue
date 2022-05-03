<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ChooseRacaViewVue from './create-personagens-views/ChooseRacaView.vue'
import ChooseClasseViewVue from './create-personagens-views/ChooseClasseView.vue'
import ChooseOrigemViewVue from './create-personagens-views/ChooseOrigemView.vue'
import ChooseDivindadeViewVue from './create-personagens-views/ChooseDivindadeView.vue'
import ChooseAtributosViewVue from './create-personagens-views/ChooseAtributosView.vue'
import ChoosePericiasViewVue from './create-personagens-views/ChoosePericiasView.vue'
import ChooseEquipamentosViewVue from './create-personagens-views/ChooseEquipamentosView.vue'
import ChooseMagiasViewVue from './create-personagens-views/ChooseMagiasView.vue'
import ToquesFinaisVue from './create-personagens-views/ToquesFinaisView.vue'

const route = useRoute()
const personagemId = route.params.id

const setepperOptions = [
  { label: 'Raça', value: 0 },
  { label: 'Classe', value: 1 },
  { label: 'Origem', value: 2 },
  { label: 'Divindade', value: 3 },
  { label: 'Atributos', value: 4 },
  { label: 'Perícias', value: 5 },
  { label: 'Equipamentos', value: 6 },
  { label: 'Magias', value: 7 },
  { label: 'Toques Finais', value: 8 }
]
const componentOptions = [
  ChooseRacaViewVue, 
  ChooseClasseViewVue, 
  ChooseOrigemViewVue, 
  ChooseDivindadeViewVue, 
  ChooseAtributosViewVue, 
  ChoosePericiasViewVue,
  ChooseEquipamentosViewVue,
  ChooseMagiasViewVue,
  ToquesFinaisVue
  ]
const currentStep = ref(0)

const handleNextStep = (nextStep) => {
  currentStep.value = nextStep
}
</script>


<template>
  <div>
    <h1>Criar personagem</h1>
    <p-select-button
      v-model="currentStep"
      :options="setepperOptions"
      optionLabel="label"
      optionValue="value"
    />
    <component 
      :is="componentOptions[currentStep]" 
      :personagemId="personagemId"
      @handleNextStep="handleNextStep"
    />
  </div>
</template>