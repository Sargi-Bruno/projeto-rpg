<script setup>
import { ref } from 'vue'

const atributosDicionario = {
  forca: 'Força',
  destreza: 'Destreza',
  constituicao: 'Constituição',
  inteligencia: 'Inteligência',
  sabedoria: 'Sabedoria',
  carisma: 'Carisma'
}
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
const atributosOptionSelected = ref('Modificadores fixos')
const excecaoSwitch = ref(false)
const varianteSwitch = ref(false)
const excecaoAtributoField = ref('')
const excecaoAtributo = ref()
const raca = ref({
  nome: '',
  tipoAtributos: '', //fixo, variante ou dinamico
  habilidades: [],
  tamanho: 'Médio',
  deslocamento: 9
})
const atributosField = ref(atributosDefault)
const atributosFixo = ref()
const atributosVariante = ref([])
const exibirAtributosFixo = ref()
const exibirAtributosVariante = ref([])
const varianteNome = ref('')
const variantesNomeLista = ref([])
const habilidade = ref({
  nome: '',
  descricao: ''
})

const adicionarHabilidade = () => {
  raca.value.habilidades.push({
    nome: habilidade.value.nome,
    descricao: habilidade.value.descricao
  })

  habilidade.value.nome = ''
  habilidade.value.descricao = ''
}

const adicionarAtributosDinamico = () => {
  raca.value.tipoAtributos = 'dinamico'

  if(excecaoSwitch.value) {
    if(excecaoAtributoField.value === '') return
    excecaoAtributo.value = excecaoAtributoField.value
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
  let atributosOrdem = []
  

  for(let atributo in atributoSet) {
    atributosOrdem.push([atributo, atributoSet[atributo]])
  }

  atributosOrdem.sort((a, b) => {
    return b[1] - a[1]
  })

  if(varianteSwitch.value) {
    if(varianteNome.value === '') return

    raca.value.tipoAtributos = 'variante'
    atributosVariante.value.push(atributoSet)
    exibirAtributosVariante.value.push(atributosOrdem)
    variantesNomeLista.value.push(varianteNome.value)
    varianteNome.value = ''
  } else {
    raca.value.tipoAtributos = 'fixo'
    atributosFixo.value = atributoSet
    exibirAtributosFixo.value = atributosOrdem

    atributosVariante.value = []
    exibirAtributosVariante.value = []
    variantesNomeLista.value = []
  }

  atributosField.value.forca = 0
  atributosField.value.destreza = 0
  atributosField.value.constituicao = 0
  atributosField.value.inteligencia = 0
  atributosField.value.sabedoria = 0
  atributosField.value.carisma = 0
}

const removerVariante = (index) => {
  atributosVariante.value.splice(index, 1)
  exibirAtributosVariante.value.splice(index, 1)
}

const finalizarRaca = () => {
  if(raca.value.nome === '') return
  if(raca.value.deslocamento === null || raca.value.deslocamento > 999) return
  if(raca.value.tipoAtributos === '') return

  if(raca.value.tipoAtributos === 'fixo') {
    raca.value.atributos = atributosFixo.value

  } else if(raca.value.tipoAtributos === 'variante') {
    raca.value.atributos = atributosVariante.value
    raca.value.variantes = variantesNomeLista.value

  } else {
    if(excecaoAtributo.value) raca.value.excecaoAtributo = excecaoAtributo.value
  }
    
  console.log(raca.value)
}
</script>

<template>
  <h1>Criar Raça</h1>
  <div>
    <label for="nome-raca">Nome</label>
    <p-input-text 
      id="nome-raca"
      v-model="raca.nome"
    />
    <label for="tamanho">Tamanho</label>
    <p-dropdown 
      id="tamanho"
      v-model="raca.tamanho"
      :options="tamanhoDropdownOptions"
    />
    <label for="deslocamento">Deslocamento em metros</label>
    <p-input-number 
      id="deslocamento"
      v-model="raca.deslocamento"
      :min="0"
      :max="99"
    />
  </div>
  <div>
    <h2>Modificadores de Atributo</h2>
    <div>
      <div v-if="raca.tipoAtributos !== '' && raca.tipoAtributos === 'fixo'">
        <div v-for="(atributo, index) in exibirAtributosFixo" :key="index">
          <div v-if="atributo[1] !== 0">
            {{atributosDicionario[atributo[0]]}} {{atributo[1]}}
          </div>
        </div>
      </div>
      <div v-if="raca.tipoAtributos !== '' && raca.tipoAtributos === 'variante'">
        <div v-for="(atributoSet, index) in exibirAtributosVariante" :key="index">
          <div v-if="variantesNomeLista[index]">
            {{variantesNomeLista[index]}}
          </div>
          <div class="inline">
            <div v-for="(atributo, index) in atributoSet" :key="index">
              <div v-if="atributo[1] !== 0">
                {{atributosDicionario[atributo[0]]}} {{atributo[1]}}
              </div>
            </div>
          </div>
          <p-button
            label="Remover"
            @click="removerVariante(index)"
          />
        </div>
      </div>
      <div v-if="raca.tipoAtributos !== '' && raca.tipoAtributos === 'dinamico'">
        <div v-if="!excecaoAtributo">
          <h5>+2 em três atributos diferentes.</h5>
        </div>
        <div v-else>
          <h5>+2 em três atributos diferentes (exceto {{excecaoAtributo}}), {{excecaoAtributo}} -2</h5>
        </div>
      </div>
    </div>
    <p-select-button 
      v-model="atributosOptionSelected"
      :options="atributosButtonOptions"
    />
    <div v-if="atributosOptionSelected === 'Modificadores fixos'">
      <div>
        <label for="forca">Força</label>
        <p-input-number 
          id="forca"
          v-model="atributosField.forca"
          :min="-99"
          :max="99"
        />
        <label for="destreza">Destreza</label>
        <p-input-number 
          id="destreza"
          v-model="atributosField.destreza"
          :min="-99"
          :max="99"
        />
        <label for="constituicao">Constituição</label>
        <p-input-number 
          id="constituicao"
          v-model="atributosField.constituicao"
          :min="-99"
          :max="99"
        />
        <label for="inteligencia">Inteligência</label>
        <p-input-number 
          id="inteligencia"
          v-model="atributosField.inteligencia"
          :min="-99"
          :max="99"
        />
        <label for="sabedoria">Sabedoria</label>
        <p-input-number 
          id="sabedoria"
          v-model="atributosField.sabedoria"
          :min="-99"
          :max="99"
        />
        <label for="carisma">Carisma</label>
        <p-input-number 
          id="carisma"
          v-model="atributosField.carisma"
          :min="-99"
          :max="99"
        />
      </div>
      <div>
        <p-button
          label="Confirmar"
          @click="AdicionarAtributos"
        />
        <label for="variante-switch">Possui variante?</label>
        <p-input-switch 
          id="variante-switch"
          v-model="varianteSwitch"
        />
        <label for="nome-variante">Nome</label>
        <p-input-text 
          id="nome-variante"
          v-model="varianteNome"
          :disabled="!varianteSwitch"
        />
      </div>
    </div>
    <div v-else>
      <p-button 
        label="Confirmar"
        @click="adicionarAtributosDinamico"
      />
      <label for="excecao-switch">Exceção</label>
      <p-input-switch 
        id="excecao-switch"
        v-model="excecaoSwitch"
      />
      <label for="excecao-atributo">Atributo</label>
      <p-dropdown 
      id="excecao-atributo"
      v-model="excecaoAtributoField"
      :options="excecaoDropdownOptions"
      :disabled="!excecaoSwitch"
    />
    </div>
  </div>
  <div>
    <h2>Habilidades de Raça</h2>
    <div v-for="(habilidade, index) in raca.habilidades" :key="index">
      <h3>{{habilidade.nome}}</h3>
      <div v-html="habilidade.descricao"></div>
    </div>
  </div>
  <div>
    <h2>Adicionar Habilidades</h2>
    <label for="nome-habilidade">Nome</label>
    <p-input-text 
      id="nome-habilidade"
      v-model="habilidade.nome"
    />
    <label>Descrição</label>
    <!-- editorStyle="height: 320px" -->
    <p-editor v-model="habilidade.descricao">
      <template #toolbar>
        <span class="ql-formats">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-link"></button>
          <button class="ql-clean"></button>
        </span>
      </template>
    </p-editor>
    <p-button 
      label="Adicionar"
      @click="adicionarHabilidade"
    />
  </div>
  <div>
    <p-button 
      label="Finalizar Criação"
      @click="finalizarRaca"
    />
  </div>
</template>