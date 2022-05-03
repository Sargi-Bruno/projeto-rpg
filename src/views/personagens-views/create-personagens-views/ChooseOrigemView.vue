<script setup>
import { onMounted, ref } from 'vue'
import { _getDocs, _getDoc, _updateDoc } from '../../../firebase/firestore'

const props = defineProps({
  personagemId: String
})

const emit = defineEmits(['handleNextStep'])

const personagem = ref()
const origens = ref([])
const isOrigemChosen = ref(false)
// const isOrigemFinished = ref(false)

onMounted(async () => {
  origens.value = await _getDocs('origens')
  personagem.value = await _getDoc('personagens', props.personagemId)
})

const chooseOrigem = (origem) => {
  isOrigemChosen.value = true
  personagem.value.origem = origem
}

const handleChangeOrigem = () => {
  isOrigemChosen.value = false
  personagem.value.origem = {}
}

const handleSavePersonagem = async () => {
  _updateDoc(personagem.value)
    .then(emit('handleNextStep', 3))
}
</script>

<template>
  <h1>Escolher Origem</h1>
  <div v-if="!isOrigemChosen">
    <div v-for="origem in origens" :key="origem.id">
      <p-card>
        <template #title>
          {{origem.nome}}
        </template>
        <template #content>
          <div v-html="origem.descricao"></div>
        </template>
        <template #footer>
          <p-button
            label="Escolher"
            @click="chooseOrigem(origem)"
          />
        </template>
      </p-card>
    </div>
  </div>
  <div v-else>
    <p-button
      label="Escolher outra origem"
      @click="handleChangeOrigem"
    />
    <div>
      <p-card>
        <template #title>
          {{personagem.origem.nome}}
        </template>
        <template #content>
          <div v-html="personagem.origem.descricao"></div>
        </template>
      </p-card>
    </div>
    <p-button
      label="Salvar"
      @click="handleSavePersonagem"
    />
  </div>
</template>