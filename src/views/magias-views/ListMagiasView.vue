<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'
import { renderDescricao } from '@/utils/viewFunctions.js'

const router = useRouter()
const magias = ref([])
const showMore = ref([])

const handleShowLess = (id) => {
  showMore.value = showMore.value.filter(value => {
    return value != id
  })
}

onMounted(async () => {
  magias.value = await _getDocs('magias')
  console.log(magias.value)
})
</script>

<template>
  <div class="content">
    <div class="header">
      <h1>Listar Magias</h1>
      <p-button
        label="Cadastrar"
        @click="router.push({ name: 'criar-magia' })"
      />
    </div>
    <div
      v-for="magia in magias.sort((a, b) => a.nome.localeCompare(b.nome))"
      :key="magia.id"
      class="card"
    >
      <h4 class="card-title">
        {{ magia.nome }}
      </h4>
      <div class="card-row">
        <h4 class="card-subtitle">
          {{ magia.classificacao }}
        </h4>
        <h4 class="card-subtitle">
          {{ magia.circulo }}
        </h4>
        <h4 class="card-subtitle">
          ({{ magia.escola }})
        </h4>
      </div>
      <div class="card-row">
        <div v-if="magia.execucao">
          <h4 class="card-info">
            Execução: <span>{{ magia.execucao }};</span>
          </h4>
        </div>
        <div v-if="magia.alcance">
          <h4 class="card-info">
            Alcance: <span>{{ magia.alcance }};</span>
          </h4>
        </div>
        <div v-if="magia.alvo">
          <h4 class="card-info">
            Alvo: <span>{{ magia.alvo }};</span>
          </h4>
        </div>
        <div v-if="magia.duracao">
          <h4 class="card-info">
            Ducação: <span>{{ magia.duracao }};</span>
          </h4>
        </div>
      </div>
      <div v-if="magia.descricao.length > 136">
        <div v-if="showMore.includes(magia.id)">
          <div>
            <div v-html="magia.descricao" />
            <span 
              class="show-more"
              @click="handleShowLess(magia.id)"
            >
              Ver menos
            </span>
          </div>
        </div>
        <div v-else>
          <p>
            {{ renderDescricao(magia.descricao) }} 
            <span
              class="show-more"
              @click="showMore.push(magia.id)"
            >
              Ver mais
            </span>
          </p>
        </div>
      </div>
      <div v-else>
        <div v-html="magia.descricao" />
      </div>
      <div class="card-footer">
        <p-button 
          label="Editar"
          @click="router.push({ name: 'editar-magia', params: { id: magia.id } })"
        />
        <p-button 
          label="Detalhes"
          @click="router.push({ name: 'detalhes-magia', params: { id: magia.id } })"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card {
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--tormenta-background);
}
.card-row {
  display: flex;
}
.card-title {
  margin-top: 0;
  margin-bottom: 0;
  font-family: 'Tormenta', sans-serif;
  font-size: 24px;
  color: var(--tormenta-red);
}
.card-subtitle {
  margin-top: 0;
  margin-bottom: 0;
  margin-right: .25rem;
  font-size: 14px;
  color: var(--text-color-secondary);
}
.card-info {
  margin-right: .5rem;
  margin-top: 1rem;
  margin-bottom: 0;
}
.card-info span {
  font-weight: 500;
}
.show-more {
  color: var(--blue-500);
  text-decoration: underline;
  cursor: pointer;
}
.card-footer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid var(--tormenta-dark-red);
  margin-top: 1rem;
}
.card-footer button {
  margin-top: 1rem;
  margin-left: 1rem;
}
</style>