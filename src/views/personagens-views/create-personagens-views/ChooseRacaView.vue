<script setup>
import { onMounted, ref } from 'vue'
import { _getDocs, _getDoc, _updateDoc } from '../../../firebase/firestore'

const props = defineProps({
  personagemId: String
})

const emit = defineEmits(['handleNextStep'])

const atributosOptions = [
  {label: 'Força', value: 'forca'},
  {label: 'Destreza', value: 'destreza'},
  {label: 'Constituição', value: 'constituicao'},
  {label: 'Inteligência', value: 'inteligencia'},
  {label: 'Sabedoria', value: 'sabedoria'},
  {label: 'Carisma', value: 'carisma'},
]

const personagem = ref()
const racas = ref([])
const isRacaChosen = ref(false)
// const isRacaFinished = ref(false)

onMounted(async () => {
  racas.value = await _getDocs('racas')
  personagem.value = await _getDoc('personagens', props.personagemId)
})

const chooseRaca = (raca) => {
  personagem.value.raca = raca

  if(raca.tipoAtributos === 'dinamico') personagem.value.raca.atributosDinamicoEscolhidos = []
  if(raca.tipoAtributos === 'variante') personagem.value.raca.varianteEscolhida = ''

  isRacaChosen.value = true
}

const handleAtributosDinamico = () => {
  if(personagem.value.raca.atributosDinamicoEscolhidos.length > 3) {
    personagem.value.raca.atributosDinamicoEscolhidos.shift()
  }
}

const handleChangeRaca = () => {
  isRacaChosen.value = false
  personagem.value.raca = {}
}

const handleSavePersonagem = async () => {
  _updateDoc(personagem.value)
    .then(emit('handleNextStep', 1))
}
</script>

<template>
  <h1>Escolher Raça</h1>
  <div v-if="!isRacaChosen">
    <div v-for="raca in racas" :key="raca.id">
      <p-card>
        <template #title>
          {{raca.nome}}
        </template>
        <template #content>
          <div v-html="raca.descricao"></div>
        </template>
        <template #footer>
          <p-button
            label="Escolher"
            @click="chooseRaca(raca)"
          />
        </template>
      </p-card>
    </div>
  </div>
  <div v-else>
    <p-button
      label="Escolher outra raça"
      @click="handleChangeRaca"
    />
    <div>
      <p-card>
        <template #title>
          {{personagem.raca.nome}}
        </template>
        <template #content>
          <div v-html="personagem.raca.descricao"></div>
        </template>
      </p-card>
      <div v-if="personagem.raca.tipoAtributos === 'fixo'">
        <h3>Atributos fixos</h3>
      </div>
      <div v-if="personagem.raca.tipoAtributos === 'dinamico'">
        <h3>
          +2 em três atributos diferentes 
          <span v-if="personagem.raca.excecaoAtributo">
            (Exceto {{personagem.raca.excecaoAtributo}}), {{personagem.raca.excecaoAtributo}} -2. 
          </span>
        </h3>
        <p-select-button
          v-model="personagem.raca.atributosDinamicoEscolhidos"
          @click="handleAtributosDinamico"
          :options="atributosOptions"
          optionLabel="label"
          optionValue="value"
          multiple
        />  
      </div>
      <div v-if="personagem.raca.tipoAtributos === 'variante'">
        <h3>Escolher variante</h3>
        <p-select-button
          v-model="personagem.raca.varianteEscolhida"
          :options="personagem.raca.variantes"
        />
        {{personagem.raca.varianteEscolhida}}
      </div>
    </div>
    <p-button
      label="Salvar"
      @click="handleSavePersonagem"
    />
  </div>
</template>