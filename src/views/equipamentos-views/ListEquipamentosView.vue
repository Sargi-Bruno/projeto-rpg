<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { _getDocs } from '../../firebase/firestore'
import { renderDescricao, renderArray } from '@/utils/viewFunctions.js'

const router = useRouter()
const equipamentos = ref([])
const showMore = ref([])

const handleShowLess = (id) => {
  showMore.value = showMore.value.filter(value => {
    return value != id
  })
}

onMounted(async () => {
  equipamentos.value = await _getDocs('equipamentos')
})
</script>

<template>
  <div class="content">
    <div class="header">
      <h1>Listar Equipamentos</h1>
      <p-button
        label="Cadastrar"
        @click="router.push({ name: 'criar-equipamento' })"
      />
    </div>
    <div
      v-for="equipamento in equipamentos.sort((a, b) => a.nome.localeCompare(b.nome))"
      :key="equipamento.id"
      class="card"
    >
      <h4 class="card-title">
        {{ equipamento.nome }}
      </h4>
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
      <div v-if="equipamento.descricao.length > 136">
        <div v-if="showMore.includes(equipamento.id)">
          <div>
            <div v-html="equipamento.descricao" />
            <span 
              class="show-more"
              @click="handleShowLess(equipamento.id)"
            >
              Ver menos
            </span>
          </div>
        </div>
        <div v-else>
          <p>
            {{ renderDescricao(equipamento.descricao) }} 
            <span
              class="show-more"
              @click="showMore.push(equipamento.id)"
            >
              Ver mais
            </span>
          </p>
        </div>
      </div>
      <div v-else>
        <div v-html="equipamento.descricao" />
      </div>
      <div class="card-footer">
        <p-button 
          label="Editar"
          @click="router.push({ name: 'editar-equipamento', params: { id: equipamento.id } })"
        />
        <p-button 
          label="Detalhes"
          @click="router.push({ name: 'detalhes-equipamento', params: { id: equipamento.id } })"
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