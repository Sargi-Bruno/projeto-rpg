<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { _addDoc } from '../../firebase/firestore'

const router = useRouter()
const registerLoading = ref(false)
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
const magia = ref({
  nome: '',
  descricao: '',
  classificacao: 'Arcana', // Arcana, Divina, Universal 
  circulo: 1,
  escola: '', // Abjuração, Adivinhação, Convocação, Encantamento, Evocação, Ilusão, Necromancia, Transmutação
  execucao: 'padrão', // Livre, Padrão, Movimento, Completa
  alcance: 'médio', // Pessoal, Toque, Curto, Médio, Longo, Ilimitado
  alvo: '',
  area: '',
  duracao: '',
  resistencia: '', // opcional
})

const handleRegister = () => {
  registerLoading.value = true
  _addDoc('magias', magia.value)
  router.push({ name: 'home' })
}
</script>

<template>
  <h1>Criar Magia</h1>
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
      optionLabel="label"
      optionValue="value"
    />
    <label for="escola">Escola</label>
    <p-dropdown 
      id="escola"
      v-model="magia.escola"
      :options="escolaOptions"
      optionLabel="label"
      optionValue="label"
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
  <p-button
    label="Finalizar"
    @click="handleRegister"
    :disabled="registerLoading"
  />
</template>