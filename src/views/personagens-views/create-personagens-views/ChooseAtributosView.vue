<script setup>
import { onMounted, ref } from 'vue'
import { _getDoc } from '../../../firebase/firestore'
import { DiceRoll } from '@dice-roller/rpg-dice-roller'

const props = defineProps({
  personagemId: String
})

const emit = defineEmits(['handleNextStep'])

const geracaoAtributosOptions = [
  {label: 'Geração por Dados', value: 'dados'},
  {label: 'Geração por Pontos', value: 'pontos'}
]

const atributosOptions = ref([
  { label: 'Força', value: 'forca', disabled: false },
  { label: 'Destreza', value: 'destreza', disabled: false },
  { label: 'Constituição', value: 'constituicao', disabled: false },
  { label: 'Inteligência', value: 'inteligencia', disabled: false },
  { label: 'Sabedoria', value: 'sabedoria', disabled: false },
  { label: 'Carisma', value: 'carisma', disabled: false }
])

const personagem = ref()
const tipoGeracaoAtributos = ref('dados') //dados ou pontos
const resultRoll = ref([])
const atributosSelecionados = ref([])
const atributosDropdownDisabled = ref(true)

const handleRollDices = () => {
  resultRoll.value = []

  for(let i = 0; i < 6; i++) {
    const roll = new DiceRoll('4d6d1')
    resultRoll.value.push(roll.total)
  }

  atributosDropdownDisabled.value = false
}

const handleAddValorAtributo = (index) => {
  personagem.value.atributos[atributosSelecionados.value[index]] = resultRoll.value[index]

  console.log(personagem.value.atributos)
}

onMounted(async () => {
  personagem.value = await _getDoc('personagens', props.personagemId)
  
  personagem.value.atributos = {
    forca: 0,
    destreza: 0,
    constituicao: 0,
    inteligencia: 0,
    sabedoria: 0,
    carisma: 0,
  }
})
</script>

<template>
  <h1>Definir Atributos</h1>
  <p-select-button
    v-model="tipoGeracaoAtributos"
    :options="geracaoAtributosOptions"
    optionLabel="label"
    optionValue="value"
  />
  <div v-if="tipoGeracaoAtributos === 'dados'">
    <p-button 
      label="Rolar dados"
      @click="handleRollDices"
    />
    <label for="atributo1">{{resultRoll[0]}}</label>
    <p-dropdown 
      id="atributo1"
      v-model="atributosSelecionados[0]"
      :options="atributosOptions"
      optionLabel="label"
      optionValue="value"
      optionDisabled="disabled"
      :disabled="atributosDropdownDisabled"
      @change="handleAddValorAtributo(0)"
    />
    <label for="atributo2">{{resultRoll[1]}}</label>
    <p-dropdown 
      id="atributo2"
      v-model="atributosSelecionados[1]"
      :options="atributosOptions"
      optionLabel="label"
      optionValue="value"
      optionDisabled="disabled"
      :disabled="atributosDropdownDisabled"
      @change="handleAddValorAtributo(1)"
    />
    <label for="atributo3">{{resultRoll[2]}}</label>
    <p-dropdown 
      id="atributo3"
      v-model="atributosSelecionados[2]"
      :options="atributosOptions"
      optionLabel="label"
      optionValue="value"
      optionDisabled="disabled"
      :disabled="atributosDropdownDisabled"
      @change="handleAddValorAtributo(2)"
    />
    <label for="atributo4">{{resultRoll[3]}}</label>
    <p-dropdown 
      id="atributo4"
      v-model="atributosSelecionados[3]"
      :options="atributosOptions"
      optionLabel="label"
      optionValue="value"
      optionDisabled="disabled"
      :disabled="atributosDropdownDisabled"
      @change="handleAddValorAtributo(3)"
    />
    <label for="atributo5">{{resultRoll[4]}}</label>
    <p-dropdown 
      id="atributo5"
      v-model="atributosSelecionados[4]"
      :options="atributosOptions"
      optionLabel="label"
      optionValue="value"
      optionDisabled="disabled"
      :disabled="atributosDropdownDisabled"
      @change="handleAddValorAtributo(4)"
    />
    <label for="atributo6">{{resultRoll[5]}}</label>
    <p-dropdown 
      id="atributo6"
      v-model="atributosSelecionados[5]"
      :options="atributosOptions"
      optionLabel="label"
      optionValue="value"
      optionDisabled="disabled"
      :disabled="atributosDropdownDisabled"
      @change="handleAddValorAtributo(5)"
    />
  </div>
  <div v-if="tipoGeracaoAtributos === 'pontos'">

  </div>
</template>