<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { _addDoc } from '../../firebase/firestore'

const router = useRouter()
const registerLoading = ref(false)

const canalizarEnergiaOptions = [
  'Positiva',
  'Negativa',
  'Qualquer',
]

const divindade = ref({
  nome: '',
  descricao: '',
  crencasObjetivos: '',
  devotos: '',
  simboloSagrado: '',
  canalizarEnergia: '',
  armaPreferida: '',
  obrigacoesRestricoes: '',
  poderesConcedidos: '',
})

const handleRegister = () => {
  registerLoading.value = true
  _addDoc('divindades', divindade.value)
  router.push({ name: 'home' })
}
</script>

<template>
  <h1>Criar Divindade</h1>
  <div>
    <label for="nome">Nome</label>
    <p-input-text 
      id="nome"
      v-model="divindade.nome"
    />
    <label>Descrição</label>
    <p-editor v-model="divindade.descricao" />
  </div>
  <div>
    <label>Crenças e Objetivos</label>
    <p-editor v-model="divindade.crencasObjetivos" />
  </div>
  <div>
    <label>Devotos</label>
    <p-editor v-model="divindade.devotos" />
  </div>
  <div>
    <label>Símbolo Sagrado</label>
    <p-editor v-model="divindade.simboloSagrado" />
  </div>
  <div>
    <label for="canalizar-energia">Canalizar Energia</label>
    <p-dropdown
      id="canalizar-energia"
      v-model="divindade.canalizarEnergia"
      :options="canalizarEnergiaOptions"
    />
  </div>
  <div>
    <label>Arma Preferida</label>
    <p-editor v-model="divindade.armaPreferida" />
  </div>
  <div>
    <label>Obrigações e Restrições</label>
    <p-editor v-model="divindade.obrigacoesRestricoes" />
  </div>
  <div>
    <label>Poderes Concedidos</label>
    <p-editor v-model="divindade.poderesConcedidos" />
  </div>
  <p-button
    label="Finalizar"
    @click="handleRegister"
    :disabled="registerLoading"
  />
</template>