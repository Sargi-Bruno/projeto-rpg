<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'

const origens = ref([])

onMounted(async () => {
  origens.value = await _getDocs('origens')
})
</script>

<template>
  <h1>Listar Origens</h1>
  <RouterLink :to="{ name: 'criar-origem' }">
    Cadastrar nova Origem
  </RouterLink>
  <div
    v-for="origem in origens"
    :key="origem.id"
  >
    <p-card>
      <template #title>
        {{ origem.nome }}
      </template>
      <template #content>
        <div v-html="origem.descricao" />
      </template>
      <template #footer>
        <RouterLink :to="{ name: 'detalhes-origem', params: { id: origem.id } }">
          Ver mais
        </RouterLink>
      </template>
    </p-card>
  </div>
</template>