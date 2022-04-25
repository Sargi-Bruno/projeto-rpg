<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'

const router = useRouter()
const equipamentos = ref([])

onMounted(async () => {
  equipamentos.value = await _getDocs('equipamentos')
})

const handleDetails = (docId) => {
  router.push({ name: 'detalhes-equipamento', params: { id: docId } })
}
</script>

<template>
  <h1>Listar Equipamentos</h1>
  <RouterLink :to="{ name: 'criar-equipamento' }">
    Cadastrar novo Equipamento
  </RouterLink>
  <div v-for="equipamento in equipamentos" :key="equipamento.id">
    <p-card>
      <template #title>
          {{equipamento.nome}}
      </template>
      <template #content>
        <div v-html="equipamento.descricao"></div>
      </template>
      <template #footer>
        <p-button 
          label="Ver mais"
          @click="handleDetails(equipamento.id)"
        />
      </template>
    </p-card>
  </div>
</template>