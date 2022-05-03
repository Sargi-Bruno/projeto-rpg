<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'

const divindades = ref([])

onMounted(async () => {
  divindades.value = await _getDocs('divindades')
})
</script>

<template>
  <h1>Listar Divindades</h1>
  <RouterLink :to="{ name: 'criar-divindade' }">
    Cadastrar novo Divindade
  </RouterLink>
  <div v-for="divindade in divindades" :key="divindade.id">
    <p-card>
      <template #title>
        {{divindade.nome}}
      </template>
      <template #content>
        <div v-html="divindade.descricao"></div>
      </template>
      <template #footer>
        <RouterLink :to="{ name: 'detalhes-divindade', params: { id: divindade.id } }">
          Ver mais
        </RouterLink>
      </template>
    </p-card>
  </div>
</template>