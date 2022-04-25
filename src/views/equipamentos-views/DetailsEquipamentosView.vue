<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { _getDoc } from '../../firebase/firestore'

const route = useRoute()
const equipamento = ref()

onMounted(async () => {
  equipamento.value = await _getDoc('equipamentos', route.params.id)
})
</script>

<template>
  <div>
    <h1>Detalhes Equipamento</h1>
    <div v-if="equipamento">
      <RouterLink :to="{ name: 'editar-equipamento', params: { id: equipamento.id } }">
        Editar
      </RouterLink>
      <p-card>
        <template #title>
          {{equipamento.nome}}
        </template>
        <template #content>
          <div v-html="equipamento.descricao"></div>
        </template>
      </p-card>
    </div>
  </div>
</template>