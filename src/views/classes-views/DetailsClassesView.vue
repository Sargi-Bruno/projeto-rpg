<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { _getDoc } from '../../firebase/firestore'
import { renderArray } from '@/utils/viewFunctions'

const tipoMagiaDicionario = {
  Arcana: 'arcanas',
  Divina: 'divinas',
}

const intervaloAprendizadoOptions = [
  {label: 'cada nível', value: 0},
  {label: 'cada nível par', value: 1},
  {label: 'cada nível ímpar', value: 2},
]

const router = useRouter()
const route = useRoute()
const classe = ref()

onMounted(async () => {
  classe.value = await _getDoc('classes', route.params.id)
})
</script>

<template>
  <div
    v-if="classe"
    class="content"
  >
    <div class="header">
      <h1>{{ classe.nome }}</h1>
      <p-button
        label="Editar"
        @click="router.push({ name: 'editar-classe', params: { id: classe.id } })"
      />
    </div>
    <!-- Descrição -->
    <div class="content-wrapper">
      <div v-html="classe.descricao" />
    </div>
    <!-- Características de Classe -->
    <div class="content-wrapper">
      <h2 class="subtitle">
        Características de Classe
      </h2>
      <h4 class="info">
        Pontos de Vida. 
        <span>
          Começa com {{ classe.pvIniciais }} PV (+ mod. Con) e ganha {{ classe.pvPorNivel }} PV (+ mod. Con) por nível.
        </span>
      </h4>
      <h4 class="info">
        Pontos de Mana. 
        <span>
          {{ classe.pm }} PM por nível.
        </span>
      </h4>
      <h4 class="info">
        Perícias. 
        <span v-if="classe.pericias.escolha1">
          {{ classe.pericias.escolha1 }} ou {{ classe.pericias.escolha2 }},
        </span>
        <span>
          {{ renderArray(classe.pericias.concedidas) }},
        </span>
        <span>
          mais {{ classe.pericias.quantidade }} a sua escolha entre {{ renderArray(classe.pericias.opcoes) }}.
        </span>
      </h4>
      <h4 class="info">
        Proficiências. 
        <span v-if="classe.proficiencias.length > 0">
          {{ renderArray(classe.proficiencias) }}.
        </span>
        <span v-else>
          Nenhuma.
        </span>
      </h4>
    </div>
    <!-- Magias -->
    <div 
      v-if="classe.magias"
      class="content-wrapper"
    >
      <h2 class="subtitle">
        Magias
      </h2>
      <div
        v-for="(magia, index) in classe.magias"
        :key="index"
        class="magia-card"
      >
        <h4 v-if="magia.caminhoNome">
          Caminho do {{ magia.caminhoNome }}
        </h4>
        <p v-if="magia.escolherEscolas">
          Escolhe três escolas de magia. Uma vez feita, essa escolha não pode ser mudada.
        </p>
        <p>Você pode lançar magias <b>{{ tipoMagiaDicionario[magia.tipoMagia] }}</b> de 1º círculo.</p>
        <p v-if="magia.nivelCirculo2">
          Pode lançar magias do 2º círculo no <b>{{ magia.nivelCirculo2 }}º nível</b>.
        </p>
        <p v-if="magia.nivelCirculo3">
          Pode lançar magias do 3º círculo no <b>{{ magia.nivelCirculo3 }}º nível</b>.
        </p>
        <p v-if="magia.nivelCirculo4">
          Pode lançar magias do 4º círculo no  <b>{{ magia.nivelCirculo4 }}º nível</b>.
        </p>
        <p v-if="magia.nivelCirculo5">
          Pode lançar magias do 5º círculo no <b>{{ magia.nivelCirculo5 }}º nível</b>.
        </p>
        <p>
          Você começa com <b>{{ magia.quantidadeInicial }}</b> magias de 1º círculo<span v-if="magia.escolherEscolas"> que pertençam a essas escolas</span>.
        </p>
        <p>
          A <b>{{ intervaloAprendizadoOptions[magia.intervaloAprendizado].label }}</b>,
          aprende uma magia de qualquer cículo<span v-if="magia.escolherEscolas"> e escola</span> que possa lançar.
        </p>
        <p v-if="magia.penalidadeArmaduraLeve">
          Você pode lançar essas magias vestindo armaduras leves sem precisar de testes de Misticismo.
        </p>
        <p>
          Seu atributo-chave para lançar magias é <b>{{ magia.atributoChave }}</b>
          e você soma seu bônus de <b>{{ magia.atributoChave }}</b> no seu
          total de PM.
        </p>
      </div>
    </div>
    <!-- Tabela de Evolução -->
    <div class="content-wrapper">
      <h2 class="subtitle">
        Tabela de Evolução
      </h2>
      <div class="flex">
        <table class="table">
          <tr>
            <th>Nível</th>
            <th>Habilidades de Classe</th>
          </tr>
          <tr
            v-for="index in 10"
            :key="index"
          >
            <td>{{ index }}º</td>
            <td>{{ classe.tabelaDeEvolucao[index-1] }}</td>
          </tr>
        </table>
        <table class="table">
          <tr>
            <th>Nível</th>
            <th>Habilidades de Classe</th>
          </tr>
          <tr
            v-for="index in 10"
            :key="index"
          >
            <td>{{ +index+10 }}º</td>
            <td>{{ classe.tabelaDeEvolucao[+index+9] }}</td>
          </tr>
        </table>
      </div>
    </div>
    <!-- Habilidades de Classe -->
    <div class="content-wrapper">
      <h2 class="subtitle">
        Habilidades de Classe
      </h2>
      <div 
        v-for="(habilidade, index) in classe.habilidades"
        :key="index"
      >
        <h4 class="card-title">
          {{ habilidade.nome }}
        </h4>
        <div class="card-description">
          <div v-html="habilidade.descricao" />
        </div>
      </div>
    </div>
    <!-- Poder de Classe -->
    <div class="content-wrapper">
      <h2 class="subtitle">
        Poder de {{ classe.nome }}
      </h2>
      <div 
        v-for="(poder, index) in classe.poderes"
        :key="index"
        class="card"
      >
        <h4 class="card-title">
          {{ poder.nome }}
        </h4>
        <div class="card-description">
          <div v-html="poder.descricao" />
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
.header h1 {
  font-family: 'Tormenta', sans-serif;
  color: var(--tormenta-red);
}
.content-wrapper {
  margin-bottom: 3rem;
}
.subtitle {
  font-family: 'Tormenta', sans-serif;
  color: var(--tormenta-red);
}
.info {
  margin: 0;
  color: var(--tormenta-dark-red);
}
.info span {
  font-weight: normal;
  color: black;
}
.magia-card h4 {
  margin-bottom: 0;
}
.magia-card p {
  margin: 0;
}
.table {
  border-collapse: collapse;
  border-right: 1rem solid transparent;
}
.table tr:nth-child(odd) {
  background-color: var(--gray-300);
  border-right: 1rem solid var(--gray-300);
}
.table tr th {
  font-family: 'Tormenta', sans-serif;
  font-size: 20px;
  color: var(--tormenta-red);
}
.table tr th:first-of-type {
  width: 5rem;
  text-align: center;
  padding-right: 1rem;
}
.table tr td:first-of-type {
  text-align: center;
  padding-right: 1rem;
}
.table tr th:not(:first-of-type) {
  text-align: left;
}
.card-title {
  margin: 0;
  color: var(--tormenta-dark-red);
}
.card-description :deep(p) {
  margin-top: 0;
  margin-bottom: 1.5rem;
}
</style>