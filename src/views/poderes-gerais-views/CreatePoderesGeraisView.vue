<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { _addDoc } from '../../firebase/firestore'

const router = useRouter()
const registerLoading = ref(false)
const categoriaOptions = [
  'Combate',
  'Destino',
  'Magia',
  'Concedidos',
  'Tormenta',
]
const poderGeral = ref({
  nome: '',
  categoria: '', // Combate, Destino, Magia, Concedidos, Tormenta
  descricao: '',
  habilidadeMagica: false,
})

const handleRegister = () => {
  registerLoading.value = true
  _addDoc('poderes-gerais', poderGeral.value)
  router.push({ name: 'listar-poderes-gerais' })
}
</script>

<template>
  <div class="content">
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
.finish-button {
  display: block;
  margin-top: 2rem;
  margin-left: auto;
}
</style>