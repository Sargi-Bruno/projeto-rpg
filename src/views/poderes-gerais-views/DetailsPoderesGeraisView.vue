<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { _getDoc } from '../../firebase/firestore'

const router = useRouter()
const route = useRoute()
const poderGeral = ref()

onMounted(async () => {
  poderGeral.value = await _getDoc('poderes-gerais', route.params.id)
})
</script>

<template>
  <div 
    v-if="poderGeral"
    class="content"
  >
    <div class="header">
      <div class="title">
        <h1>{{ poderGeral.nome }}</h1>
        <h1>-</h1>
        <h1>{{ poderGeral.categoria }}</h1>
      </div>
      <p-button
        label="Editar"
        @click="router.push({ name: 'editar-poder-geral', params: { id: poderGeral.id } })"
      />
    </div>
    <div v-html="poderGeral.descricao" />
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  display: flex;
}
.title h1 {
  margin-right: 1rem;
  font-family: 'Tormenta', sans-serif;
  color: var(--tormenta-red);
}
</style>