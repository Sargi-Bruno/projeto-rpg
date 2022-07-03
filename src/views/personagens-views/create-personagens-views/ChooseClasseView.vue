<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { _getDocs, _getDoc, _updateDoc, getMagiasForCharCreation } from '../../../firebase/firestore'
import { renderDescricao, renderArray } from '@/utils/viewFunctions'
import ModalClasse from '../../../components/ModalClasse.vue';
import { computed } from '@vue/reactivity';

const props = defineProps({
  personagemId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['handle-next-step'])

const intervaloAprendizadoOptions = [
  {label: 'cada nível', value: 0},
  {label: 'cada nível par', value: 1},
  {label: 'cada nível ímpar', value: 2},
]

const escolasOptions = [
  'Abujuração',
  'Adivinhação',
  'Convocação',
  'Encantamento',
  'Evocação',
  'Ilusão',
  'Necromancia',
  'Transmutação'
]

const tipoMagiaDicionario = {
  Arcana: 'arcanas',
  Divina: 'divinas',
}

const personagem = ref()
const classes = ref([])
const isClasseChosen = ref(false)
const openModal = ref(false)
const modalContent = ref()
const periciaOpcionalEscolhida = ref('')
const periciasClasseEscolhidas = ref([])
const escolasEscolhidas = ref([])
const isMagiasTipoCaminhos = ref(false)
const isMagiasRedyToChoose = ref(true)
const caminhoToChoose = ref()
const magiaToChoose = ref()
const isEscolaButtonDisabled = ref(true)
const isEscolhaEscolasFinished = ref(false)
const magiasList = ref([])
const showMore = ref([])

onMounted(async () => {
  classes.value = await _getDocs('classes')
  personagem.value = await _getDoc('personagens', props.personagemId)
})

watchEffect(async () => {
  if(isClasseChosen.value) {
    if(isMagiasRedyToChoose.value) {
      magiasList.value = await getMagiasForCharCreation(magiaToChoose.value.tipoMagia)
    }
  } 
})

const magiasListComputed = computed(() => {
  if(magiasList.value) {
    if(escolasEscolhidas.value.length > 0) {
      magiasList.value = magiasList.value.filter(magia => {
        return escolasEscolhidas.value.includes(magia.escola) 
      })
    }
  }

  return magiasList.value
})

const isPericiaConcecidaFinished = computed(() => {
  if(!personagem.value.classe.pericias.escolha1) return true

  if(periciaOpcionalEscolhida.value) return true

  return false
})

const isPericiaClasseFinished = computed(() => {
  if(periciasClasseEscolhidas.value.length === personagem.value.classe.pericias.quantidade) return true

  return false
})

const isCaractisticasFinished = computed(() => {
  if(isPericiaConcecidaFinished.value && isPericiaClasseFinished.value) return true

  return false
})

const isMagiasFinished = computed(() => {
  if(!personagem.value.classe.magias) return true

  if(magiaToChoose.value) {
    if(personagem.value.magias.length === magiaToChoose.value.quantidadeInicial) return true
  }

  return false
})

const isClasseFinished = computed(() => {
  if(isCaractisticasFinished.value && isMagiasFinished.value) return true

  return false
})

const handleShowLess = (id) => {
  showMore.value = showMore.value.filter(value => {
    return value != id
  })
}

const handleOpenModal = (content) => {
  modalContent.value = content
  openModal.value = true
}

const chooseClasse = (classe) => {
  isClasseChosen.value = true
  personagem.value.classe = classe

  if(classe.magias) {
    if(classe.magias.length > 1) {
      isMagiasTipoCaminhos.value = true
      isMagiasRedyToChoose.value = false
      caminhoToChoose.value = classe.magias
    } else {
      magiaToChoose.value = classe.magias[0]

      if(magiaToChoose.value.escolherEscolas) {
        isMagiasRedyToChoose.value = false
      }
    }

    personagem.value.magias = []
  } 
  else {
    isMagiasRedyToChoose.value = false
  }
}

const handleChangeClasse = () => {
  isClasseChosen.value = false
  personagem.value.classe = {}

  periciaOpcionalEscolhida.value = ''
  periciasClasseEscolhidas.value = []
  escolasEscolhidas.value = []
  isMagiasTipoCaminhos.value = false
  isMagiasRedyToChoose.value = true
  caminhoToChoose.value = null
  magiaToChoose.value = null
  isEscolaButtonDisabled.value = true
  isEscolhaEscolasFinished.value = false
  magiasList.value = []
  showMore.value = []
}

const handlePericiasClasse = () => {
  if(periciasClasseEscolhidas.value.length > personagem.value.classe.pericias.quantidade) {
    periciasClasseEscolhidas.value.shift()
  }
}

const handleSaveCaminho = (index) => {
  magiaToChoose.value = caminhoToChoose.value[index]
  isMagiasTipoCaminhos.value = false

  if(!magiaToChoose.value.escolherEscolas) isMagiasRedyToChoose.value = true
}

const handleEscolas = () => {
  if(escolasEscolhidas.value.length > 3) {
    escolasEscolhidas.value.shift()
  }

  if(escolasEscolhidas.value.length === 3) {
    isEscolaButtonDisabled.value = false
  } else {
    isEscolaButtonDisabled.value = true
  }
}

const handleSaveEscolas = () => {
  if(escolasEscolhidas.value.length === 3) {
    isMagiasRedyToChoose.value = true
    isEscolhaEscolasFinished.value = true
  }
}

const handleAddMagia = (magia) => {
  if(personagem.value.magias.length >= magiaToChoose.value.quantidadeInicial) return
  personagem.value.magias.push(magia)
  const index = magiasList.value.findIndex((x) => {
    return x.id === magia.id
  })
  magiasList.value.splice(index, 1)
}

const handleRemoveMagia = (magia) => {
  const index = personagem.value.magias.findIndex((x) => {
    return x.id === magia.id
  })
  personagem.value.magias.splice(index, 1)
  magiasList.value.push(magia)
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
      <div class="buttons-container">
        <p-button
          label="Mudar classe"
          @click="handleChangeClasse"
        />
        <p-button
          label="Continuar"
          :disabled="!isClasseFinished"
          @click="handleSavePersonagem"
        />
      </div>
      <div>
        <h3 class="card-title">
          {{ personagem.classe.nome }}
        </h3>
        <div>
          <p-tab-view>
            <!-- Características -->
            <p-tab-panel header="Características">
              <h4 class="info">
                Pontos de Vida. 
                <span>
                  Começa com {{ personagem.classe.pvIniciais }} PV (+ mod. Con) e ganha {{ personagem.classe.pvPorNivel }} PV (+ mod. Con) por nível.
                </span>
              </h4>
              <h4 class="info">
                Pontos de Mana. 
                <span>
                  {{ personagem.classe.pm }} PM por nível.
                </span>
              </h4>
              <h4 class="info">
                Perícias Concedidas. 
                <span>
                  Você começa com {{ renderArray(personagem.classe.pericias.concedidas) }}.
                </span>
              </h4>
              <h4 class="info">
                Proficiências. 
                <span v-if="personagem.classe.proficiencias.length > 0">
                  {{ renderArray(personagem.classe.proficiencias) }}.
                </span>
                <span v-else>
                  Nenhuma.
                </span>
              </h4>
              <h3>Perícias Adicionais</h3>
              <div 
                v-if="personagem.classe.pericias.escolha1"
                class="pericia-input-container"
              >
                <label for="pericia-concedida">Você pode escolher livremente entre</label>
                <p-dropdown
                  id="pericia-concedida"
                  v-model="periciaOpcionalEscolhida"
                  :options="[personagem.classe.pericias.escolha1, personagem.classe.pericias.escolha2]"
                />
              </div>
              <div class="pericia-input-container">
                <label for="pericias-classe">Você pode escolher mais {{ personagem.classe.pericias.quantidade }} entre</label>
                <p-multi-select
                  id="pericias-classe"
                  v-model="periciasClasseEscolhidas"
                  :options="personagem.classe.pericias.opcoes"
                  :show-toggle-all="false" 
                  @change="handlePericiasClasse"
                />
              </div>
            </p-tab-panel>
            <!-- Habilidades -->
            <p-tab-panel header="Habilidades">
              <div 
                v-for="(habilidade, index) in personagem.classe.habilidades"
                :key="index"
              >
                <div
                  v-if="habilidade.nivelConcedido===1"
                >
                  <h4 class="card-habilidade-title">
                    {{ habilidade.nome }}
                  </h4>
                  <div class="card-habilidade-description">
                    <div v-html="habilidade.descricao" />
                  </div>
                </div>
              </div>
            </p-tab-panel>
            <!-- Magias -->
            <p-tab-panel 
              v-if="personagem.classe.magias"
              header="Magias"
            >
              <!-- Escolher caminho de magia -->
              <div v-if="isMagiasTipoCaminhos">
                <div
                  v-for="(caminho, index) in caminhoToChoose"
                  :key="index"
                  class="caminho-card"
                >
                  <div>
                    <h4 v-if="caminho.caminhoNome">
                      Caminho do {{ caminho.caminhoNome }}
                    </h4>
                    <p v-if="caminho.escolherEscolas">
                      Escolhe três escolas de caminho. Uma vez feita, essa escolha não pode ser mudada.
                    </p>
                    <p>Você pode lançar magias <b>{{ tipoMagiaDicionario[caminho.tipoMagia] }}</b> de 1º círculo.</p>
                    <p v-if="caminho.nivelCirculo2">
                      Pode lançar magias do 2º círculo no <b>{{ caminho.nivelCirculo2 }}º nível</b>.
                    </p>
                    <p v-if="caminho.nivelCirculo3">
                      Pode lançar magias do 3º círculo no <b>{{ caminho.nivelCirculo3 }}º nível</b>.
                    </p>
                    <p v-if="caminho.nivelCirculo4">
                      Pode lançar magias do 4º círculo no  <b>{{ caminho.nivelCirculo4 }}º nível</b>.
                    </p>
                    <p v-if="caminho.nivelCirculo5">
                      Pode lançar magias do 5º círculo no <b>{{ caminho.nivelCirculo5 }}º nível</b>.
                    </p>
                    <p>
                      Você começa com <b>{{ caminho.quantidadeInicial }}</b> magias de 1º círculo<span v-if="caminho.escolherEscolas"> que pertençam a essas escolas</span>.
                    </p>
                    <p>
                      A <b>{{ intervaloAprendizadoOptions[caminho.intervaloAprendizado].label }}</b>,
                      aprende uma caminho de qualquer cículo<span v-if="caminho.escolherEscolas"> e escola</span> que possa lançar.
                    </p>
                    <p v-if="caminho.penalidadeArmaduraLeve">
                      Você pode lançar essas magias vestindo armaduras leves sem precisar de testes de Misticismo.
                    </p>
                    <p>
                      Seu atributo-chave para lançar magias é <b>{{ caminho.atributoChave }}</b>
                      e você soma seu bônus de <b>{{ caminho.atributoChave }}</b> no seu
                      total de PM.
                    </p>
                  </div>
                  <div class="caminho-add-button">
                    <p-button 
                      label="Escolher caminho"
                      @click="handleSaveCaminho(index)"
                    />
                  </div>
                </div>
              </div>
              <div v-if="magiaToChoose">
                <!-- Escolher escolas de magia -->
                <div v-if="magiaToChoose.escolherEscolas && !isEscolhaEscolasFinished">
                  <p>
                    Você pode lançar magias {{ tipoMagiaDicionario[magiaToChoose.tipoMagia] }} de 1º círculo.
                  </p>
                  <label for="escolas">
                    Escolhe três escolas de magia. Uma vez feita, essa escolha não pode ser mudada.
                  </label>
                  <div class="escola-input-container">
                    <p-multi-select
                      id="escolas"
                      v-model="escolasEscolhidas"
                      :options="escolasOptions"
                      :show-toggle-all="false" 
                      @change="handleEscolas"
                    />
                    <p-button
                      label="Confirmar"
                      :disabled="isEscolaButtonDisabled"
                      @click="handleSaveEscolas"
                    />
                  </div>
                </div>
                <!-- Escolher magias -->
                <div v-if="isMagiasRedyToChoose">
                  <p>Você pode lançar magias <b>{{ tipoMagiaDicionario[magiaToChoose.tipoMagia] }}</b> de 1º círculo. Você começa com <b>{{ magiaToChoose.quantidadeInicial }}</b> magias de 1º círculo<span v-if="magiaToChoose.escolherEscolas"> que pertençam a {{ renderArray(escolasEscolhidas) }}</span>.</p>
                  <h3>Magias Conhecidas {{ personagem.magias.length }}/{{ magiaToChoose.quantidadeInicial }}</h3>
                  <div v-if="personagem.magias.length > 0">
                    <div
                      v-for="magia in personagem.magias.sort((a, b) => a.nome.localeCompare(b.nome))"
                      :key="magia.id"
                      class="magia-card"
                    >
                      <h4 class="magia-card-title">
                        {{ magia.nome }}
                      </h4>
                      <div class="magia-card-row">
                        <h4 class="magia-card-subtitle">
                          {{ magia.classificacao }}
                        </h4>
                        <h4 class="magia-card-subtitle">
                          {{ magia.circulo }}
                        </h4>
                        <h4 class="magia-card-subtitle">
                          ({{ magia.escola }})
                        </h4>
                      </div>
                      <div class="magia-card-row">
                        <div v-if="magia.execucao">
                          <h4 class="magia-card-info">
                            Execução: <span>{{ magia.execucao }};</span>
                          </h4>
                        </div>
                        <div v-if="magia.alcance">
                          <h4 class="magia-card-info">
                            Alcance: <span>{{ magia.alcance }};</span>
                          </h4>
                        </div>
                        <div v-if="magia.alvo">
                          <h4 class="magia-card-info">
                            Alvo: <span>{{ magia.alvo }};</span>
                          </h4>
                        </div>
                        <div v-if="magia.duracao">
                          <h4 class="magia-card-info">
                            Ducação: <span>{{ magia.duracao }};</span>
                          </h4>
                        </div>
                      </div>
                      <div v-if="magia.descricao.length > 136">
                        <div v-if="showMore.includes(magia.id)">
                          <div>
                            <div v-html="magia.descricao" />
                            <span 
                              class="show-more"
                              @click="handleShowLess(magia.id)"
                            >
                              Ver menos
                            </span>
                          </div>
                        </div>
                        <div v-else>
                          <p>
                            {{ renderDescricao(magia.descricao) }} 
                            <span
                              class="show-more"
                              @click="showMore.push(magia.id)"
                            >
                              Ver mais
                            </span>
                          </p>
                        </div>
                      </div>
                      <div v-else>
                        <div v-html="magia.descricao" />
                      </div>
                      <div class="magia-card-footer">
                        <p-button 
                          label="Remover"
                          @click="handleRemoveMagia(magia)"
                        />
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <p>Você ainda não aprendeu magias.</p>
                  </div>
                  <h3>Aprender Magia</h3>
                  <div v-if="magiasListComputed">
                    <div
                      v-for="magia in magiasListComputed.sort((a, b) => a.nome.localeCompare(b.nome))"
                      :key="magia.id"
                      class="magia-card"
                    >
                      <h4 class="magia-card-title">
                        {{ magia.nome }}
                      </h4>
                      <div class="magia-card-row">
                        <h4 class="magia-card-subtitle">
                          {{ magia.classificacao }}
                        </h4>
                        <h4 class="magia-card-subtitle">
                          {{ magia.circulo }}
                        </h4>
                        <h4 class="magia-card-subtitle">
                          ({{ magia.escola }})
                        </h4>
                      </div>
                      <div class="magia-card-row">
                        <div v-if="magia.execucao">
                          <h4 class="magia-card-info">
                            Execução: <span>{{ magia.execucao }};</span>
                          </h4>
                        </div>
                        <div v-if="magia.alcance">
                          <h4 class="magia-card-info">
                            Alcance: <span>{{ magia.alcance }};</span>
                          </h4>
                        </div>
                        <div v-if="magia.alvo">
                          <h4 class="magia-card-info">
                            Alvo: <span>{{ magia.alvo }};</span>
                          </h4>
                        </div>
                        <div v-if="magia.duracao">
                          <h4 class="magia-card-info">
                            Ducação: <span>{{ magia.duracao }};</span>
                          </h4>
                        </div>
                      </div>
                      <div v-if="magia.descricao.length > 136">
                        <div v-if="showMore.includes(magia.id)">
                          <div>
                            <div v-html="magia.descricao" />
                            <span 
                              class="show-more"
                              @click="handleShowLess(magia.id)"
                            >
                              Ver menos
                            </span>
                          </div>
                        </div>
                        <div v-else>
                          <p>
                            {{ renderDescricao(magia.descricao) }} 
                            <span
                              class="show-more"
                              @click="showMore.push(magia.id)"
                            >
                              Ver mais
                            </span>
                          </p>
                        </div>
                      </div>
                      <div v-else>
                        <div v-html="magia.descricao" />
                      </div>
                      <div class="magia-card-footer">
                        <p-button 
                          label="Adicionar"
                          :disabled="personagem.magias.length === magiaToChoose.quantidadeInicial"
                          @click="handleAddMagia(magia)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </p-tab-panel>
          </p-tab-view>
        </div>
      </div>
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
.info {
  margin: 0;
  color: var(--tormenta-dark-red);
}
.info span {
  font-weight: normal;
  color: black;
}
.pericia-input-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.pericia-input-container label {
  margin-right: .5rem;
}
.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.card-habilidade-title {
  margin: 0;
  color: var(--tormenta-dark-red);
}
.card-habilidade-description :deep(p) {
  margin-top: 0;
  margin-bottom: 1.5rem;
}
.escola-input-container {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}
.escola-input-container button {
  margin-left: 1rem;
}
.caminho-card {
  display: flex;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--tormenta-background);
}
.caminho-add-button {
  margin-top: auto;
  margin-left: auto;
}
.caminho-card h4 {
  margin-top: 0;
  margin-bottom: 0;
  color: var(--tormenta-dark-red);
}
.caminho-card p {
  margin: 0;
}
.magia-card {
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--tormenta-background);
}
.magia-card-row {
  display: flex;
}
.magia-card-title {
  margin-top: 0;
  margin-bottom: 0;
  font-family: 'Tormenta', sans-serif;
  font-size: 24px;
  color: var(--tormenta-red);
}
.magia-card-subtitle {
  margin-top: 0;
  margin-bottom: 0;
  margin-right: .25rem;
  font-size: 14px;
  color: var(--text-color-secondary);
}
.magia-card-info {
  margin-right: .5rem;
  margin-top: 1rem;
  margin-bottom: 0;
}
.magia-card-info span {
  font-weight: 500;
}
.magia-card-footer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid var(--tormenta-dark-red);
  margin-top: 1rem;
}
.magia-card-footer button {
  margin-top: 1rem;
  margin-left: 1rem;
}
.show-more {
  color: var(--blue-500);
  text-decoration: underline;
  cursor: pointer;
}
</style>