<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'

const racas = ref([])

onMounted(async () => {
  racas.value = await _getDocs('racas')
})
</script>

<template>
  <h1>Listar Raças</h1>
  <RouterLink :to="{ name: 'criar-raca' }">
    Cadastrar nova Raça
  </RouterLink>
  <div v-for="raca in racas" :key="raca.id">
    <p-card>
      <template #title>
        {{raca.nome}}
      </template>
      <template #content>
        <div v-html="raca.descricao"></div>
      </template>
      <template #footer>
        <RouterLink :to="{ name: 'detalhes-raca', params: { id: raca.id } }">
          Ver mais
        </RouterLink>
      </template>
    </p-card>
  </div>
</template>