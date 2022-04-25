<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'

const poderesGerais = ref([])

onMounted(async () => {
  poderesGerais.value = await _getDocs('poderes-gerais')
})
</script>

<template>
  <h1>Listar Poderes Gerais</h1>
  <RouterLink :to="{ name: 'criar-poder-geral' }">
    Cadastrar novo Poder Geral
  </RouterLink>
  <div v-for="poderGeral in poderesGerais" :key="poderGeral.id">
    <p-card>
      <template #title>
        {{poderGeral.nome}}
      </template>
      <template #content>
        <div v-html="poderGeral.descricao"></div>
      </template>
      <template #footer>
        <RouterLink :to="{ name: 'detalhes-poder-geral', params: { id: poderGeral.id } }">
          Ver mais
        </RouterLink>
      </template>
    </p-card>
  </div>
</template>