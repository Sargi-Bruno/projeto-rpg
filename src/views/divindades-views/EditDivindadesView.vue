<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { _getDoc, _updateDoc, _deleteDoc } from '../../firebase/firestore'

const route = useRoute()
const router = useRouter()
const editLoading = ref(false)
const deleteLoading = ref(false)
const divindade = ref()

const canalizarEnergiaOptions = [
  'Positiva',
  'Negativa',
  'Qualquer',
]

onMounted(async () => {
  divindade.value = await _getDoc('divindades', route.params.id)
})

const handleEdit = () => {
  editLoading.value = true
  _updateDoc(divindade.value)
  router.push({ name: 'listar-divindades' })
}

const handleDelete = () => {
  deleteLoading.value = true
  _deleteDoc(divindade.value)
  router.push({ name: 'listar-divindades' })
}
</script>

<template>
  <div>
    <h1>Editar Divindade</h1>
    <div v-if="divindade">
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
        <p-editor v-model="divindade.crencasObjetivos" />
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
      <RouterLink :to="{ name: 'listar-divindades' }">
        Cancelar
      </RouterLink>
      <p-button
        label="Editar"
        @click="handleEdit"
        :disabled="editLoading"
      />
      <p-button
        label="Deletar"
        @click="handleDelete"
        :disabled="deleteLoading"
      />
    </div>
  </div>
</template>