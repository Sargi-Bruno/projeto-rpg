<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { _getDoc } from '../../firebase/firestore'

const route = useRoute()
const origem = ref()

onMounted(async () => {
  origem.value = await _getDoc('origens', route.params.id)
})
</script>

<template>
  <div>
    <h1>Detalhes Origem</h1>
    <div v-if="origem">
      <RouterLink :to="{ name: 'editar-origem', params: { id: origem.id } }">
        Editar
      </RouterLink>
      <p-card>
        <template #title>
          {{ origem.nome }}
        </template>
        <template #content>
          <div v-html="origem.descricao" />
        </template>
      </p-card>
    </div>
  </div>
</template>