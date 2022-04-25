<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'

const router = useRouter()
const racas = ref([])

onMounted(async () => {
  racas.value = await _getDocs('racas')
})

const handleDetails = (docId) => {
  router.push({ name: 'detalhes-raca', params: { id: docId } })
}
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
        <p-button 
          label="Ver mais"
          @click="handleDetails(raca.id)"
        />
      </template>
    </p-card>
  </div>
</template>