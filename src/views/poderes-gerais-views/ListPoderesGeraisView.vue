<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'
import { renderDescricao, renderDescricaoCompleta } from '@/utils/viewFunctions.js'

const router = useRouter()
const poderesGerais = ref([])
const showMore = ref([])

const handleShowLess = (id) => {
  showMore.value = showMore.value.filter(value => {
    return value != id
  })
}

onMounted(async () => {
  poderesGerais.value = await _getDocs('poderes-gerais')
})
</script>

<template>
  <div class="content">
    <div class="header">
      <h1>Poderes Gerais</h1>
      <p-button
        label="Cadastrar"
        @click="router.push({ name: 'criar-poder-geral' })"
      />
    </div>
    <div class="list">
      <div
        v-for="poderGeral in poderesGerais.sort((a, b) => a.nome.localeCompare(b.nome))"
        :key="poderGeral.id"
        class="card"
      >
        <div class="card-header">
          <h4>{{ poderGeral.nome }}</h4>
          <h4>-</h4>
          <h4>{{ poderGeral.categoria }}</h4>
        </div>
        <div v-if="showMore.includes(poderGeral.id)">
          <p>
            {{ renderDescricaoCompleta(poderGeral.descricao) }} 
            <span 
              class="show-more"
              @click="handleShowLess(poderGeral.id)"
            >
              Ver menos
            </span>
          </p>
        </div>
        <div v-else>
          <p>
            {{ renderDescricao(poderGeral.descricao) }} 
            <span 
              class="show-more"
              @click="showMore.push(poderGeral.id)"
            >
              Ver mais
            </span>
          </p>
        </div>
        <div class="card-footer">
          <p-button 
            label="Editar"
            @click="router.push({ name: 'editar-poder-geral', params: { id: poderGeral.id } })"
          />
          <p-button 
            label="Detalhes"
            @click="router.push({ name: 'detalhes-poder-geral', params: { id: poderGeral.id } })"
          />
        </div>
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
.list {
  margin-top: 1rem
}
.card {
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--tormenta-background);
}
.card-header {
  display: flex;
}
.card-header h4 {
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 1rem;
  font-family: 'Tormenta', sans-serif;
  font-size: 24px;
  color: var(--tormenta-red);
}
.card p {
  margin-top: .5rem;
  margin-bottom: .5rem;
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