<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
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
  <div>
    <h1>Editar Magia</h1>
    <div v-if="magia">
      <div>
        <label for="nome">Nome</label>
        <p-input-text 
          id="nome"
          v-model="magia.nome"
          autocomplete="off"
        />
        <label>Descrição</label>
        <p-editor v-model="magia.descricao" />
        <label for="classificacao">Classificação</label>
        <p-dropdown 
          id="classificacao"
          v-model="magia.classificacao"
          :options="classificacaoOptions"
        />
        <label for="circulo">Círculo</label>
        <p-dropdown 
          id="circulo"
          v-model="magia.circulo"
          :options="circuloOptions"
          option-label="label"
          option-value="value"
        />
        <label for="escola">Escola</label>
        <p-dropdown 
          id="escola"
          v-model="magia.escola"
          :options="escolaOptions"
          option-label="label"
          option-value="label"
          :filter="true"
        />
        <label for="execucao">Execução</label>
        <p-dropdown 
          id="execucao"
          v-model="magia.execucao"
          :options="execucaoOptions"
        />
        <label for="alcance">Alcance</label>
        <p-dropdown 
          id="alcance"
          v-model="magia.alcance"
          :options="alanceOptions"
        />
        <label for="alvo">Alvo</label>
        <p-input-text 
          id="alvo"
          v-model="magia.alvo"
        />
        <label for="area">Área</label>
        <p-input-text 
          id="area"
          v-model="magia.area"
        />
        <label for="duracao">Duração</label>
        <p-input-text 
          id="duracao"
          v-model="magia.duracao"
        />
        <label for="resistencia">Resistência</label>
        <p-input-text 
          id="resistencia"
          v-model="magia.resistencia"
        />
      </div>
      <RouterLink :to="{ name: 'listar-magias' }">
        Cancelar
      </RouterLink>
      <p-button
        label="Editar"
        :disabled="editLoading"
        @click="handleEdit"
      />
      <p-button
        label="Deletar"
        :disabled="deleteLoading"
        @click="handleDelete"
      />
    </div>
  </div>
</template>