<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { _getDoc, _updateDoc, _deleteDoc } from '../../firebase/firestore'
import AdicionarHabilidade from '../../components/AdicionarHabilidade.vue'
import { sortAtributos } from '@/utils/viewFunctions.js'

const tamanhoDropdownOptions = [
  'Minúsculo',
  'Pequeno',
  'Médio',
  'Grande',
  'Enorme',
  'Colossal',
]
const atributosButtonOptions = [
  'Modificadores fixos',
  '+2 em três atributos diferentes'
]
const excecaoDropdownOptions = [
  'Força',
  'Destreza',
  'Constituição',
  'Inteligência',
  'Sabedoria',
  'Carisma'
]
const atributosDefault = {
  forca: 0,
  destreza: 0,
  constituicao: 0,
  inteligencia: 0,
  sabedoria: 0,
  carisma: 0
}

const route = useRoute()
const router = useRouter()
const editLoading = ref(false)
const deleteLoading = ref(false)
const atributosOptionSelected = ref('Modificadores fixos')
const excecaoSwitch = ref(false)
const varianteSwitch = ref(false)
const excecaoAtributoField = ref('')
const atributosField = ref(atributosDefault)
const varianteNomeField = ref('')
const adicionarNovaVariante = ref(false)
const raca = ref()

const adicionarHabilidade = (habilidade) => {
  raca.value.habilidades.push({
    nome: habilidade.nome,
    habilidadeMagica: habilidade.habilidadeMagica,
    descricao: habilidade.descricao
  })
}

const adicionarAtributosDinamico = () => {
  raca.value.tipoAtributos = 'dinamico'
  raca.value.excecaoAtributo = ''

  if(excecaoSwitch.value) {
    if(excecaoAtributoField.value === '') return
    raca.value.excecaoAtributo = excecaoAtributoField.value
    excecaoAtributoField.value = ''
    excecaoSwitch.value = false
  }
}

const AdicionarAtributos = () => {
  if(
    (atributosField.value.forca === null || atributosField.value.forca === 0) &&
    (atributosField.value.destreza === null || atributosField.value.destreza === 0) &&
    (atributosField.value.constituicao === null || atributosField.value.constituicao === 0) &&
    (atributosField.value.inteligencia === null || atributosField.value.inteligencia === 0) &&
    (atributosField.value.sabedoria === null || atributosField.value.sabedoria === 0) &&
    (atributosField.value.carisma === null || atributosField.value.carisma === 0)
  ) return

  const atributoSet = {
    forca: atributosField.value.forca || 0,
    destreza: atributosField.value.destreza || 0,
    constituicao: atributosField.value.constituicao || 0,
    inteligencia: atributosField.value.inteligencia || 0,
    sabedoria: atributosField.value.sabedoria || 0,
    carisma: atributosField.value.carisma || 0,
  }

  if(varianteSwitch.value) {
    if(varianteNomeField.value === '') return

    raca.value.tipoAtributos = 'variante'
    raca.value.atributos.push(atributoSet)
    raca.value.variantes.push(varianteNomeField.value)
    varianteNomeField.value = ''

  } else {
    raca.value.tipoAtributos = 'fixo'
    raca.value.atributos = atributoSet
  }

  atributosField.value.forca = 0
  atributosField.value.destreza = 0
  atributosField.value.constituicao = 0
  atributosField.value.inteligencia = 0
  atributosField.value.sabedoria = 0
  atributosField.value.carisma = 0

  adicionarNovaVariante.value = false
}

const removerVariante = (index) => {
  raca.value.atributos.splice(index, 1)
  raca.value.variantes.splice(index, 1)
}

const removerHabilidade = (index) => {
  raca.value.habilidades.splice(index, 1)
}

const clearAtributos = () => {
  raca.value.tipoAtributos = ''
  raca.value.atributos = []
  raca.value.excecaoAtributo = ''
  raca.value.variantes = []
}

const handleEdit = () => {
  if(raca.value.nome === '') return
  if(raca.value.deslocamento === null || raca.value.deslocamento > 999) return
  if(raca.value.tipoAtributos === '') return

  editLoading.value = true

  if(raca.value.tipoAtributos === 'fixo') {
    raca.value.excecaoAtributo = ''
    raca.value.variantes = []

  } else if(raca.value.tipoAtributos === 'variante') {
    raca.value.excecaoAtributo = ''

  } else {
    raca.value.atributos = []
    raca.value.variantes = []
  }
    
  _updateDoc(raca.value)
  router.push({ name: 'listar-racas' })
}

const handleDelete = () => {
  deleteLoading.value = true
  _deleteDoc(raca.value)
  router.push({ name: 'listar-racas' })
}

onMounted(async () => {
  raca.value = await _getDoc('racas', route.params.id)
})
</script>

<template>
  <div class="content">
    <h1 class="page-title">
      Editar Raça
    </h1>
    <div v-if="raca">
      <div class="first-container">
        <div class="caracteristicas-container">
          <!-- Características da Raça -->
          <h3>Características da Raça</h3>
          <div class="row">
            <div class="input-container">
              <label for="nome-raca">Nome</label>
              <p-input-text 
                id="nome-raca"
                v-model="raca.nome"
                class="input-field"
              />
            </div>
            <div class="input-container">
              <label for="tamanho">Tamanho</label>
              <p-dropdown 
                id="tamanho"
                v-model="raca.tamanho"
                :options="tamanhoDropdownOptions"
                class="input-field"
              />
            </div>
            <div class="input-container">
              <label for="deslocamento">Deslocamento</label>
              <div>
                <p-input-number 
                  id="deslocamento"
                  v-model="raca.deslocamento"
                  :min="0"
                  :max="99"
                  suffix="m"
                />
              </div> 
            </div>
          </div>
          <div>
            <label>Descrição</label>
            <p-editor 
              v-model="raca.descricao" 
              editor-style="height: 10rem" 
            />
          </div>
        </div>
        <div class="modificadores-container">
          <!-- Atributos -->
          <h3>Modificadores de Atributo</h3>
          <div v-if="raca.tipoAtributos !== ''">
            <!-- Fixo -->
            <div v-if="raca.tipoAtributos === 'fixo'">
              {{ sortAtributos(raca.atributos) }}.
            </div>
            <!-- Variante -->
            <div v-if="raca.tipoAtributos === 'variante'">
              <p-button 
                label="Adicionar Variante"
                class="atributos-variante-add-button"
                @click="adicionarNovaVariante = true"
              />
              <div v-if="adicionarNovaVariante">
                <div class="input-container">
                  <label for="nome-variante">Nome</label>
                  <p-input-text 
                    id="nome-variante"
                    v-model="varianteNomeField"
                    :disabled="!varianteSwitch"
                  />
                </div>
                <div class="atributos-container">
                  <div class="row">
                    <div class="input-container">
                      <label for="forca">Força</label>
                      <div>
                        <p-input-number 
                          id="forca"
                          v-model="atributosField.forca"
                          :min="-99"
                          :max="99"
                        />
                      </div>
                    </div>
                    <div class="input-container">
                      <label for="destreza">Destreza</label>
                      <div>
                        <p-input-number 
                          id="destreza"
                          v-model="atributosField.destreza"
                          :min="-99"
                          :max="99"
                        />
                      </div>
                    </div>
                    <div class="input-container">
                      <label for="constituicao">Constituição</label>
                      <div>
                        <p-input-number 
                          id="constituicao"
                          v-model="atributosField.constituicao"
                          :min="-99"
                          :max="99"
                        />
                      </div>
                    </div>
                    <div class="input-container">
                      <label for="inteligencia">Inteligência</label>
                      <div>
                        <p-input-number 
                          id="inteligencia"
                          v-model="atributosField.inteligencia"
                          :min="-99"
                          :max="99"
                        />
                      </div>
                    </div>
                    <div class="input-container">
                      <label for="sabedoria">Sabedoria</label>
                      <div>
                        <p-input-number 
                          id="sabedoria"
                          v-model="atributosField.sabedoria"
                          :min="-99"
                          :max="99"
                        />
                      </div>
                    </div>
                    <div class="input-container">
                      <label for="carisma">Carisma</label>
                      <div>
                        <p-input-number 
                          id="carisma"
                          v-model="atributosField.carisma"
                          :min="-99"
                          :max="99"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p-button
                  label="Adicionar"
                  class="variante-button"
                  @click="AdicionarAtributos"
                />
                <p-button
                  label="Cancelar"
                  class="variante-cancel-button"
                  @click="adicionarNovaVariante = false"
                />
              </div>
              <div
                v-for="(atributoSet, index) in raca.atributos"
                :key="index"
                class="atributos-variante-container"
              >
                <div>
                  {{ sortAtributos(atributoSet) }} ({{ raca.variantes[index] }});
                </div>
                <p-button
                  label="Remover"
                  @click="removerVariante(index)"
                />
              </div>
            </div>
            <!-- Dinâmico -->
            <div v-if="raca.tipoAtributos === 'dinamico'">
              <div v-if="raca.excecaoAtributo === ''">
                +2 em três atributos diferentes.
              </div>
              <div v-else>
                +2 em três atributos diferentes (exceto {{ raca.excecaoAtributo }}), {{ raca.excecaoAtributo }} -2.
              </div>
            </div>
            <p-button
              label="Editar"
              class="atributos-editar-button"
              @click="clearAtributos"
            />
          </div>
          <!-- Atributos cadastro -->
          <div v-else>
            <label for="tipo-atributo">
              Tipo
            </label>
            <p-select-button 
              id="tipo-atributo"
              v-model="atributosOptionSelected"
              :options="atributosButtonOptions"
            />
            <div 
              v-if="atributosOptionSelected === 'Modificadores fixos'" 
              class="atributos-container" 
            >
              <div class="row">
                <div class="input-container">
                  <label for="forca">Força</label>
                  <div>
                    <p-input-number 
                      id="forca"
                      v-model="atributosField.forca"
                      :min="-99"
                      :max="99"
                    />
                  </div>
                </div>
                <div class="input-container">
                  <label for="destreza">Destreza</label>
                  <div>
                    <p-input-number 
                      id="destreza"
                      v-model="atributosField.destreza"
                      :min="-99"
                      :max="99"
                    />
                  </div>
                </div>
                <div class="input-container">
                  <label for="constituicao">Constituição</label>
                  <div>
                    <p-input-number 
                      id="constituicao"
                      v-model="atributosField.constituicao"
                      :min="-99"
                      :max="99"
                    />
                  </div>
                </div>
                <div class="input-container">
                  <label for="inteligencia">Inteligência</label>
                  <div>
                    <p-input-number 
                      id="inteligencia"
                      v-model="atributosField.inteligencia"
                      :min="-99"
                      :max="99"
                    />
                  </div>
                </div>
                <div class="input-container">
                  <label for="sabedoria">Sabedoria</label>
                  <div>
                    <p-input-number 
                      id="sabedoria"
                      v-model="atributosField.sabedoria"
                      :min="-99"
                      :max="99"
                    />
                  </div>
                </div>
                <div class="input-container">
                  <label for="carisma">Carisma</label>
                  <div>
                    <p-input-number 
                      id="carisma"
                      v-model="atributosField.carisma"
                      :min="-99"
                      :max="99"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div class="switch-container">
                  <label for="variante-switch">Possui variante?</label>
                  <p-input-switch 
                    id="variante-switch"
                    v-model="varianteSwitch"
                  />
                </div>
                <div v-if="varianteSwitch">
                  <div class="variante-form">
                    <div class="input-container">
                      <label for="nome-variante">Nome</label>
                      <p-input-text 
                        id="nome-variante"
                        v-model="varianteNomeField"
                        :disabled="!varianteSwitch"
                      />
                    </div>
                    <p-button
                      label="Adicionar"
                      class="variante-button"
                      @click="AdicionarAtributos"
                    />
                  </div>
                </div>
                <div v-else>
                  <p-button
                    label="Confirmar"
                    @click="AdicionarAtributos"
                  />
                </div>
              </div>
            </div>
            <div 
              v-else 
              class="atributos-container"
            >
              <div class="switch-container">
                <label for="excecao-switch">Exceção</label>
                <p-input-switch 
                  id="excecao-switch"
                  v-model="excecaoSwitch"
                />
              </div>
              <div class="variante-form">
                <div v-if="excecaoSwitch">
                  <div class="input-container">
                    <label for="excecao-atributo">Atributo</label>
                    <p-dropdown 
                      id="excecao-atributo"
                      v-model="excecaoAtributoField"
                      :options="excecaoDropdownOptions"
                      :disabled="!excecaoSwitch"
                      class="input-field"
                    />
                  </div>
                </div>
                <p-button 
                  label="Confirmar"
                  class="variante-button"
                  @click="adicionarAtributosDinamico"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Habilidades de Raça -->
      <div class="habilidades-container">
        <div class="adicionar-habilidade-container">
          <AdicionarHabilidade 
            @adicionar-habilidade="adicionarHabilidade"
          />
        </div>
        <div class="habilidades-adicionadas-container">
          <h2>Habilidades de Raça</h2>
          <div class="habilidades-adicionadas-content">
            <div
              v-for="(habilidade, index) in raca.habilidades"
              :key="index"
              class="habilidade-card"
            >
              <h4>{{ habilidade.nome }}</h4>
              <p-button 
                label="Remover"
                @click="removerHabilidade(index)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <p-button
          label="Deletar"
          class="p-button-text p-button-danger"
          :disabled="deleteLoading"
          @click="handleDelete"
        />
        <p-button
          label="Cancelar"
          class="p-button-outlined"
          @click="router.push({ name: 'listar-racas' })"
        />
        <p-button
          label="Editar"
          class="p-button-success"
          :disabled="editLoading"
          @click="handleEdit"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.first-container {
  display: flex;
}
.caracteristicas-container {
  width: 45%;
  padding-right: 1rem;
}
.modificadores-container {
  width: 55%;
}
.row {
  display: flex;
  margin-bottom: 1rem;
}
.input-container {
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
}
.input-field {
  width: 10rem;
  height: 2.5rem;
}
.input-field-lg {
  width: 20rem;
  height: 2.5rem;
}
.atributos-container {
  margin-top: 1rem;
}
.switch-container {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
.switch-container label {
  margin-right: 1rem;
}
.variante-form {
  display: flex;
  align-items: flex-end;
}
.variante-button {
  height: 2.5rem;
}
.atributos-variante-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.atributos-variante-add-button {
  margin-bottom: 1rem;
}
.atributos-editar-button {
  margin-top: 1rem;
}
.variante-cancel-button {
  margin-left: 1rem;
}
.finish-button {
  display: block;
  margin-left: auto;
  margin-bottom: 2rem;
}
.habilidades-container {
  display: flex;
}
.adicionar-habilidade-container {
  width: 45%;
  padding-right: 1rem;
}
.habilidades-adicionadas-container {
  width: 55%;
}
.habilidade-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--tormenta-background);
}
.habilidade-card h4 {
  margin: 0;
  font-family: 'Tormenta', sans-serif;
  font-size: 24px;
  color: var(--tormenta-red);
}
.habilidades-adicionadas-content {
  height: 22rem;
  overflow: auto;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  margin-bottom: 2rem;
}
.footer button {
  margin-left: 1rem;
}
</style>