<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { _addDoc } from '../../firebase/firestore'
import AdicionarHabilidade from '../../components/AdicionarHabilidade.vue'

const router = useRouter()
const registerLoading = ref(false)
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
  descricao: '',
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

const adicionarHabilidade = (habilidade) => {
  raca.value.habilidades.push({
    nome: habilidade.nome,
    habilidadeMagica: habilidade.habilidadeMagica,
    descricao: habilidade.descricao
  })
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
  variantesNomeLista.value.splice(index, 1)
}

const removerHabilidade = (index) => {
  raca.value.habilidades.splice(index, 1)
}

const handleRegister = () => {
  if(raca.value.nome === '') return
  if(raca.value.deslocamento === null || raca.value.deslocamento > 999) return
  if(raca.value.tipoAtributos === '') return

  registerLoading.value = true

  if(raca.value.tipoAtributos === 'fixo') {
    raca.value.atributos = atributosFixo.value

  } else if(raca.value.tipoAtributos === 'variante') {
    raca.value.atributos = atributosVariante.value
    raca.value.variantes = variantesNomeLista.value

  } else {
    if(excecaoAtributo.value) raca.value.excecaoAtributo = excecaoAtributo.value
  }
    
  _addDoc('racas', raca.value)
  router.push({ name: 'listar-racas' })
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
    <label>Descrição</label>
    <p-editor v-model="raca.descricao" />
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
      <p-button 
        label="Remover"
        @click="removerHabilidade(index)"
      />
    </div>
  </div>
  <AdicionarHabilidade 
    @adicionarHabilidade="adicionarHabilidade"
  />
  <p-button
    label="Finalizar"
    @click="handleRegister"
    :disabled="registerLoading"
  />
</template>