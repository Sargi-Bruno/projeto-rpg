<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { _getDoc } from '../../firebase/firestore'

const router = useRouter()
const route = useRoute()
const origem = ref()

onMounted(async () => {
  origem.value = await _getDoc('origens', route.params.id)
})
</script>

<template>
  <div 
    v-if="origem"
    class="content"
  >
    <div class="header">
      <h1 class="title">
        {{ origem.nome }}
      </h1>
      <p-button
        label="Editar"
        @click="router.push({ name: 'editar-origem', params: { id: origem.id } })"
      />
    </div>
    <div v-html="origem.descricao" />
    <div class="info">
      <label class="subtitle">Itens</label> 
      <div v-html="origem.itens" />
    </div>
    <div class="info">
      <label class="subtitle">Benefícios</label> 
      <div v-html="origem.beneficios" />
    </div>
    <div class="info">
      <label class="subtitle">{{ origem.poderUnico.nome }}</label> 
      <div v-html="origem.poderUnico.descricao" />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-family: 'Tormenta', sans-serif;
  color: var(--tormenta-red);
}
.subtitle {
  font-family: 'Tormenta', sans-serif;
  color: var(--tormenta-red);
}
.info {
  margin-top: 1rem;
}
.info :deep(p) {
  margin: 0;
}
.info:last-of-type {
  margin-bottom: 2rem;
}
</style>