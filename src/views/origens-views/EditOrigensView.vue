<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { _getDoc, _updateDoc, _deleteDoc } from '../../firebase/firestore'

const route = useRoute()
const router = useRouter()
const editLoading = ref(false)
const deleteLoading = ref(false)
const origem = ref()

onMounted(async () => {
  origem.value = await _getDoc('origens', route.params.id)
})

const handleEdit = () => {
  editLoading.value = true
  _updateDoc(origem.value)
  router.push({ name: 'listar-origens' })
}

const handleDelete = () => {
  deleteLoading.value = true
  _deleteDoc(origem.value)
  router.push({ name: 'listar-origens' })
}
</script>

<template>
  <div
    v-if="origem"
    class="content"
  >
    <h1>Editar Origem</h1>
    <div class="row">
      <div class="first-column">
        <div class="input-container name-container">
          <label for="nome">Nome</label>
          <p-input-text 
            id="nome"
            v-model="origem.nome"
          />
        </div>
        <label>Descrição</label>
        <p-editor 
          v-model="origem.descricao" 
          editor-style="height: 10rem" 
        />
      </div>
      <div class="column">
        <div class="input-container name-container">
          <label for="poder-unico-nome">Poder Único</label>
          <p-input-text 
            id="poder-unico-nome"
            v-model="origem.poderUnico.nome"
          />
        </div>
        <label>Descrição</label>
        <p-editor 
          v-model="origem.poderUnico.descricao"
          editor-style="height: 10rem" 
        />
      </div>
    </div>
    <div class="second-row">
      <div class="first-column">
        <label>Itens</label>
        <p-editor 
          v-model="origem.itens" 
          editor-style="height: 10rem" 
        />
      </div>
      <div class="column">
        <label>Benefícios</label>
        <p-editor 
          v-model="origem.beneficios" 
          editor-style="height: 10rem" 
        />
      </div>
    </div>
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
        @click="router.push({ name: 'listar-origens' })"
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
}
.first-column {
  width: 50%;
  padding-right: 2rem;
}
.column {
  width: 50%;
}
.name-container {
  width: 50%;
  margin-bottom: .5rem;
}
.second-row {
  display: flex;
  margin-top: .5rem;
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