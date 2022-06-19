<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { _getDoc, _updateDoc, _deleteDoc } from '../../firebase/firestore'

const route = useRoute()
const router = useRouter()
const editLoading = ref(false)
const deleteLoading = ref(false)
const magia = ref()
const classificacaoOptions = [
  'Arcana',
  'Divina',
  'Universal',
]
const circuloOptions = [
  {label: '1º', value: 1},
  {label: '2º', value: 2},
  {label: '3º', value: 3},
  {label: '4º', value: 4},
  {label: '5º', value: 5},
]
const escolaOptions = [
  {label: 'Abjuração'},
  {label: 'Adivinhação'},
  {label: 'Convocação'},
  {label: 'Encantamento'},
  {label: 'Evocação'},
  {label: 'Ilusão'},
  {label: 'Necromancia'},
  {label: 'Transmutação'},
]
const execucaoOptions = [
  'livre',
  'padrão',
  'movimento',
  'completa',
]
const alanceOptions = [
  'pessoal',
  'toque',
  'curto',
  'médio',
  'longo',
  'ilimitado',
]

onMounted(async () => {
  magia.value = await _getDoc('magias', route.params.id)
})

const handleEdit = () => {
  editLoading.value = true
  _updateDoc(magia.value)
  router.push({ name: 'listar-magias' })
}

const handleDelete = () => {
  deleteLoading.value = true
  _deleteDoc(magia.value)
  router.push({ name: 'listar-magias' })
}
</script>

<template>
  <div
    v-if="magia"
    class="content"
  >
    <h1>Editar Magia</h1>
    <div class="row">
      <div class="input-container">
        <label for="nome">Nome</label>
        <p-input-text 
          id="nome"
          v-model="magia.nome"
          autocomplete="off"
        />
      </div>
      <div class="input-container">
        <label for="classificacao">Classificação</label>
        <p-dropdown 
          id="classificacao"
          v-model="magia.classificacao"
          :options="classificacaoOptions"
        />
      </div>
      <div class="input-container">
        <label for="circulo">Círculo</label>
        <p-dropdown 
          id="circulo"
          v-model="magia.circulo"
          :options="circuloOptions"
          option-label="label"
          option-value="value"
        />
      </div>
      <div class="input-container">
        <label for="escola">Escola</label>
        <p-dropdown 
          id="escola"
          v-model="magia.escola"
          :options="escolaOptions"
          option-label="label"
          option-value="label"
          :filter="true"
        />
      </div>
    </div>
    <div class="row">
      <div class="input-container">
        <label for="execucao">Execução</label>
        <p-dropdown 
          id="execucao"
          v-model="magia.execucao"
          :options="execucaoOptions"
        />
      </div>
      <div class="input-container">
        <label for="alcance">Alcance</label>
        <p-dropdown 
          id="alcance"
          v-model="magia.alcance"
          :options="alanceOptions"
        />
      </div>
      <div class="input-container">
        <label for="alvo">Alvo</label>
        <p-input-text 
          id="alvo"
          v-model="magia.alvo"
        />
      </div>
      <div class="input-container">
        <label for="area">Área</label>
        <p-input-text 
          id="area"
          v-model="magia.area"
        />
      </div>
      <div class="input-container">
        <label for="duracao">Duração</label>
        <p-input-text 
          id="duracao"
          v-model="magia.duracao"
        />
      </div>
      <div class="input-container">
        <label for="resistencia">Resistência</label>
        <p-input-text 
          id="resistencia"
          v-model="magia.resistencia"
        />
      </div>
    </div>
    <label>Descrição</label>
    <p-editor 
      v-model="magia.descricao" 
      editor-style="height: 10rem"
    />
    <div class="footer">
      <p-button
        label="Deletar"
        class="p-button-text p-button-danger"
        :disabled="deleteLoading"
        @click="handleDelete"
      />
      <p-button
        label="Cancelar"
        class="p-button-outlined"
        @click="router.push({ name: 'listar-magias' })"
      />
      <p-button
        label="Editar"
        class="p-button-success"
        :disabled="editLoading"
        @click="handleEdit"
      />
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  margin-bottom: .5rem;
}
.finish-button {
  display: block;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: auto;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  margin-bottom: 2rem;
}
.footer button {
  margin-left: 1rem;
}
</style>