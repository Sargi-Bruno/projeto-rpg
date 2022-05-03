<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'

const magias = ref([])

onMounted(async () => {
  magias.value = await _getDocs('magias')
})
</script>

<template>
  <h1>Listar Magias</h1>
  <RouterLink :to="{ name: 'criar-magia' }">
    Cadastrar nova Magia
  </RouterLink>
  <div v-for="magia in magias" :key="magia.id">
    <p-card>
      <template #title>
        {{magia.nome}}
      </template>
      <template #content>
        <div v-html="magia.descricao"></div>
      </template>
      <template #footer>
        <RouterLink :to="{ name: 'detalhes-magia', params: { id: magia.id } }">
          Ver mais
        </RouterLink>
      </template>
    </p-card>
  </div>
</template>