<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { _getDoc, _updateDoc, _deleteDoc } from '../../firebase/firestore'

const route = useRoute()
const router = useRouter()
const editLoading = ref(false)
const deleteLoading = ref(false)
const poderGeral = ref()

const categoriaOptions = [
  'Combate',
  'Destino',
  'Magia',
  'Concedidos',
  'Tormenta',
]

onMounted(async () => {
  poderGeral.value = await _getDoc('poderes-gerais', route.params.id)
})

const handleEdit = () => {
  editLoading.value = true
  _updateDoc(poderGeral.value)
  router.push({ name: 'listar-poderes-gerais' })
}

const handleDelete = () => {
  deleteLoading.value = true
  _deleteDoc(poderGeral.value)
  router.push({ name: 'listar-poderes-gerais' })
}
</script>

<template>
  <div>
    <h1>Editar Poder Geral</h1>
    <div v-if="poderGeral">
      <div>
        <label for="nome">Nome</label>
        <p-input-text 
          id="nome"
          v-model="poderGeral.nome"
        />
        <div>
          <label for="canalizar-energia">Categoria</label>
          <p-dropdown
            id="canalizar-energia"
            v-model="poderGeral.categoria"
            :options="categoriaOptions"
          />
        </div>
        <label for="magica-switch">Poder Mágico</label>
        <p-input-switch 
          id="magica-switch"
          v-model="poderGeral.habilidadeMagica"
        />
        <label>Descrição</label>
        <p-editor v-model="poderGeral.descricao" />
      </div>
      <RouterLink :to="{ name: 'listar-poderes-gerais' }">
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