<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { _getDoc, _updateDoc, _deleteDoc } from '../../firebase/firestore'

const route = useRoute()
const router = useRouter()
const editLoading = ref(false)
const deleteLoading = ref(false)
const deus = ref()

const canalizarEnergiaOptions = [
  'Positiva',
  'Negativa',
  'Qualquer',
]

onMounted(async () => {
  deus.value = await _getDoc('deuses', route.params.id)
})

const handleEdit = () => {
  editLoading.value = true
  _updateDoc(deus.value)
  router.push({ name: 'listar-deuses' })
}

const handleDelete = () => {
  deleteLoading.value = true
  _deleteDoc(deus.value)
  router.push({ name: 'listar-deuses' })
}
</script>

<template>
  <div>
    <h1>Editar Deus</h1>
    <div v-if="deus">
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
      <RouterLink :to="{ name: 'listar-deuses' }">
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