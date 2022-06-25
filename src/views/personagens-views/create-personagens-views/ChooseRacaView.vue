<script setup>
import { onMounted, ref } from 'vue'
import { _getDocs, _getDoc, _updateDoc } from '../../../firebase/firestore'
import { 
  renderDescricao,
  sortAtributos,
  sortAtributosDinamico,
  renderHabilidades
} from '@/utils/viewFunctions'
import ModalHabilidadesVue from '../../../components/ModalHabilidades.vue'

const props = defineProps({
  personagemId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['handle-next-step'])

const atributosOptions = [
  {label: 'Força', value: 'forca'},
  {label: 'Destreza', value: 'destreza'},
  {label: 'Constituição', value: 'constituicao'},
  {label: 'Inteligência', value: 'inteligencia'},
  {label: 'Sabedoria', value: 'sabedoria'},
  {label: 'Carisma', value: 'carisma'},
]

const personagem = ref()
const racas = ref([])
const isRacaChosen = ref(false)
const isRacaFinished = ref(false)
const openHabilidadesModal = ref(false)
const habilidadesModal = ref([])

onMounted(async () => {
  racas.value = await _getDocs('racas')
  personagem.value = await _getDoc('personagens', props.personagemId)
})

const handleHabilidadesModal = (habilidades) => {
  habilidadesModal.value = habilidades
  openHabilidadesModal.value = true
}

const chooseRaca = (raca) => {
  personagem.value.raca = raca

  if(raca.tipoAtributos === 'dinamico') {
    personagem.value.raca.atributosDinamicoEscolhidos = []
  } else if(raca.tipoAtributos === 'variante') {
    personagem.value.raca.varianteEscolhida = ''
  } else {
    isRacaFinished.value = true
  }

  isRacaChosen.value = true
}

const handleAtributosDinamico = () => {
  if(personagem.value.raca.atributosDinamicoEscolhidos.length > 3) {
    personagem.value.raca.atributosDinamicoEscolhidos.shift()
  }
  if(personagem.value.raca.atributosDinamicoEscolhidos.length === 3) {
    isRacaFinished.value = true
  } else {
    isRacaFinished.value = false
  }
}

const handleRacaVariante = () => {
  if(personagem.value.raca.varianteEscolhida) {
    isRacaFinished.value = true
  } else {
    isRacaFinished.value = false
  }
  console.log(personagem.value.raca.varianteEscolhida)
}

const handleChangeRaca = () => {
  isRacaChosen.value = false
  personagem.value.raca = {}
}

const handleSavePersonagem = async () => {
  _updateDoc(personagem.value)
    .then(emit('handle-next-step', 1))
}
</script>

<template>
  <div>
    <div v-if="!isRacaChosen">
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
              {{ sortAtributos(raca.atributos) }}.
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
                +2 em três atributos diferentes (exceto {{ raca.excecaoAtributo }}), {{ raca.excecaoAtributo }} -2.
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
              label="Detalhes"
              class="p-button-outlined"
              @click="handleHabilidadesModal(raca.habilidades)"
            />
            <p-button
              label="Escolher"
              @click="chooseRaca(raca)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p-button
        label="Mudar raça"
        class="change-raca-button"
        @click="handleChangeRaca"
      />
      <div>
        <!-- Nome -->
        <h3 class="card-title">
          {{ personagem.raca.nome }}
        </h3>
        <!-- Atributos -->
        <div v-if="personagem.raca.tipoAtributos === 'fixo'">
          <h4 class="card-atributos">
            {{ sortAtributos(personagem.raca.atributos) }}.
          </h4>
        </div>
        <div v-if="personagem.raca.tipoAtributos === 'dinamico'">
          <div v-if="!personagem.raca.excecaoAtributo">
            <h4 class="card-atributos">
              +2 em três atributos diferentes.
            </h4>
          </div>
          <div v-else>
            <h4 class="card-atributos">
              +2 em três atributos diferentes (exceto {{ personagem.raca.excecaoAtributo }}), {{ personagem.raca.excecaoAtributo }} -2.
            </h4>
          </div>
        </div>
        <div v-if="personagem.raca.tipoAtributos === 'variante'">
          <h4 class="card-atributos">
            {{ sortAtributosDinamico(personagem.raca.atributos, personagem.raca.variantes) }}
          </h4>
        </div>
        <!-- Habilidades -->
        <div 
          class="card-habilidades" 
          @click="handleHabilidadesModal(personagem.raca.habilidades)"
        >
          <h4>{{ renderHabilidades(personagem.raca.habilidades) }}</h4>
        </div>
      </div>
      <div v-if="personagem.raca.tipoAtributos === 'dinamico'">
        <h2>Escolha os atributos da Raça</h2>
        <p-select-button
          v-model="personagem.raca.atributosDinamicoEscolhidos"
          :options="atributosOptions"
          option-label="label"
          option-value="value"
          multiple
          @click="handleAtributosDinamico"
        />  
      </div>
      <div v-if="personagem.raca.tipoAtributos === 'variante'">
        <h2>Escolha a variante da Raça</h2>
        <p-select-button
          v-model="personagem.raca.varianteEscolhida"
          :options="personagem.raca.variantes"
          @click="handleRacaVariante"
        />
      </div>
      <p-button
        label="Continuar"
        class="continue-button"
        :disabled="!isRacaFinished"
        @click="handleSavePersonagem"
      />
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
.change-raca-button {
  display: block;
  margin-left: auto;
  margin-bottom: 2rem;
}
.continue-button {
  display: block;
  margin-left: auto;
  margin-top: 2rem;
}
</style>