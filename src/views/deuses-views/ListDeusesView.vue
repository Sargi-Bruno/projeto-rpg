<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'

const router = useRouter()
const deuses = ref([])

onMounted(async () => {
  deuses.value = await _getDocs('deuses')
})

const handleDetails = (docId) => {
  router.push({ name: 'detalhes-deus', params: { id: docId } })
}
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
        <p-button 
          label="Ver mais"
          @click="handleDetails(deus.id)"
        />
      </template>
    </p-card>
  </div>
</template>