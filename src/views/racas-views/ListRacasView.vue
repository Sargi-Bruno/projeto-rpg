<script setup>
import { onMounted, ref } from 'vue'
import { _getDocs } from '../../firebase/firestore'
import { 
  renderDescricao,
  sortAtributos,
  sortAtributosDinamico,
  renderHabilidades
} from '@/utils/viewFunctions'
import ModalHabilidadesVue from '../../components/ModalHabilidades.vue'

const racas = ref([])
const openHabilidadesModal = ref(false)
const habilidadesModal = ref([])

const handleHabilidadesModal = (habilidades) => {
  habilidadesModal.value = habilidades
  openHabilidadesModal.value = true
}

onMounted(async () => {
  racas.value = await _getDocs('racas')
})
</script>

<template>
  <div class="content">
    <div class="header">
      <h1 class="page-title">
        Raças
      </h1>
      <p-button
        label="Cadastrar"
        @click="$router.push({ name: 'criar-raca' })"
      />
    </div>
    <div class="list-content">   
      <div
        v-for="raca in racas.sort((a, b) => a.nome.localeCompare(b.nome))"
        :key="raca.id"
        class="card"
      >
        <!-- Nome -->
        <h3 class="card-title">
          {{ raca.nome }}
        </h3>
        <!-- Descrição -->
        <p class="card-description">
          {{ renderDescricao(raca.descricao) }}
        </p>
        <!-- Habilidades de Raça -->
        <h4 class="card-habilidades-title">
          Habilidades de Raça
        </h4>
        <!-- Atributos -->
        <div v-if="raca.tipoAtributos === 'fixo'">
          <h4 class="card-atributos">
            {{ sortAtributos(raca.atributos) }}
          </h4>
        </div>
        <div v-if="raca.tipoAtributos === 'dinamico'">
          <div v-if="!raca.excecaoAtributo">
            <h4 class="card-atributos">
              +2 em três atributos diferentes.
            </h4>
          </div>
          <div v-else>
            <h4 class="card-atributos">
              +2 em três atributos diferentes (exceto {{ raca.excecaoAtributo }}), {{ raca.excecaoAtributo }} -2
            </h4>
          </div>
        </div>
        <div v-if="raca.tipoAtributos === 'variante'">
          <h4 class="card-atributos">
            {{ sortAtributosDinamico(raca.atributos, raca.variantes) }}
          </h4>
        </div>
        <!-- Habilidades -->
        <div 
          class="card-habilidades" 
          @click="handleHabilidadesModal(raca.habilidades)"
        >
          <h4>{{ renderHabilidades(raca.habilidades) }}</h4>
        </div>
        <!-- Footer -->
        <div class="card-footer">
          <p-button
            label="Habilidades"
            @click="handleHabilidadesModal(raca.habilidades)"
          />
          <p-button
            label="Ver mais"
            @click="$router.push({ name: 'detalhes-raca', params: { id: raca.id } })"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- Habilidades Modal -->
  <div>
    <vue-final-modal 
      v-model="openHabilidadesModal" 
      classes="modal-container"
    >
      <ModalHabilidadesVue 
        :habilidades-modal="habilidadesModal"
        @handle-close="openHabilidadesModal = false"
      />
    </vue-final-modal>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
.card-description {
  margin: 0;
  font-size: 14px;
}
.card-habilidades-title {
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-family: 'Tormenta', sans-serif;
  font-size: 20px;
  color: var(--tormenta-red);
}
.card-atributos {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--tormenta-dark-red);
}
.card-habilidades {
  cursor: pointer;
}
.card-habilidades h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>