<script setup>
import { onMounted, ref } from 'vue'
import { _getDocs, _getDoc, _updateDoc } from '../../../firebase/firestore'

const props = defineProps({
  personagemId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['handle-next-step'])

const personagem = ref()
const divindades = ref([])
const isDivindadeChosen = ref(false)
// const isDivindadeFinished = ref(false)

onMounted(async () => {
  divindades.value = await _getDocs('divindades')
  personagem.value = await _getDoc('personagens', props.personagemId)
})

const chooseDivindade = (divindade) => {
  isDivindadeChosen.value = true
  personagem.value.divindade = divindade
}

const handleChangeDivindade = () => {
  isDivindadeChosen.value = false
  personagem.value.divindade = {}
}

const handleSavePersonagem = async () => {
  _updateDoc(personagem.value)
    .then(emit('handle-next-step', 4))
}
</script>

<template>
  <h1>Escolher Divindade</h1>
  <div v-if="!isDivindadeChosen">
    <div
      v-for="divindade in divindades"
      :key="divindade.id"
    >
      <p-card>
        <template #title>
          {{ divindade.nome }}
        </template>
        <template #content>
          <div v-html="divindade.descricao" />
        </template>
        <template #footer>
          <p-button
            label="Escolher"
            @click="chooseDivindade(divindade)"
          />
        </template>
      </p-card>
    </div>
  </div>
  <div v-else>
    <p-button
      label="Escolher outra divindade"
      @click="handleChangeDivindade"
    />
    <div>
      <p-card>
        <template #title>
          {{ personagem.divindade.nome }}
        </template>
        <template #content>
          <div v-html="personagem.divindade.descricao" />
        </template>
      </p-card>
    </div>
    <p-button
      label="Salvar"
      @click="handleSavePersonagem"
    />
  </div>
</template>