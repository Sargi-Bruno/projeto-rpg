<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'

const router = useRouter()
const origens = ref([])

onMounted(async () => {
  origens.value = await _getDocs('origens')
})

const handleDetails = (docId) => {
  router.push({ name: 'detalhes-origem', params: { id: docId } })
}
</script>

<template>
  <h1>Listar Origens</h1>
  <RouterLink :to="{ name: 'criar-origem' }">
    Cadastrar nova Origem
  </RouterLink>
  <div v-for="origem in origens" :key="origem.id">
    <p-card>
      <template #title>
          {{origem.nome}}
      </template>
      <template #content>
        <div v-html="origem.descricao"></div>
      </template>
      <template #footer>
        <p-button 
          label="Ver mais"
          @click="handleDetails(origem.id)"
        />
      </template>
    </p-card>
  </div>
</template>