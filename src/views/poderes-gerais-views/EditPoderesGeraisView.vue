<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { _getDoc, _updateDoc, _deleteDoc } from '../../firebase/firestore'

const router = useRouter()
const route = useRoute()
const editLoading = ref(false)
const deleteLoading = ref(false)
const categoriaOptions = [
  'Combate',
  'Destino',
  'Magia',
  'Concedidos',
  'Tormenta',
]
const poderGeral = ref()

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
  <div 
    v-if="poderGeral" 
    class="content"
  >
    <h1>Criar Poder Geral</h1>
    <div class="row">
      <div class="input-container">
        <label for="nome">Nome</label>
        <p-input-text 
          id="nome"
          v-model="poderGeral.nome"
        />
      </div>
      <div class="input-container">
        <label for="canalizar-energia">Categoria</label>
        <p-dropdown
          id="canalizar-energia"
          v-model="poderGeral.categoria"
          :options="categoriaOptions"
        />
      </div>
    </div>
    <div class="description-row">
      <label>Descrição</label>
      <div class="switch-container">
        <label for="magica-switch">Poder Mágico</label>
        <p-input-switch 
          id="magica-switch"
          v-model="poderGeral.habilidadeMagica"
        />
      </div>
    </div>
    <p-editor 
      v-model="poderGeral.descricao" 
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
        @click="router.push({ name: 'listar-poderes-gerais' })"
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
  margin-bottom: 1rem;
}
.description-row {
  display: flex;
  align-items: center;
  margin-bottom: .5rem;
}
.description-row label {
  margin-right: 2rem;
}
.switch-container {
  display: flex;
  align-items: center;
}
.switch-container label {
  margin-right: .5rem;
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