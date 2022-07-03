<script setup>
import { onMounted, ref } from 'vue'
import { _getDocs, _getDoc, _updateDoc } from '../../../firebase/firestore'
import { renderDescricao } from '@/utils/viewFunctions.js'

const props = defineProps({
  personagemId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['handle-next-step'])

const personagem = ref()
const divindades = ref([])
const isDivindadeChosen = ref(false)
const isDivindadeFinished = ref(false)
const showMore = ref([])

onMounted(async () => {
  divindades.value = await _getDocs('divindades')
  personagem.value = await _getDoc('personagens', props.personagemId)
})

const handleShowLess = (id) => {
  showMore.value = showMore.value.filter(value => {
    return value != id
  })
}

const chooseDivindade = (divindade) => {
  isDivindadeChosen.value = true
  personagem.value.divindade = divindade
  isDivindadeFinished.value = true
}

const handleChangeDivindade = () => {
  isDivindadeChosen.value = false
  personagem.value.divindade = {}
}

const handleSavePersonagem = async () => {
  _updateDoc(personagem.value)
    .then(emit('handle-next-step', 4))
}
</script>

<template>
  <div v-if="!isDivindadeChosen">
    <p-button
      class="pular-button"
      label="Pular"
      @click="handleSavePersonagem"
    />
    <div
      v-for="divindade in divindades"
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
      <div v-if="divindade.descricao.length > 136">
        <div v-if="showMore.includes(divindade.id)">
          <div>
            <div v-html="divindade.descricao" />
            <span 
              class="show-more"
              @click="handleShowLess(divindade.id)"
            >
              Ver menos
            </span>
          </div>
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
      </div>
      <div v-else>
        <div v-html="divindade.descricao" />
      </div>
      <div class="card-footer">
        <p-button 
          label="Escolher"
          @click="chooseDivindade(divindade)"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <div class="buttons-container">
      <p-button
        label="Mudar origem"
        @click="handleChangeDivindade"
      />
      <p-button
        label="Continuar"
        :disabled="!isDivindadeFinished"
        @click="handleSavePersonagem"
      />
    </div>
    <div>
      <h1 class="title">
        {{ personagem.divindade.nome }}
      </h1>
    </div>
    <div v-html="personagem.divindade.descricao" />
    <div class="info">
      <label class="subtitle">Crenças e Objetivos</label> 
      <div v-html="personagem.divindade.crencasObjetivos" />
    </div>
    <div class="info">
      <label class="subtitle">Devotos</label> 
      <div v-html="personagem.divindade.devotos" />
    </div>
    <div class="info">
      <label class="subtitle">Símbolo Sagrado</label> 
      <div v-html="personagem.divindade.simboloSagrado" />
    </div>
    <div class="info">
      <label class="subtitle">Canalizar Energia</label> 
      <p>{{ personagem.divindade.canalizarEnergia }}</p>
    </div>
    <div class="info">
      <label class="subtitle">Arma Preferida</label> 
      <div v-html="personagem.divindade.armaPreferida" />
    </div>
    <div class="info">
      <label class="subtitle">Obrigações & Restrições</label> 
      <div v-html="personagem.divindade.obrigacoesRestricoes" />
    </div>
    <div class="info">
      <label class="subtitle">Poderes Concedidos</label> 
      <div v-html="personagem.divindade.poderesConcedidos" />
    </div>
  </div>
</template>

<style scoped>
.pular-button {
  display: block;
  margin-left: auto;
  margin-bottom: 2rem;
}
.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
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
  margin-top: 1rem;
}
.card-footer button {
  margin-top: 1rem;
  margin-left: 1rem;
}
.title {
  font-family: 'Tormenta', sans-serif;
  color: var(--tormenta-red);
}
.subtitle {
  font-family: 'Tormenta', sans-serif;
  color: var(--tormenta-red);
}
.info {
  margin-top: 1rem;
}
.info :deep(p) {
  margin: 0;
}
.info:last-of-type {
  margin-bottom: 2rem;
}
</style>