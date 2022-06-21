<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'
import { renderDescricao } from '@/utils/viewFunctions'

const router = useRouter()
const classes = ref([])

onMounted(async () => {
  classes.value = await _getDocs('classes')
})
</script>

<template>
  <div class="content">
    <div class="header">
      <h1 class="page-title">
        Classes
      </h1>
      <p-button
        label="Cadastrar"
        @click="router.push({ name: 'criar-classe' })"
      />
    </div>
    <div class="list-content">
      <div
        v-for="classe in classes.sort((a, b) => a.nome.localeCompare(b.nome))"
        :key="classe.id"
        class="card"
      >
        <h3 class="card-title">
          {{ classe.nome }}
        </h3>
        <div class="card-row">
          <h4 class="card-info">
            Pontos de Vida: 
            <span>
              Começa com {{ classe.pvIniciais }} PV (+ mod. Con) e ganha {{ classe.pvPorNivel }} PV (+ mod. Con) por nível.
            </span>
          </h4>
          <h4 class="card-info">
            Pontos de Mana: 
            <span>
              {{ classe.pm }} PM por nível.
            </span>
          </h4>
        </div>
        <p class="card-description">
          {{ renderDescricao(classe.descricao) }}
        </p>
        <div class="card-footer">
          <p-button
            label="Ver mais"
            @click="router.push({ name: 'detalhes-classe', params: { id: classe.id } })"
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
.list-content {
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 1.5rem;
}
.card {
  display: flex;
  flex-direction: column;
  width: 24rem;
  height: 21rem;
  margin-bottom: 2rem;
  padding: 1rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--tormenta-background);
}
.card-title {
  margin: 0;
  font-family: 'Tormenta', sans-serif;
  font-size: 28px;
  color: var(--tormenta-red);
}
.card-info {
  margin: 0;
  color: var(--tormenta-dark-red);
}
.card-info span {
  font-weight: normal;
  color: black;
}
.card-description {
  margin-top: 1rem;
  margin-bottom: 0;
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--tormenta-dark-red);
}
</style>