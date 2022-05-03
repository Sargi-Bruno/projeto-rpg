<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { _getDoc } from '../../firebase/firestore'

const route = useRoute()
const classe = ref()

onMounted(async () => {
  classe.value = await _getDoc('classes', route.params.id)
})
</script>

<template>
  <div>
    <h1>Detalhes Classe</h1>
    <div v-if="classe">
      <RouterLink :to="{ name: 'editar-classe', params: { id: classe.id } }">
        Editar
      </RouterLink>
      <p-card>
        <template #title>
          {{classe.nome}}
        </template>
        <template #content>
          <div v-html="classe.descricao"></div>
        </template>
      </p-card>
    </div>
  </div>
</template>