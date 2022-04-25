<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'

const deuses = ref([])

onMounted(async () => {
  deuses.value = await _getDocs('deuses')
})
</script>

<template>
  <h1>Listar Deuses</h1>
  <RouterLink :to="{ name: 'criar-deus' }">
    Cadastrar novo Deus
  </RouterLink>
  <div v-for="deus in deuses" :key="deus.id">
    <p-card>
      <template #title>
          {{deus.nome}}
      </template>
      <template #content>
        <div v-html="deus.descricao"></div>
      </template>
      <template #footer>
        <RouterLink :to="{ name: 'detalhes-deus', params: { id: deus.id } }">
          Ver mais
        </RouterLink>
      </template>
    </p-card>
  </div>
</template>