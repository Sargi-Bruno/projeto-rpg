<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { _getDoc } from '../../firebase/firestore'

const route = useRoute()
const magia = ref()

onMounted(async () => {
  magia.value = await _getDoc('magias', route.params.id)
})
</script>

<template>
  <div>
    <h1>Detalhes Magia</h1>
    <div v-if="magia">
      <RouterLink :to="{ name: 'editar-magia', params: { id: magia.id } }">
        Editar
      </RouterLink>
      <p-card>
        <template #title>
          {{ magia.nome }}
        </template>
        <template #content>
          <div v-html="magia.descricao" />
        </template>
      </p-card>
    </div>
  </div>
</template>