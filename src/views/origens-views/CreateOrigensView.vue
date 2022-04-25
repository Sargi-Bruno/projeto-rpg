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
  router.push({ name: 'home' })
}
</script>

<template>
  <h1>Criar Origem</h1>
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
  <p-button
    label="Finalizar"
    @click="handleRegister"
    :disabled="registerLoading"
  />
</template>