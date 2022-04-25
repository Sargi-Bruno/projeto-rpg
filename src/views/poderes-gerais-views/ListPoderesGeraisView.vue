<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'

const router = useRouter()
const poderesGerais = ref([])

onMounted(async () => {
  poderesGerais.value = await _getDocs('poderes-gerais')
})

const handleDetails = (docId) => {
  router.push({ name: 'detalhes-poder-geral', params: { id: docId } })
}
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
        <p-button 
          label="Ver mais"
          @click="handleDetails(poderGeral.id)"
        />
      </template>
    </p-card>
  </div>
</template>