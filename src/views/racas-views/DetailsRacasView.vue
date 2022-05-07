<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { _getDoc } from '../../firebase/firestore'

const route = useRoute()
const raca = ref()

onMounted(async () => {
  raca.value = await _getDoc('racas', route.params.id)
})
</script>

<template>
  <div>
    <h1>Detalhes Raça</h1>
    <div v-if="raca">
      <RouterLink :to="{ name: 'editar-raca', params: { id: raca.id } }">
        Editar
      </RouterLink>
      <p-card>
        <template #title>
          {{ raca.nome }}
        </template>
        <template #content>
          <div v-html="raca.descricao" />
        </template>
      </p-card>
    </div>
  </div>
</template>