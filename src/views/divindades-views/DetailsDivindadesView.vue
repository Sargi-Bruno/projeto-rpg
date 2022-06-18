<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { _getDoc } from '../../firebase/firestore'

const router = useRouter()
const route = useRoute()
const divindade = ref()

onMounted(async () => {
  divindade.value = await _getDoc('divindades', route.params.id)
})
</script>

<template>
  <div
    v-if="divindade"
    class="content"
  >
    <div class="header">
      <h1 class="title">
        {{ divindade.nome }}
      </h1>
      <p-button
        label="Editar"
        @click="router.push({ name: 'editar-divindade', params: { id: divindade.id } })"
      />
    </div>
    <div v-html="divindade.descricao" />
    <div class="info">
      <label class="subtitle">Crenças e Objetivos</label> 
      <div v-html="divindade.crencasObjetivos" />
    </div>
    <div class="info">
      <label class="subtitle">Devotos</label> 
      <div v-html="divindade.devotos" />
    </div>
    <div class="info">
      <label class="subtitle">Símbolo Sagrado</label> 
      <div v-html="divindade.simboloSagrado" />
    </div>
    <div class="info">
      <label class="subtitle">Canalizar Energia</label> 
      <p>{{ divindade.canalizarEnergia }}</p>
    </div>
    <div class="info">
      <label class="subtitle">Arma Preferida</label> 
      <div v-html="divindade.armaPreferida" />
    </div>
    <div class="info">
      <label class="subtitle">Obrigações & Restrições</label> 
      <div v-html="divindade.obrigacoesRestricoes" />
    </div>
    <div class="info">
      <label class="subtitle">Poderes Concedidos</label> 
      <div v-html="divindade.poderesConcedidos" />
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