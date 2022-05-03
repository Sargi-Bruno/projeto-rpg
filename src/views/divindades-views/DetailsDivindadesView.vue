<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { _getDoc } from '../../firebase/firestore'

const route = useRoute()
const divindade = ref()

onMounted(async () => {
  divindade.value = await _getDoc('divindades', route.params.id)
})
</script>

<template>
  <div>
    <h1>Detalhes Divindade</h1>
    <div v-if="divindade">
      <RouterLink :to="{ name: 'editar-divindade', params: { id: divindade.id } }">
        Editar
      </RouterLink>
      <p-card>
        <template #title>
          {{divindade.nome}}
        </template>
        <template #content>
          <div v-html="divindade.descricao"></div>
        </template>
      </p-card>
    </div>
  </div>
</template>