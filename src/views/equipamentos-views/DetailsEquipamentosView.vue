<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { _getDoc } from '../../firebase/firestore'
import { renderArray } from '@/utils/viewFunctions.js'

const router = useRouter()
const route = useRoute()
const equipamento = ref()

onMounted(async () => {
  equipamento.value = await _getDoc('equipamentos', route.params.id)
})
</script>

<template>
  <div
    v-if="equipamento"
    class="content"
  >
    <div class="header">
      <h1 class="title">
        {{ equipamento.nome }}
      </h1>
      <p-button
        label="Editar"
        @click="router.push({ name: 'editar-equipamento', params: { id: equipamento.id } })"
      />
    </div>
    <div 
      v-if="equipamento.categoria === 'Arma'"
      class="flex"
    >
      <h4 class="card-subtitle">
        {{ equipamento.facilidadeDeUso }}
      </h4>
      <h4 class="card-subtitle">
        -
      </h4>
      <h4 class="card-subtitle">
        {{ equipamento.proposito }}
      </h4>
      <h4 class="card-subtitle">
        -
      </h4>
      <h4 class="card-subtitle">
        {{ equipamento.subdivisao }}
      </h4>
    </div>
    <div v-if="equipamento.categoria === 'Armadura' || equipamento.categoria === 'Itens e Serviços'">
      <h4 class="card-subtitle">
        {{ equipamento.classificacao }}
      </h4>
    </div>
    <div 
      v-if="equipamento.categoria === 'Escudo'"
      class="flex"
    >
      <h4 class="card-subtitle">
        {{ equipamento.proposito }}
      </h4>
      <h4 class="card-subtitle">
        -
      </h4>
      <h4 class="card-subtitle">
        {{ equipamento.subdivisao }}
      </h4>
    </div>
    <div class="flex">
      <div 
        v-if="equipamento.categoria === 'Arma' || equipamento.categoria === 'Escudo'"
        class="flex"
      >
        <div v-if="equipamento.dano.quantidade">
          <h4 class="card-info">
            Dano: <span>{{ equipamento.dano.quantidade }}{{ equipamento.dano.dado }}</span>
          </h4>
        </div>
        <div v-if="equipamento.critico.margemDeAmeaca">
          <h4 class="card-info">
            Crítico: <span>{{ equipamento.critico.margemDeAmeaca }}/{{ equipamento.critico.multiplicador }}x</span>
          </h4>
        </div>
        <div v-if="equipamento.alcance">
          <h4 class="card-info">
            Alcance: <span>{{ equipamento.alcance }}</span>
          </h4>
        </div>
        <div v-if="equipamento.tipo">
          <h4 class="card-info">
            Tipo: <span>{{ renderArray(equipamento.tipo) }}</span>
          </h4>
        </div>
        <div v-if="equipamento.habilidadesDeArmas.length > 0">
          <h4 class="card-info">
            Habilidades de Armas: <span>{{ renderArray(equipamento.habilidadesDeArmas) }}</span>
          </h4>
        </div>
      </div>
      <div 
        v-if="equipamento.categoria === 'Escudo' || equipamento.categoria === 'Armadura'"
        class="flex"
      >
        <div v-if="equipamento.defesa">
          <h4 class="card-info">
            Bônus na Defesa: <span>{{ equipamento.defesa }}</span>
          </h4>
        </div>
        <div v-if="equipamento.penalidade">
          <h4 class="card-info">
            Penalidade de Armadura: <span>{{ equipamento.penalidade }}</span>
          </h4>
        </div>
      </div>
      <div class="flex">
        <div v-if="equipamento.preco">
          <h4 class="card-info">
            Preço: <span>T$ {{ equipamento.preco }}</span>
          </h4>
        </div>
        <div v-else>
          <h4 class="card-info">
            Preço: <span>-</span>
          </h4>
        </div>
        <div v-if="equipamento.peso">
          <h4 class="card-info">
            Peso: <span>{{ equipamento.peso }}kg</span>
          </h4>
        </div>
        <div v-else>
          <h4 class="card-info">
            Peso: <span>-</span>
          </h4>
        </div>
      </div>
    </div>
    <div 
      v-if="equipamento.subdivisao === 'Disparo'"
      class="flex"
    >
      <div>
        <h4 class="card-info">
          Munição: <span>{{ equipamento.municao.nome }} ({{ equipamento.municao.quantidade }})</span>
        </h4>
      </div>
      <div v-if="equipamento.municao.preco">
        <h4 class="card-info">
          Preço: <span>T$ {{ equipamento.municao.preco }}</span>
        </h4>
      </div>
      <div v-else>
        <h4 class="card-info">
          Preço: <span>-</span>
        </h4>
      </div>
      <div v-if="equipamento.municao.peso">
        <h4 class="card-info">
          Peso: <span>{{ equipamento.municao.peso }}kg</span>
        </h4>
      </div>
      <div v-else>
        <h4 class="card-info">
          Peso: <span>-</span>
        </h4>
      </div>
    </div>
    <div class="description">
      <div v-html="equipamento.descricao" />
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
.description {
  margin-bottom: 2rem;
}
</style>