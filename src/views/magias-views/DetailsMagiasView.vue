<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { _getDoc } from '../../firebase/firestore'

const router = useRouter()
const route = useRoute()
const magia = ref()

onMounted(async () => {
  magia.value = await _getDoc('magias', route.params.id)
})
</script>

<template>
  <div
    v-if="magia"
    class="content"
  >
    <div class="header">
      <h1 class="title">
        {{ magia.nome }}
      </h1>
      <p-button
        label="Editar"
        @click="router.push({ name: 'editar-magia', params: { id: magia.id } })"
      />
    </div>
    <div class="row">
      <h4 class="subtitle">
        {{ magia.classificacao }}
      </h4>
      <h4 class="subtitle">
        {{ magia.circulo }}
      </h4>
      <h4 class="subtitle">
        ({{ magia.escola }})
      </h4>
    </div>
    <div class="row">
      <div v-if="magia.execucao">
        <h4 class="info">
          Execução: <span>{{ magia.execucao }};</span>
        </h4>
      </div>
      <div v-if="magia.alcance">
        <h4 class="info">
          Alcance: <span>{{ magia.alcance }};</span>
        </h4>
      </div>
      <div v-if="magia.alvo">
        <h4 class="info">
          Alvo: <span>{{ magia.alvo }};</span>
        </h4>
      </div>
      <div v-if="magia.duracao">
        <h4 class="info">
          Ducação: <span>{{ magia.duracao }};</span>
        </h4>
      </div>
    </div>
    <div v-html="magia.descricao" />
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.row {
  display: flex;
}
.title {
  font-family: 'Tormenta', sans-serif;
  color: var(--tormenta-red);
}
.subtitle {
  margin-top: 0;
  margin-bottom: 0;
  margin-right: .25rem;
  font-size: 14px;
  color: var(--text-color-secondary);
}
.info {
  margin-right: .5rem;
  margin-top: 1rem;
  margin-bottom: 0;
}
.info span {
  font-weight: 500;
}
</style>