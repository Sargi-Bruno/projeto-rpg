<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { _addDoc } from '../../firebase/firestore'

const router = useRouter()
const registerLoading = ref(false)
const origem = ref({
  nome: '',
  descricao: '',
  itens: '',
  beneficios: '',
  poderUnico: {
    nome: '',
    descricao: '',
  }
})

const handleRegister = () => {
  registerLoading.value = true
  _addDoc('origens', origem.value)
  router.push({ name: 'listar-origens' })
}
</script>

<template>
  <div class="content">
    <h1>Criar Origem</h1>
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
    <p-button
      label="Finalizar"
      class="finish-button"
      :disabled="registerLoading"
      @click="handleRegister"
    />
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
.finish-button {
  display: block;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: auto;
}
</style>