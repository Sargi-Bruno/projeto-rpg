<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
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
  <div>
    <h1>Editar Origem</h1>
    <div v-if="origem">
      <div>
        <label for="nome">Nome</label>
        <p-input-text 
          id="nome"
          v-model="origem.nome"
        />
        <label>Descrição</label>
        <p-editor v-model="origem.descricao" />
      </div>
      <div>
        <label>Itens</label>
        <p-editor v-model="origem.itens" />
      </div>
      <div>
        <label>Benefícios</label>
        <p-editor v-model="origem.beneficios" />
      </div>
      <div>
        <h4>Poder Único</h4>
        <label for="poder-unico-nome">Nome</label>
        <p-input-text 
          id="poder-unico-nome"
          v-model="origem.poderUnico.nome"
        />
        <label>Descrição</label>
        <p-editor v-model="origem.poderUnico.descricao" />
      </div>
      <RouterLink :to="{ name: 'listar-origens' }">
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