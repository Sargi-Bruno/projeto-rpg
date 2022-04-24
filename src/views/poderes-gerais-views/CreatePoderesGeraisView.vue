<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { _addDoc } from '../../firebase/firestore'

const router = useRouter()
const finalizandoCadastro = ref(false)
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

const finalizarCadastro = () => {
  finalizandoCadastro.value = true
  _addDoc('poderes-gerais', poderGeral.value)
  router.push({ name: 'home' })
}
</script>

<template>
  <h1>Criar Poder Geral</h1>
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
  <p-button
    label="Finalizar"
    @click="finalizarCadastro"
    :disabled="finalizandoCadastro"
  />
</template>