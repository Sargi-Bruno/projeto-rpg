<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'
import { renderDescricao, renderDescricaoCompleta } from '@/utils/viewFunctions.js'

const router = useRouter()
const showMore = ref([])
const divindades = ref([])

const handleShowLess = (id) => {
  showMore.value = showMore.value.filter(value => {
    return value != id
  })
}

onMounted(async () => {
  divindades.value = await _getDocs('divindades')
})
</script>

<template>
  <div class="content">
    <div class="header">
      <h1>Listar Divindades</h1>
      <p-button
        label="Cadastrar"
        @click="router.push({ name: 'criar-divindade' })"
      />
    </div>
    <div
      v-for="divindade in divindades.sort((a, b) => a.nome.localeCompare(b.nome))"
      :key="divindade.id"
      class="card"
    >
      <h4 class="card-title">
        {{ divindade.nome }}
      </h4>
      <div class="card-row">   
        <div class="card-info">
          <label class="card-subtitle">Energia</label> 
          <p>{{ divindade.canalizarEnergia }}.</p>
        </div>
        <div class="card-info">
          <label class="card-subtitle">Arma</label> 
          <div v-html="divindade.armaPreferida" />
        </div>
        <div class="card-info">
          <label class="card-subtitle">Poderes Concedidos</label> 
          <div v-html="divindade.poderesConcedidos" />
        </div>
      </div>
      <div v-if="showMore.includes(divindade.id)">
        <p>
          {{ renderDescricaoCompleta(divindade.descricao) }} 
          <span 
            class="show-more"
            @click="handleShowLess(divindade.id)"
          >
            Ver menos
          </span>
        </p>
      </div>
      <div v-else>
        <p>
          {{ renderDescricao(divindade.descricao) }} 
          <span 
            class="show-more"
            @click="showMore.push(divindade.id)"
          >
            Ver mais
          </span>
        </p>
      </div>
      <div class="card-footer">
        <p-button 
          label="Editar"
          @click="router.push({ name: 'editar-divindade', params: { id: divindade.id } })"
        />
        <p-button 
          label="Detalhes"
          @click="router.push({ name: 'detalhes-divindade', params: { id: divindade.id } })"
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
.card-row {
  display: flex;
}
.card-info {
  margin-right: 2rem;
  max-width: 43.75rem;
}
.card-info :deep(p) {
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