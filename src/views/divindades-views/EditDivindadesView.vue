<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
  <div 
    v-if="divindade"
    class="content"
  >
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
        @click="router.push({ name: 'listar-divindades' })"
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