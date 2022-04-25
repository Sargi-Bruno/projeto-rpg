<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'

const router = useRouter()
const classes = ref([])

onMounted(async () => {
  classes.value = await _getDocs('classes')
})

const handleDetails = (docId) => {
  router.push({ name: 'detalhes-classe', params: { id: docId } })
}
</script>

<template>
  <h1>Listar Classes</h1>
  <RouterLink :to="{ name: 'criar-classe' }">
    Cadastrar nova Classe
  </RouterLink>
  <div v-for="classe in classes" :key="classe.id">
    <p-card>
      <template #title>
          {{classe.nome}}
      </template>
      <template #content>
        <div v-html="classe.descricao"></div>
      </template>
      <template #footer>
        <p-button 
          label="Ver mais"
          @click="handleDetails(classe.id)"
        />
      </template>
    </p-card>
  </div>
</template>