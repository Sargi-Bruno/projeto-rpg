<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'
import { renderDescricao, renderDescricaoCompleta } from '@/utils/viewFunctions.js'

const router = useRouter()
const origens = ref([])
const showMore = ref([])

const handleShowLess = (id) => {
  showMore.value = showMore.value.filter(value => {
    return value != id
  })
}

onMounted(async () => {
  origens.value = await _getDocs('origens')
})
</script>

<template>
  <div class="content">
    <div class="header">
      <h1>Listar Origens</h1>
      <p-button
        label="Cadastrar"
        @click="router.push({ name: 'criar-origem' })"
      />
    </div>
    <div
      v-for="origem in origens.sort((a, b) => a.nome.localeCompare(b.nome))"
      :key="origem.id"
      class="card"
    >
      <h4 class="card-title">
        {{ origem.nome }}
      </h4>
      <div class="card-row">
        <div class="card-first-column">
          <div class="card-itens-description">
            <label class="card-subtitle">Itens</label> 
            <div v-html="origem.itens" />
          </div>
          <div class="card-beneficios-description">
            <label class="card-subtitle">Benefícios</label> 
            <div v-html="origem.beneficios" />
          </div>
        </div>
        <div class="card-second-column">
          <h4 class="card-poder-title">
            {{ origem.poderUnico.nome }}
          </h4>
          <div class="card-poder-description">
            <div v-html="origem.poderUnico.descricao" />
          </div>
        </div>
      </div>
      <div v-if="showMore.includes(origem.id)">
        <p>
          {{ renderDescricaoCompleta(origem.descricao) }} 
          <span 
            class="show-more"
            @click="handleShowLess(origem.id)"
          >
            Ver menos
          </span>
        </p>
      </div>
      <div v-else>
        <p>
          {{ renderDescricao(origem.descricao) }} 
          <span 
            class="show-more"
            @click="showMore.push(origem.id)"
          >
            Ver mais
          </span>
        </p>
      </div>
      <div class="card-footer">
        <p-button 
          label="Editar"
          @click="router.push({ name: 'editar-origem', params: { id: origem.id } })"
        />
        <p-button 
          label="Detalhes"
          @click="router.push({ name: 'detalhes-origem', params: { id: origem.id } })"
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
.card-title {
  margin-top: 0;
  margin-bottom: 0;
  font-family: 'Tormenta', sans-serif;
  font-size: 24px;
  color: var(--tormenta-red);
}
.card-subtitle {
  font-family: 'Tormenta', sans-serif;
  color: var(--tormenta-red);
}
.card-poder-title {
  margin-top: 0;
  margin-bottom: 0;
  font-family: 'Tormenta', sans-serif;
  color: var(--tormenta-red);
}
.card-row {
  display: flex;
}
.card-first-column {
  width: 50%;
  margin-right: 2rem;
}
.card-second-column {
  width: 50%;
}
.card-itens-description :deep(p) {
  margin: 0;
}
.card-beneficios-description :deep(p) {
  margin: 0;
}
.card-poder-description :deep(p) {
  margin: 0;
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
}
.card-footer button {
  margin-top: 1rem;
  margin-left: 1rem;
}
</style>