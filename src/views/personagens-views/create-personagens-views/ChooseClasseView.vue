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
const classes = ref([])
const isClasseChosen = ref(false)
// const isClasseFinished = ref(false)

onMounted(async () => {
  classes.value = await _getDocs('classes')
  personagem.value = await _getDoc('personagens', props.personagemId)
})

const chooseClasse = (classe) => {
  isClasseChosen.value = true
  personagem.value.classe = classe
}

const handleChangeClasse = () => {
  isClasseChosen.value = false
  personagem.value.classe = {}
}

const handleSavePersonagem = async () => {
  _updateDoc(personagem.value)
    .then(emit('handle-next-step', 2))
}
</script>

<template>
  <h1>Escolher Classe</h1>
  <div v-if="!isClasseChosen">
    <div
      v-for="classe in classes"
      :key="classe.id"
    >
      <p-card>
        <template #title>
          {{ classe.nome }}
        </template>
        <template #content>
          <div v-html="classe.descricao" />
        </template>
        <template #footer>
          <p-button
            label="Escolher"
            @click="chooseClasse(classe)"
          />
        </template>
      </p-card>
    </div>
  </div>
  <div v-else>
    <p-button
      label="Escolher outra classe"
      @click="handleChangeClasse"
    />
    <div>
      <p-card>
        <template #title>
          {{ personagem.classe.nome }}
        </template>
        <template #content>
          <div v-html="personagem.classe.descricao" />
        </template>
      </p-card>
    </div>
    <p-button
      label="Salvar"
      @click="handleSavePersonagem"
    />
  </div>
</template>