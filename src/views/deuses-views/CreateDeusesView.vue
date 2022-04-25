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

const deus = ref({
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
  _addDoc('deuses', deus.value)
  router.push({ name: 'home' })
}
</script>

<template>
  <h1>Criar Deus</h1>
  <div>
    <label for="nome">Nome</label>
    <p-input-text 
      id="nome"
      v-model="deus.nome"
    />
    <label>Descrição</label>
    <p-editor v-model="deus.descricao" />
  </div>
  <div>
    <label>Crenças e Objetivos</label>
    <p-editor v-model="deus.crencasObjetivos" />
  </div>
  <div>
    <label>Devotos</label>
    <p-editor v-model="deus.devotos" />
  </div>
  <div>
    <label>Símbolo Sagrado</label>
    <p-editor v-model="deus.crencasObjetivos" />
  </div>
  <div>
    <label for="canalizar-energia">Canalizar Energia</label>
    <p-dropdown
      id="canalizar-energia"
      v-model="deus.canalizarEnergia"
      :options="canalizarEnergiaOptions"
    />
  </div>
  <div>
    <label>Arma Preferida</label>
    <p-editor v-model="deus.armaPreferida" />
  </div>
  <div>
    <label>Obrigações e Restrições</label>
    <p-editor v-model="deus.obrigacoesRestricoes" />
  </div>
  <div>
    <label>Poderes Concedidos</label>
    <p-editor v-model="deus.poderesConcedidos" />
  </div>
  <p-button
    label="Finalizar"
    @click="handleRegister"
    :disabled="registerLoading"
  />
</template>