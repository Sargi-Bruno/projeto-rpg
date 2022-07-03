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
const origens = ref([])
const isOrigemChosen = ref(false)
const isOrigemFinished = ref(false)
const showMore = ref([])

onMounted(async () => {
  origens.value = await _getDocs('origens')
  personagem.value = await _getDoc('personagens', props.personagemId)
})

const chooseOrigem = (origem) => {
  isOrigemChosen.value = true
  personagem.value.origem = origem
  isOrigemFinished.value = true
}

const handleChangeOrigem = () => {
  isOrigemChosen.value = false
  personagem.value.origem = {}
}

const handleShowLess = (id) => {
  showMore.value = showMore.value.filter(value => {
    return value != id
  })
}

const handleSavePersonagem = async () => {
  _updateDoc(personagem.value)
    .then(emit('handle-next-step', 3))
}
</script>

<template>
  <div v-if="!isOrigemChosen">
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
      <div v-if="origem.descricao.length > 136">
        <div v-if="showMore.includes(origem.id)">
          <div>
            <div v-html="origem.descricao" />
            <span 
              class="show-more"
              @click="handleShowLess(origem.id)"
            >
              Ver menos
            </span>
          </div>
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
      </div>
      <div v-else>
        <div v-html="origem.descricao" />
      </div>
      <div class="card-footer">
        <p-button 
          label="Escolher"
          @click="chooseOrigem(origem)"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <div class="buttons-container">
      <p-button
        label="Mudar origem"
        @click="handleChangeOrigem"
      />
      <p-button
        label="Continuar"
        :disabled="!isOrigemFinished"
        @click="handleSavePersonagem"
      />
    </div>
    <div>
      <h1 class="title">
        {{ personagem.origem.nome }}
      </h1>
      <div v-html="personagem.origem.descricao" />
      <div class="info">
        <label class="subtitle">Itens</label> 
        <div v-html="personagem.origem.itens" />
      </div>
      <div class="info">
        <label class="subtitle">Benefícios</label> 
        <div v-html="personagem.origem.beneficios" />
      </div>
      <div class="info">
        <label class="subtitle">{{ personagem.origem.poderUnico.nome }}</label> 
        <div v-html="personagem.origem.poderUnico.descricao" />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}
</style>