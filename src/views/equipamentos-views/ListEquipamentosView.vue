<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'

const equipamentos = ref([])

onMounted(async () => {
  equipamentos.value = await _getDocs('equipamentos')
})
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
        <RouterLink :to="{ name: 'detalhes-equipamento', params: { id: equipamento.id } }">
          Ver mais
        </RouterLink>
      </template>
    </p-card>
  </div>
</template>