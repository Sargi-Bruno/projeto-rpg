<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ChooseRacaViewVue from './create-personagens-views/ChooseRacaView.vue'
import ChooseClasseViewVue from './create-personagens-views/ChooseClasseView.vue'
import ChooseOrigemViewVue from './create-personagens-views/ChooseOrigemView.vue'
import ChooseDivindadeViewVue from './create-personagens-views/ChooseDivindadeView.vue'
import ChooseAtributosViewVue from './create-personagens-views/ChooseAtributosView.vue'
import ChooseEquipamentosViewVue from './create-personagens-views/ChooseEquipamentosView.vue'
import ToquesFinaisVue from './create-personagens-views/ToquesFinaisView.vue'

const setepperOptions = [
  { label: 'Raça', value: 0 },
  { label: 'Classe', value: 1 },
  { label: 'Origem', value: 2 },
  { label: 'Divindade', value: 3 },
  { label: 'Atributos', value: 4 },
  { label: 'Equipamentos', value: 5 },
  { label: 'Toques Finais', value: 6 }
]
const componentOptions = [
  ChooseRacaViewVue, 
  ChooseClasseViewVue, 
  ChooseOrigemViewVue, 
  ChooseDivindadeViewVue, 
  ChooseAtributosViewVue,
  ChooseEquipamentosViewVue,
  ToquesFinaisVue
  ]

const route = useRoute()
const personagemId = route.params.id
const currentStep = ref(0)

const handleNextStep = (nextStep) => {
  currentStep.value = nextStep
}
</script>

<template>
  <div class="content">
    <div class="navigation">
      <p-select-button
        v-model="currentStep"
        :options="setepperOptions"
        option-label="label"
        option-value="value"
      />
    </div>
    <KeepAlive>
      <component 
        :is="componentOptions[currentStep]" 
        :personagem-id="personagemId"
        @handle-next-step="handleNextStep"
      />
    </KeepAlive>
  </div>
</template>

<style scoped>
.navigation {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  margin-bottom: 4rem;
}
</style>