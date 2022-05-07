<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'

const classes = ref([])

onMounted(async () => {
  classes.value = await _getDocs('classes')
})
</script>

<template>
  <h1>Listar Classes</h1>
  <RouterLink :to="{ name: 'criar-classe' }">
    Cadastrar nova Classe
  </RouterLink>
  <div 
    v-for="classe in classes" 
    :key="classe.id"
  >
    <p-card>
      <template #title>
        {{ classe.nome }}
      </template>
      <template #content>
        <div v-html="classe.descricao" />
      </template>
      <template #footer>
        <RouterLink :to="{ name: 'detalhes-classe', params: { id: classe.id } }">
          Ver mais
        </RouterLink>
      </template>
    </p-card>
  </div>
</template>