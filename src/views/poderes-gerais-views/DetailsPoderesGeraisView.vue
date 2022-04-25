<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { _getDoc } from '../../firebase/firestore'

const route = useRoute()
const poderGeral = ref()

onMounted(async () => {
  poderGeral.value = await _getDoc('poderes-gerais', route.params.id)
})
</script>

<template>
  <div>
    <h1>Detalhes Poder Geral</h1>
    <div v-if="poderGeral">
      <RouterLink :to="{ name: 'editar-poder-geral', params: { id: poderGeral.id } }">
        Editar
      </RouterLink>
      <p-card>
        <template #title>
          {{poderGeral.nome}}
        </template>
        <template #content>
          <div v-html="poderGeral.descricao"></div>
        </template>
      </p-card>
    </div>
  </div>
</template>