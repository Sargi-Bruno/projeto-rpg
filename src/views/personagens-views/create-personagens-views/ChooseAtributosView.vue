<script setup>
import { onMounted, ref } from 'vue'
import { _getDoc, _updateDoc } from '../../../firebase/firestore'
import { DiceRoll } from '@dice-roller/rpg-dice-roller'

const props = defineProps({
  personagemId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['handle-next-step'])

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
const atributosPontos = ref({
  forca: 10,
  destreza: 10,
  constituicao: 10,
  inteligencia: 10,
  sabedoria: 10,
  carisma: 10,
})
const pontos = ref(20)
const atributosDropdownDisabled = ref(true)
const isAtributosChosen = ref(false)

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

const handleRollDices = () => {
  resultRoll.value = []

  for(let i = 0; i < 6; i++) {
    const roll = new DiceRoll('4d6d1')
    resultRoll.value.push(roll.total)
  }

  atributosDropdownDisabled.value = false
}

const handleAddAtributoGerado = (index) => {
  personagem.value.atributos[atributosSelecionados.value[index]] = resultRoll.value[index]
}

const handleRemoveAtributo = (atributo) => {
  if(atributosPontos.value[atributo] === 8) return
  if(atributosPontos.value[atributo] >= 17) {
    atributosPontos.value[atributo]--
    pontos.value = pontos.value + 3
    return
  }
  if(atributosPontos.value[atributo] <= 16 && atributosPontos.value[atributo] > 14) {
    atributosPontos.value[atributo]--
    pontos.value = pontos.value + 2
    return
  }
  if(atributosPontos.value[atributo] <= 14 && atributosPontos.value[atributo] > 8) {
    atributosPontos.value[atributo]--
    pontos.value = pontos.value + 1
  }
}

const handleAddAtributo = (atributo) => {
  if(pontos.value === 0) return
  if(atributosPontos.value[atributo] === 18) return
  if(atributosPontos.value[atributo] >= 16 && atributosPontos.value[atributo] <= 17) {
    if(pontos.value < 3) return
    atributosPontos.value[atributo]++
    pontos.value = pontos.value - 3
    return
  }
  if(atributosPontos.value[atributo] === 14 || atributosPontos.value[atributo] === 15) {
    if(pontos.value < 2) return
    atributosPontos.value[atributo]++
    pontos.value = pontos.value - 2
    return
  }
  if(atributosPontos.value[atributo] >= 8 && atributosPontos.value[atributo] < 14) {
    if(pontos.value < 1) return
    atributosPontos.value[atributo]++
    pontos.value = pontos.value - 1
    return
  }
}

const handleApplyAtributosPontos = () => {
  personagem.value.atributos.forca = atributosPontos.value.forca
  personagem.value.atributos.destreza = atributosPontos.value.destreza
  personagem.value.atributos.constituicao = atributosPontos.value.constituicao
  personagem.value.atributos.inteligencia = atributosPontos.value.inteligencia
  personagem.value.atributos.sabedoria = atributosPontos.value.sabedoria
  personagem.value.atributos.carisma = atributosPontos.value.carisma
  isAtributosChosen.value = true
}

const handleApplyAtributosGerados = () => {
  isAtributosChosen.value = true
}

const handleSaveAtributos = async () => {
  _updateDoc(personagem.value)
    .then(emit('handle-next-step', 5))
}
</script>

<template>
  <h1>Definir Atributos</h1>
  <p-select-button
    v-model="tipoGeracaoAtributos"
    :options="geracaoAtributosOptions"
    option-label="label"
    option-value="value"
  />
  <div v-if="tipoGeracaoAtributos === 'dados'">
    <p-button 
      label="Rolar dados"
      @click="handleRollDices"
    />
    <label for="atributo1">{{ resultRoll[0] }}</label>
    <p-dropdown 
      id="atributo1"
      v-model="atributosSelecionados[0]"
      :options="atributosOptions"
      option-label="label"
      option-value="value"
      option-disabled="disabled"
      :disabled="atributosDropdownDisabled"
      @change="handleAddAtributoGerado(0)"
    />
    <label for="atributo2">{{ resultRoll[1] }}</label>
    <p-dropdown 
      id="atributo2"
      v-model="atributosSelecionados[1]"
      :options="atributosOptions"
      option-label="label"
      option-value="value"
      option-disabled="disabled"
      :disabled="atributosDropdownDisabled"
      @change="handleAddAtributoGerado(1)"
    />
    <label for="atributo3">{{ resultRoll[2] }}</label>
    <p-dropdown 
      id="atributo3"
      v-model="atributosSelecionados[2]"
      :options="atributosOptions"
      option-label="label"
      option-value="value"
      option-disabled="disabled"
      :disabled="atributosDropdownDisabled"
      @change="handleAddAtributoGerado(2)"
    />
    <label for="atributo4">{{ resultRoll[3] }}</label>
    <p-dropdown 
      id="atributo4"
      v-model="atributosSelecionados[3]"
      :options="atributosOptions"
      option-label="label"
      option-value="value"
      option-disabled="disabled"
      :disabled="atributosDropdownDisabled"
      @change="handleAddAtributoGerado(3)"
    />
    <label for="atributo5">{{ resultRoll[4] }}</label>
    <p-dropdown 
      id="atributo5"
      v-model="atributosSelecionados[4]"
      :options="atributosOptions"
      option-label="label"
      option-value="value"
      option-disabled="disabled"
      :disabled="atributosDropdownDisabled"
      @change="handleAddAtributoGerado(4)"
    />
    <label for="atributo6">{{ resultRoll[5] }}</label>
    <p-dropdown 
      id="atributo6"
      v-model="atributosSelecionados[5]"
      :options="atributosOptions"
      option-label="label"
      option-value="value"
      option-disabled="disabled"
      :disabled="atributosDropdownDisabled"
      @change="handleAddAtributoGerado(5)"
    />
    <p-button 
      label="Aplicar"
      @click="handleApplyAtributosGerados"
    />
  </div>
  <div v-if="tipoGeracaoAtributos === 'pontos'">
    <h5>Pontos</h5>
    {{ pontos }}
    <div>
      <h5>Força</h5>
      <p-button 
        label="-"
        :disabled="atributosPontos.forca === 8"
        @click="handleRemoveAtributo('forca')"
      />
      <div>{{ atributosPontos.forca }}</div>
      <!-- Talvez fazer uma funcao para calcular melhor se o botão de adicionar esta disabled -->
      <p-button 
        label="+"
        :disabled="atributosPontos.forca === 18 || pontos === 0" 
        @click="handleAddAtributo('forca')"
      />
    </div>
    <div>
      <h5>Destreza</h5>
      <p-button 
        label="-"
        :disabled="atributosPontos.destreza === 8"
        @click="handleRemoveAtributo('destreza')"
      />
      <div>{{ atributosPontos.destreza }}</div>
      <p-button 
        label="+"
        :disabled="atributosPontos.destreza === 18 || pontos === 0"
        @click="handleAddAtributo('destreza')"
      />
    </div>
    <div>
      <h5>Constituição</h5>
      <p-button 
        label="-"
        :disabled="atributosPontos.constituicao === 8"
        @click="handleRemoveAtributo('constituicao')"
      />
      <div>{{ atributosPontos.constituicao }}</div>
      <p-button 
        label="+"
        :disabled="atributosPontos.constituicao === 18 || pontos === 0"
        @click="handleAddAtributo('constituicao')"
      />
    </div>
    <div>
      <h5>Inteligência</h5>
      <p-button 
        label="-"
        :disabled="atributosPontos.inteligencia === 8"
        @click="handleRemoveAtributo('inteligencia')"
      />
      <div>{{ atributosPontos.inteligencia }}</div>
      <p-button 
        label="+"
        :disabled="atributosPontos.inteligencia === 18 || pontos === 0"
        @click="handleAddAtributo('inteligencia')"
      />
    </div>
    <div>
      <h5>Sabedoria</h5>
      <p-button 
        label="-"
        :disabled="atributosPontos.sabedoria === 8"
        @click="handleRemoveAtributo('sabedoria')"
      />
      <div>{{ atributosPontos.sabedoria }}</div>
      <p-button 
        label="+"
        :disabled="atributosPontos.sabedoria === 18 || pontos === 0"
        @click="handleAddAtributo('sabedoria')"
      />
    </div>
    <div>
      <h5>Carisma</h5>
      <p-button 
        label="-"
        :disabled="atributosPontos.carisma === 8"
        @click="handleRemoveAtributo('carisma')"
      />
      <div>{{ atributosPontos.carisma }}</div>
      <p-button 
        label="+"
        :disabled="atributosPontos.carisma === 18 || pontos === 0"
        @click="handleAddAtributo('carisma')"
      />
    </div>
    <p-button 
      label="Aplicar"
      @click="handleApplyAtributosPontos"
    />
  </div>
  <div v-if="isAtributosChosen">
    <h3>Atributos</h3>
    <h5>Força</h5>
    {{ personagem.atributos.forca }}
    <h5>Destreza</h5>
    {{ personagem.atributos.destreza }}
    <h5>Constituição</h5>
    {{ personagem.atributos.constituicao }}
    <h5>Inteligência</h5>
    {{ personagem.atributos.inteligencia }}
    <h5>Sabedoria</h5>
    {{ personagem.atributos.sabedoria }}
    <h5>Carisma</h5>
    {{ personagem.atributos.carisma }}
    <p-button
      label="Salvar"
      @click="handleSaveAtributos"
    />
  </div>
</template>