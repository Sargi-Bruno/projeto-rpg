<script setup>
import { onMounted, ref } from 'vue'
import { _getDocs, _getDoc, _updateDoc } from '../../../firebase/firestore'
import { renderDescricao } from '@/utils/viewFunctions'
import ModalClasse from '../../../components/ModalClasse.vue';

const props = defineProps({
  personagemId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['handle-next-step'])

const personagem = ref()
const classes = ref([])
const isClasseChosen = ref(false)
// const isClasseFinished = ref(false)
const openModal = ref(false)
const modalContent = ref()

onMounted(async () => {
  classes.value = await _getDocs('classes')
  personagem.value = await _getDoc('personagens', props.personagemId)
})

const handleOpenModal = (content) => {
  modalContent.value = content
  openModal.value = true
}

const chooseClasse = (classe) => {
  isClasseChosen.value = true
  personagem.value.classe = classe
}

const handleChangeClasse = () => {
  isClasseChosen.value = false
  personagem.value.classe = {}
}

const handleSavePersonagem = async () => {
  _updateDoc(personagem.value)
    .then(emit('handle-next-step', 2))
}
</script>

<template>
  <div>
    <div v-if="!isClasseChosen">
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
              label="Detalhes"
              class="p-button-outlined"
              @click="handleOpenModal(classe)"
            />
            <p-button
              label="Escolher"
              @click="chooseClasse(classe)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p-button
        label="Escolher outra classe"
        @click="handleChangeClasse"
      />
      <!-- <div>
        <p-card>
          <template #title>
            {{ personagem.classe.nome }}
          </template>
          <template #content>
            <div v-html="personagem.classe.descricao" />
          </template>
        </p-card>
      </div> -->
      <p-button
        label="Salvar"
        @click="handleSavePersonagem"
      />
    </div>
    <!-- Classe Modal -->
    <div v-if="modalContent">
      <vue-final-modal 
        v-model="openModal" 
        classes="modal-container"
      >
        <ModalClasse 
          :classe="modalContent"
          @handle-close="openModal = false"
        />
      </vue-final-modal>
    </div>
  </div>
</template>

<style scoped>
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
.card-footer button:first-of-type {
  margin-right: 1rem;
}
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>