<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { _getDoc } from '../../firebase/firestore'

const route = useRoute()
const deus = ref()

onMounted(async () => {
  deus.value = await _getDoc('deuses', route.params.id)
})
</script>

<template>
  <div>
    <h1>Detalhes Deus</h1>
    <div v-if="deus">
      <RouterLink :to="{ name: 'editar-deus', params: { id: deus.id } }">
        Editar
      </RouterLink>
      <p-card>
        <template #title>
          {{deus.nome}}
        </template>
        <template #content>
          <div v-html="deus.descricao"></div>
        </template>
      </p-card>
    </div>
  </div>
</template>