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
  router.push({ name: 'listar-divindades' })
}
</script>

<template>
  <div class="content">
    <h1>Criar Divindade</h1>
    <div class="flex padding">
      <div class="input-container">
        <label for="nome">Nome</label>
        <p-input-text 
          id="nome"
          v-model="divindade.nome"
        />
      </div>
      <div class="input-container">
        <label for="canalizar-energia">Canalizar Energia</label>
        <p-dropdown
          id="canalizar-energia"
          v-model="divindade.canalizarEnergia"
          :options="canalizarEnergiaOptions"
        />
      </div>
    </div>
    <div class="flex padding">
      <div class="first-column">
        <label>Descrição</label>
        <p-editor 
          v-model="divindade.descricao" 
          editor-style="height: 10rem" 
        />
      </div>
      <div class="second-column">
        <label>Crenças e Objetivos</label>
        <p-editor 
          v-model="divindade.crencasObjetivos" 
          editor-style="height: 10rem" 
        />
      </div>
    </div>
    <div class="flex padding">
      <div class="first-column">
        <label>Devotos</label>
        <p-editor 
          v-model="divindade.devotos" 
          editor-style="height: 10rem" 
        />
      </div>
      <div class="second-column">
        <label>Símbolo Sagrado</label>
        <p-editor 
          v-model="divindade.simboloSagrado" 
          editor-style="height: 10rem" 
        />
      </div>
    </div>
    <div class="flex padding">
      <div class="first-column">
        <label>Arma Preferida</label>
        <p-editor 
          v-model="divindade.armaPreferida" 
          editor-style="height: 10rem" 
        />
      </div>
      <div class="second-column">
        <label>Obrigações e Restrições</label>
        <p-editor 
          v-model="divindade.obrigacoesRestricoes" 
          editor-style="height: 10rem" 
        />
      </div>
    </div>
    <div>
      <label>Poderes Concedidos</label>
      <p-editor 
        v-model="divindade.poderesConcedidos" 
        editor-style="height: 10rem"
      />
    </div>
    <p-button
      label="Finalizar"
      class="finish-button"
      :disabled="registerLoading"
      @click="handleRegister"
    />
  </div>
</template>

<style scoped>
.first-column {
  width: 50%;
  padding-right: 2rem;
}
.second-column {
  width: 50%;
}
.padding {
  padding-bottom: .5rem;
}
.finish-button {
  display: block;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: auto;
}
</style>