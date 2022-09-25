<script setup>
import { onMounted, ref } from 'vue'
import { _getDoc, _updateDoc } from '../../../firebase/firestore'

const props = defineProps({
  personagemId: {
    type: String,
    required: true
  }
})

const loading = ref(true)
const personagem = ref()

onMounted(async () => {
  personagem.value = await _getDoc('personagens', props.personagemId)
  loading.value = false
})

const handleSavePersonagem = async () => {
  _updateDoc(personagem.value)
    // .then(emit('handle-next-step', 6))
}
</script>

<template>
  <div v-if="!loading">
    <p-button
      class="button"
      label="Finalizar"
      @click="handleSavePersonagem"
    />
    <div class="input-container margin-bottom">
      <label for="nome">Nome</label>
      <p-input-text 
        id="nome"
        v-model="personagem.nome"
        autocomplete="off"
      />
    </div>
    <div class="input-container">
      <label for="descricao">Descrição</label>
      <p-textarea
        id="descricao"
        v-model="personagem.descricao"
        rows="10"
      />
    </div>
  </div>
</template>

<style scoped>
.button {
  display: block;
  margin-left: auto;
  margin-bottom: 2rem;
}
.margin-bottom {
  margin-bottom: 1rem;
}
</style>