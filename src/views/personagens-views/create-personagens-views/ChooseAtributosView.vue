<script setup>
import { onMounted, ref, onActivated } from 'vue'
import { _getDoc, _updateDoc } from '../../../firebase/firestore'
import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import { computed } from '@vue/reactivity';
import { getModifier, getRacaAtributos } from '@/utils/viewFunctions'

const props = defineProps({
  personagemId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['handle-next-step'])

const geracaoAtributosOptions = [
  {label: 'Geração por Dados', value: 'dados'},
  {label: 'Geração por Pontos', value: 'pontos'},
  {label: 'Escolha livre', value: 'livre'}
]
const atributosDisabled = []
const atributosDropdownSelected = []
const dadosAtributosSelecionados = ref({
  forca: 0,
  destreza: 0,
  constituicao: 0,
  inteligencia: 0,
  sabedoria: 0,
  carisma: 0,
})
const atributosOptions = ref([
  { label: 'Não selecionado', value: '0', disabled: false, order: '0' },
  { label: 'Força', value: 'forca', disabled: false, order: '1' },
  { label: 'Destreza', value: 'destreza', disabled: false, order: '2' },
  { label: 'Constituição', value: 'constituicao', disabled: false, order: '3' },
  { label: 'Inteligência', value: 'inteligencia', disabled: false, order: '4' },
  { label: 'Sabedoria', value: 'sabedoria', disabled: false, order: '5' },
  { label: 'Carisma', value: 'carisma', disabled: false, order: '6' }
])
const mounted = ref(false)
const personagem = ref()
const tipoGeracaoAtributos = ref('dados') //dados, pontos, livre
const resultRoll = ref([])
const atributosSelecionados = ref(['0','0','0','0','0','0'])
const atributosPontos = ref({
  forca: 10,
  destreza: 10,
  constituicao: 10,
  inteligencia: 10,
  sabedoria: 10,
  carisma: 10,
})
const atributosLivre = ref({
  forca: 10,
  destreza: 10,
  constituicao: 10,
  inteligencia: 10,
  sabedoria: 10,
  carisma: 10,
})
const pontos = ref(20)
const atributosDropdownDisabled = ref(true)
const isAtributosChosen = ref(false)

const ordedAtributosOptions = computed(() => {
  let enabledArray = []
  let disabledArray = []

  atributosOptions.value.forEach(atributo => {
    if(atributo.disabled) disabledArray.push(atributo)
    else enabledArray.push(atributo)
  })

  enabledArray = enabledArray.sort()
  disabledArray = disabledArray.sort()

  return enabledArray.concat(disabledArray)
})

const isAtributosDadosFinished = computed(() => {
  if(
    dadosAtributosSelecionados.value.forca !== 0 &&
    dadosAtributosSelecionados.value.destreza !== 0 &&
    dadosAtributosSelecionados.value.constituicao !== 0 &&
    dadosAtributosSelecionados.value.inteligencia !== 0 &&
    dadosAtributosSelecionados.value.sabedoria !== 0 &&
    dadosAtributosSelecionados.value.carisma !== 0
  ) return true

  return false
})

onMounted(async () => {
  personagem.value = await _getDoc('personagens', props.personagemId)

  personagem.value.atributos = {
    forca: 0,
    destreza: 0,
    constituicao: 0,
    inteligencia: 0,
    sabedoria: 0,
    carisma: 0,
  }

  if(personagem.value.raca) {
    const racaAtributos = getRacaAtributos(personagem.value.raca)

    personagem.value.racaAtributos = racaAtributos
  }

  mounted.value = true
})

onActivated(async () => {
  if(mounted.value) {
    const personagemAux = await _getDoc('personagens', props.personagemId)

    personagem.value.raca = personagemAux.raca

    if(personagem.value.raca) {
      const racaAtributos = getRacaAtributos(personagem.value.raca)

      personagem.value.racaAtributos = racaAtributos
    }
  }
})

const personagemAtributoFinalForca = computed(() => {
  if(!isAtributosChosen.value) return '-'

  if(!personagem.value.racaAtributos) return personagem.value.atributos.forca

  return parseInt(personagem.value.atributos.forca) + parseInt(personagem.value.racaAtributos.forca)
})

const personagemAtributoFinalDestreza = computed(() => {
  if(!isAtributosChosen.value) return '-'

  if(!personagem.value.racaAtributos) return personagem.value.atributos.destreza

  return parseInt(personagem.value.atributos.destreza) + parseInt(personagem.value.racaAtributos.destreza)
})

const personagemAtributoFinalConstituicao = computed(() => {
  if(!isAtributosChosen.value) return '-'

  if(!personagem.value.racaAtributos) return personagem.value.atributos.constituicao

  return parseInt(personagem.value.atributos.constituicao) + parseInt(personagem.value.racaAtributos.constituicao)
})

const personagemAtributoFinalInteligencia = computed(() => {
  if(!isAtributosChosen.value) return '-'

  if(!personagem.value.racaAtributos) return personagem.value.atributos.inteligencia

  return parseInt(personagem.value.atributos.inteligencia) + parseInt(personagem.value.racaAtributos.inteligencia)
})

const personagemAtributoFinalSabedoria = computed(() => {
  if(!isAtributosChosen.value) return '-'

  if(!personagem.value.racaAtributos) return personagem.value.atributos.sabedoria

  return parseInt(personagem.value.atributos.sabedoria) + parseInt(personagem.value.racaAtributos.sabedoria)
})

const personagemAtributoFinalCarisma = computed(() => {
  if(!isAtributosChosen.value) return '-'

  if(!personagem.value.racaAtributos) return personagem.value.atributos.carisma

  return parseInt(personagem.value.atributos.carisma) + parseInt(personagem.value.racaAtributos.carisma)
})

const handleRollDices = () => {
  resultRoll.value = []

  for(let i = 0; i < 6; i++) {
    const roll = new DiceRoll('4d6d1')
    resultRoll.value.push(roll.total)
  }

  atributosDropdownDisabled.value = false
}

const handleAddAtributoGerado = (index) => {
  if(atributosDropdownSelected[index] && (atributosSelecionados.value[index] !== atributosDropdownSelected[index])) {
    if(atributosDisabled[index] === 'forca') {
      atributosOptions.value[1].disabled = false
      atributosDisabled[index] = ''
      dadosAtributosSelecionados.value.forca = 0
    }
    if(atributosDisabled[index] === 'destreza') {
      atributosOptions.value[2].disabled = false
      atributosDisabled[index] = ''
      dadosAtributosSelecionados.value.destreza = 0
    }
    if(atributosDisabled[index] === 'constituicao') {
      atributosOptions.value[3].disabled = false
      atributosDisabled[index] = ''
      dadosAtributosSelecionados.value.constituicao = 0
    }
    if(atributosDisabled[index] === 'inteligencia') {
      atributosOptions.value[4].disabled = false
      atributosDisabled[index] = ''
      dadosAtributosSelecionados.value.inteligencia = 0
    }
    if(atributosDisabled[index] === 'sabedoria') {
      atributosOptions.value[5].disabled = false
      atributosDisabled[index] = ''
      dadosAtributosSelecionados.value.sabedoria = 0
    }
    if(atributosDisabled[index] === 'carisma') {
      atributosOptions.value[6].disabled = false
      atributosDisabled[index] = ''
      dadosAtributosSelecionados.value.carisma = 0
    }
  }

  if(atributosSelecionados.value[index] === 'forca') {
    atributosOptions.value[1].disabled = true
    atributosDisabled[index] = 'forca'
    dadosAtributosSelecionados.value[atributosSelecionados.value[index]] = resultRoll.value[index]
  }
  if(atributosSelecionados.value[index] === 'destreza') {
    atributosOptions.value[2].disabled = true
    atributosDisabled[index] = 'destreza'
    dadosAtributosSelecionados.value[atributosSelecionados.value[index]] = resultRoll.value[index]
  }
  if(atributosSelecionados.value[index] === 'constituicao') {
    atributosOptions.value[3].disabled = true
    atributosDisabled[index] = 'constituicao'
    dadosAtributosSelecionados.value[atributosSelecionados.value[index]] = resultRoll.value[index]
  }
  if(atributosSelecionados.value[index] === 'inteligencia') {
    atributosOptions.value[4].disabled = true
    atributosDisabled[index] = 'inteligencia'
    dadosAtributosSelecionados.value[atributosSelecionados.value[index]] = resultRoll.value[index]
  }
  if(atributosSelecionados.value[index] === 'sabedoria') {
    atributosOptions.value[5].disabled = true
    atributosDisabled[index] = 'sabedoria'
    dadosAtributosSelecionados.value[atributosSelecionados.value[index]] = resultRoll.value[index]
  }
  if(atributosSelecionados.value[index] === 'carisma') {
    atributosOptions.value[6].disabled = true
    atributosDisabled[index] = 'carisma'
    dadosAtributosSelecionados.value[atributosSelecionados.value[index]] = resultRoll.value[index]
  }

  if(atributosSelecionados.value[index] === '0') {
    atributosDropdownSelected[index] = ''
  } else {
    atributosDropdownSelected[index] = atributosSelecionados.value[index]
  }
}

const handleRemoveAtributo = (atributo) => {
  if(atributosPontos.value[atributo] === 8) return

  if(atributosPontos.value[atributo] >= 17) {
    atributosPontos.value[atributo]--
    pontos.value = pontos.value + 3
    return
  }

  if(atributosPontos.value[atributo] <= 16 && atributosPontos.value[atributo] > 14) {
    atributosPontos.value[atributo]--
    pontos.value = pontos.value + 2
    return
  }

  if(atributosPontos.value[atributo] <= 14 && atributosPontos.value[atributo] > 8) {
    atributosPontos.value[atributo]--
    pontos.value = pontos.value + 1
  }
}

const handleAddAtributo = (atributo) => {
  if(pontos.value === 0) return

  if(atributosPontos.value[atributo] === 18) return

  if(atributosPontos.value[atributo] >= 16 && atributosPontos.value[atributo] <= 17) {
    if(pontos.value < 3) return

    atributosPontos.value[atributo]++
    pontos.value = pontos.value - 3
    return
  }

  if(atributosPontos.value[atributo] === 14 || atributosPontos.value[atributo] === 15) {
    if(pontos.value < 2) return

    atributosPontos.value[atributo]++
    pontos.value = pontos.value - 2
    return
  }

  if(atributosPontos.value[atributo] >= 8 && atributosPontos.value[atributo] < 14) {
    if(pontos.value < 1) return

    atributosPontos.value[atributo]++
    pontos.value = pontos.value - 1
    return
  }
}

const handleApplyAtributosDados = () => {
  personagem.value.atributos.forca = dadosAtributosSelecionados.value.forca
  personagem.value.atributos.destreza = dadosAtributosSelecionados.value.destreza
  personagem.value.atributos.constituicao = dadosAtributosSelecionados.value.constituicao
  personagem.value.atributos.inteligencia = dadosAtributosSelecionados.value.inteligencia
  personagem.value.atributos.sabedoria = dadosAtributosSelecionados.value.sabedoria
  personagem.value.atributos.carisma = dadosAtributosSelecionados.value.carisma
  isAtributosChosen.value = true
}

const handleApplyAtributosPontos = () => {
  personagem.value.atributos.forca = atributosPontos.value.forca
  personagem.value.atributos.destreza = atributosPontos.value.destreza
  personagem.value.atributos.constituicao = atributosPontos.value.constituicao
  personagem.value.atributos.inteligencia = atributosPontos.value.inteligencia
  personagem.value.atributos.sabedoria = atributosPontos.value.sabedoria
  personagem.value.atributos.carisma = atributosPontos.value.carisma
  isAtributosChosen.value = true
}

const handleApplyAtributosLivre = () => {
  if(atributosLivre.value.forca < 0) atributosLivre.value.forca = 0
  if(atributosLivre.value.destreza < 0) atributosLivre.value.destreza = 0
  if(atributosLivre.value.constituicao < 0) atributosLivre.value.constituicao = 0
  if(atributosLivre.value.inteligencia < 0) atributosLivre.value.inteligencia = 0
  if(atributosLivre.value.sabedoria < 0) atributosLivre.value.sabedoria = 0
  if(atributosLivre.value.carisma < 0) atributosLivre.value.carisma = 0

  personagem.value.atributos.forca = atributosLivre.value.forca
  personagem.value.atributos.destreza = atributosLivre.value.destreza
  personagem.value.atributos.constituicao = atributosLivre.value.constituicao
  personagem.value.atributos.inteligencia = atributosLivre.value.inteligencia
  personagem.value.atributos.sabedoria = atributosLivre.value.sabedoria
  personagem.value.atributos.carisma = atributosLivre.value.carisma
  isAtributosChosen.value = true
}

const handleSaveAtributos = async () => {
  _updateDoc(personagem.value)
    .then(emit('handle-next-step', 5))
}
</script>

<template>
  <p-button
    label="Continuar"
    class="continue-button"
    :disabled="!isAtributosChosen"
    @click="handleSaveAtributos"
  />
  <p-select-button
    v-model="tipoGeracaoAtributos"
    class="tipo-atributos-button"
    :options="geracaoAtributosOptions"
    option-label="label"
    option-value="value"
  />
  <div 
    v-if="tipoGeracaoAtributos === 'dados'"
    class="atributos-wrapper"
  >
    <p-button 
      label="Rolar dados"
      class="roll-button"
      @click="handleRollDices"
    />
    <div class="atributo-dados-container">
      <label for="atributo1">{{ resultRoll[0] || '-' }}</label>
      <p-dropdown 
        id="atributo1"
        v-model="atributosSelecionados[0]"
        class="atributo-dropdown"
        :options="ordedAtributosOptions"
        option-label="label"
        option-value="value"
        option-disabled="disabled"
        :disabled="atributosDropdownDisabled"
        @change="handleAddAtributoGerado(0)"
      />
    </div>
    <div class="atributo-dados-container">
      <label for="atributo2">{{ resultRoll[1] || '-' }}</label>
      <p-dropdown 
        id="atributo2"
        v-model="atributosSelecionados[1]"
        class="atributo-dropdown"
        :options="ordedAtributosOptions"
        option-label="label"
        option-value="value"
        option-disabled="disabled"
        :disabled="atributosDropdownDisabled"
        @change="handleAddAtributoGerado(1)"
      />
    </div>
    <div class="atributo-dados-container">
      <label for="atributo3">{{ resultRoll[2] || '-' }}</label>
      <p-dropdown 
        id="atributo3"
        v-model="atributosSelecionados[2]"
        class="atributo-dropdown"
        :options="ordedAtributosOptions"
        option-label="label"
        option-value="value"
        option-disabled="disabled"
        :disabled="atributosDropdownDisabled"
        @change="handleAddAtributoGerado(2)"
      />
    </div>
    <div class="atributo-dados-container">
      <label for="atributo4">{{ resultRoll[3] || '-' }}</label>
      <p-dropdown 
        id="atributo4"
        v-model="atributosSelecionados[3]"
        class="atributo-dropdown"
        :options="ordedAtributosOptions"
        option-label="label"
        option-value="value"
        option-disabled="disabled"
        :disabled="atributosDropdownDisabled"
        @change="handleAddAtributoGerado(3)"
      />
    </div>
    <div class="atributo-dados-container">
      <label for="atributo5">{{ resultRoll[4] || '-' }}</label>
      <p-dropdown 
        id="atributo5"
        v-model="atributosSelecionados[4]"
        class="atributo-dropdown"
        :options="ordedAtributosOptions"
        option-label="label"
        option-value="value"
        option-disabled="disabled"
        :disabled="atributosDropdownDisabled"
        @change="handleAddAtributoGerado(4)"
      />
    </div>
    <div class="atributo-dados-container">
      <label for="atributo6">{{ resultRoll[5] || '-' }}</label>
      <p-dropdown 
        id="atributo6"
        v-model="atributosSelecionados[5]"
        class="atributo-dropdown"
        :options="ordedAtributosOptions"
        option-label="label"
        option-value="value"
        option-disabled="disabled"
        :disabled="atributosDropdownDisabled"
        @change="handleAddAtributoGerado(5)"
      />
    </div>
    <p-button 
      label="Aplicar"
      class="roll-button"
      :disabled="!isAtributosDadosFinished"
      @click="handleApplyAtributosDados"
    />
  </div>
  <div v-if="tipoGeracaoAtributos === 'pontos'">
    <div class="atributos-pontos-title-container">
      <h5>Pontos</h5>
      <h5>{{ pontos }}</h5>
    </div>
    <div class="atributos-wrapper">
      <div class="atributo-pontos-container">
        <h5 class="atributo-pontos-title">
          Força
        </h5>
        <div class="pontos-container">
          <p-button 
            label="-"
            :disabled="atributosPontos.forca === 8"
            @click="handleRemoveAtributo('forca')"
          />
          <h5 class="atributo-pontos">
            {{ atributosPontos.forca }}
          </h5>
          <p-button 
            label="+"
            :disabled="atributosPontos.forca === 18 || pontos === 0" 
            @click="handleAddAtributo('forca')"
          />
        </div>
      </div>
      <div class="atributo-pontos-container">
        <h5 class="atributo-pontos-title">
          Destreza
        </h5>
        <div class="pontos-container">
          <p-button 
            label="-"
            :disabled="atributosPontos.destreza === 8"
            @click="handleRemoveAtributo('destreza')"
          />
          <h5 class="atributo-pontos">
            {{ atributosPontos.destreza }}
          </h5>
          <p-button 
            label="+"
            :disabled="atributosPontos.destreza === 18 || pontos === 0"
            @click="handleAddAtributo('destreza')"
          />
        </div>
      </div>
      <div class="atributo-pontos-container">
        <h5 class="atributo-pontos-title">
          Constituição
        </h5>
        <div class="pontos-container">
          <p-button 
            label="-"
            :disabled="atributosPontos.constituicao === 8"
            @click="handleRemoveAtributo('constituicao')"
          />
          <h5 class="atributo-pontos">
            {{ atributosPontos.constituicao }}
          </h5>
          <p-button 
            label="+"
            :disabled="atributosPontos.constituicao === 18 || pontos === 0"
            @click="handleAddAtributo('constituicao')"
          />
        </div>
      </div>
      <div class="atributo-pontos-container">
        <h5 class="atributo-pontos-title">
          Inteligência
        </h5>
        <div class="pontos-container">
          <p-button 
            label="-"
            :disabled="atributosPontos.inteligencia === 8"
            @click="handleRemoveAtributo('inteligencia')"
          />
          <h5 class="atributo-pontos">
            {{ atributosPontos.inteligencia }}
          </h5>
          <p-button 
            label="+"
            :disabled="atributosPontos.inteligencia === 18 || pontos === 0"
            @click="handleAddAtributo('inteligencia')"
          />
        </div>  
      </div>
      <div class="atributo-pontos-container">
        <h5 class="atributo-pontos-title">
          Sabedoria
        </h5>
        <div class="pontos-container">
          <p-button 
            label="-"
            :disabled="atributosPontos.sabedoria === 8"
            @click="handleRemoveAtributo('sabedoria')"
          />
          <h5 class="atributo-pontos">
            {{ atributosPontos.sabedoria }}
          </h5>
          <p-button 
            label="+"
            :disabled="atributosPontos.sabedoria === 18 || pontos === 0"
            @click="handleAddAtributo('sabedoria')"
          />
        </div>
      </div>
      <div class="atributo-pontos-container">
        <h5 class="atributo-pontos-title">
          Carisma
        </h5>
        <div class="pontos-container">
          <p-button 
            label="-"
            :disabled="atributosPontos.carisma === 8"
            @click="handleRemoveAtributo('carisma')"
          />
          <h5 class="atributo-pontos">
            {{ atributosPontos.carisma }}
          </h5>
          <p-button 
            label="+"
            :disabled="atributosPontos.carisma === 18 || pontos === 0"
            @click="handleAddAtributo('carisma')"
          />
        </div>
      </div>
      <p-button 
        label="Aplicar"
        class="roll-button"
        :disabled="pontos !== 0"
        @click="handleApplyAtributosPontos"
      />
    </div>
  </div>
  <div 
    v-if="tipoGeracaoAtributos === 'livre'"
    class="atributos-wrapper"
  >
    <div class="atributo-dados-container">
      <label for="forca">Força</label>
      <p-input-number 
        id="forca"
        v-model="atributosLivre.forca"
        class="atributo-dropdown"
      />
    </div>
    <div class="atributo-dados-container">
      <label for="destreza">Destreza</label>
      <p-input-number 
        id="destreza"
        v-model="atributosLivre.destreza"
        class="atributo-dropdown"
      />
    </div>
    <div class="atributo-dados-container">
      <label for="constituicao">Constituição</label>
      <p-input-number 
        id="constituicao"
        v-model="atributosLivre.constituicao"
        class="atributo-dropdown"
      />
    </div>
    <div class="atributo-dados-container">
      <label for="inteligencia">Inteligência</label>
      <p-input-number 
        id="inteligencia"
        v-model="atributosLivre.inteligencia"
        class="atributo-dropdown"
      />
    </div>
    <div class="atributo-dados-container">
      <label for="sabedoria">Sabedoria</label>
      <p-input-number 
        id="sabedoria"
        v-model="atributosLivre.sabedoria"
        class="atributo-dropdown"
      />
    </div>
    <div class="atributo-dados-container">
      <label for="carisma">Carisma</label>
      <p-input-number 
        id="carisma"
        v-model="atributosLivre.carisma"
        class="atributo-dropdown"
      />
    </div>
    <p-button 
      label="Aplicar"
      class="roll-button"
      @click="handleApplyAtributosLivre"
    />
  </div>
  <div 
    v-if="personagem"
    class="personagem-atributos"
  >
    <h3 class="personagem-title">
      Personagem
    </h3>
    <div class="personagem-atributos-row">
      <div class="personagem-atributo-container">
        <h5 class="personagem-atributo-title">
          Força
        </h5>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Atributo:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 
              v-if="!isAtributosChosen"
              class="personagem-atributo-value"
            >
              -
            </h5>
            <h5 
              v-else
              class="personagem-atributo-value"
            >
              {{ personagem.atributos.forca }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Bônus de Raça:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5
              v-if="!personagem.racaAtributos"
              class="personagem-atributo-value"
            >
              -
            </h5>
            <h5 
              v-else
              class="personagem-atributo-value"
            >
              {{ personagem.racaAtributos.forca }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Final:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 class="personagem-atributo-value">
              {{ personagemAtributoFinalForca }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Modificador:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 class="personagem-atributo-value">
              {{ getModifier(personagemAtributoFinalForca) }}
            </h5>
          </div>
        </div>
      </div>
      <div class="personagem-atributo-container">
        <h5 class="personagem-atributo-title">
          Destreza
        </h5>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Atributo:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 
              v-if="!isAtributosChosen"
              class="personagem-atributo-value"
            >
              -
            </h5>
            <h5 
              v-else
              class="personagem-atributo-value"
            >
              {{ personagem.atributos.destreza }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Bônus de Raça:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5
              v-if="!personagem.racaAtributos"
              class="personagem-atributo-value"
            >
              -
            </h5>
            <h5 
              v-else
              class="personagem-atributo-value"
            >
              {{ personagem.racaAtributos.destreza }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Final:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 class="personagem-atributo-value">
              {{ personagemAtributoFinalDestreza }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Modificador:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 class="personagem-atributo-value">
              {{ getModifier(personagemAtributoFinalDestreza) }}
            </h5>
          </div>
        </div>
      </div>
      <div class="personagem-atributo-container">
        <h5 class="personagem-atributo-title">
          Constituição
        </h5>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Atributo:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 
              v-if="!isAtributosChosen"
              class="personagem-atributo-value"
            >
              -
            </h5>
            <h5 
              v-else
              class="personagem-atributo-value"
            >
              {{ personagem.atributos.constituicao }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Bônus de Raça:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5
              v-if="!personagem.racaAtributos"
              class="personagem-atributo-value"
            >
              -
            </h5>
            <h5 
              v-else
              class="personagem-atributo-value"
            >
              {{ personagem.racaAtributos.constituicao }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Final:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 class="personagem-atributo-value">
              {{ personagemAtributoFinalConstituicao }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Modificador:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 class="personagem-atributo-value">
              {{ getModifier(personagemAtributoFinalConstituicao) }}
            </h5>
          </div>
        </div>
      </div>
      <div class="personagem-atributo-container">
        <h5 class="personagem-atributo-title">
          Inteligência
        </h5>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Atributo:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 
              v-if="!isAtributosChosen"
              class="personagem-atributo-value"
            >
              -
            </h5>
            <h5 
              v-else
              class="personagem-atributo-value"
            >
              {{ personagem.atributos.inteligencia }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Bônus de Raça:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5
              v-if="!personagem.racaAtributos"
              class="personagem-atributo-value"
            >
              -
            </h5>
            <h5 
              v-else
              class="personagem-atributo-value"
            >
              {{ personagem.racaAtributos.inteligencia }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Final:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 class="personagem-atributo-value">
              {{ personagemAtributoFinalInteligencia }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Modificador:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 class="personagem-atributo-value">
              {{ getModifier(personagemAtributoFinalInteligencia) }}
            </h5>
          </div>
        </div>
      </div>
      <div class="personagem-atributo-container">
        <h5 class="personagem-atributo-title">
          Sabedoria
        </h5>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Atributo:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 
              v-if="!isAtributosChosen"
              class="personagem-atributo-value"
            >
              -
            </h5>
            <h5 
              v-else
              class="personagem-atributo-value"
            >
              {{ personagem.atributos.sabedoria }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Bônus de Raça:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5
              v-if="!personagem.racaAtributos"
              class="personagem-atributo-value"
            >
              -
            </h5>
            <h5 
              v-else
              class="personagem-atributo-value"
            >
              {{ personagem.racaAtributos.sabedoria }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Final:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 class="personagem-atributo-value">
              {{ personagemAtributoFinalSabedoria }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Modificador:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 class="personagem-atributo-value">
              {{ getModifier(personagemAtributoFinalSabedoria) }}
            </h5>
          </div>
        </div>
      </div>
      <div class="personagem-atributo-container">
        <h5 class="personagem-atributo-title">
          Carisma
        </h5>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Atributo:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 
              v-if="!isAtributosChosen"
              class="personagem-atributo-value"
            >
              -
            </h5>
            <h5 
              v-else
              class="personagem-atributo-value"
            >
              {{ personagem.atributos.carisma }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Bônus de Raça:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5
              v-if="!personagem.racaAtributos"
              class="personagem-atributo-value"
            >
              -
            </h5>
            <h5 
              v-else
              class="personagem-atributo-value"
            >
              {{ personagem.racaAtributos.carisma }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Final:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 class="personagem-atributo-value">
              {{ personagemAtributoFinalCarisma }}
            </h5>
          </div>
        </div>
        <div class="personagem-atributo-subtitle-container">
          <h5 class="personagem-atributo-subtitle">
            Modificador:
          </h5>
          <div class="persoangem-atribut-value-container">
            <h5 class="personagem-atributo-value">
              {{ getModifier(personagemAtributoFinalCarisma) }}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.continue-button {
  display: block;
  margin-left: auto;
  margin-bottom: 2rem;
}
.tipo-atributos-button {
  margin-bottom: 2rem;
}
.atributos-wrapper {
  display: flex;
  justify-content: space-between;
}
.atributo-dados-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.atributo-dados-container label {
  margin-bottom: .5rem;
  font-size: 22px;
  font-weight: bold;
}
.atributo-dropdown {
  width: 9rem;
}
.roll-button {
  height: 2.5rem;
  margin-top: auto;
}
.atributos-pontos-title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.atributos-pontos-title-container h5:first-of-type {
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 0;
}
.atributos-pontos-title-container h5:last-of-type {
  font-size: 22px;
  margin-top: 0;
  margin-bottom: 1.5rem;
}
.atributo-pontos-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pontos-container {
  display: flex;
  align-items: center;
}
.pontos-container button {
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.atributo-pontos-title {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 18px;
  font-weight: normal;
}
.atributo-pontos {
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 1rem;
  margin-right: 1rem;
  font-size: 22px;
  font-weight: bold;
}
.personagem-atributos {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.personagem-title {
  margin-top: 0;
  margin-bottom: 1rem;
}
.personagem-atributos-row {
  display: flex;
  justify-content: space-between;
}
.personagem-atributo-container {
  width: 8.5rem;
}
.personagem-atributo-title {
  font-size: 24px;
  margin: 0;
}
.personagem-atributo-subtitle-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.personagem-atributo-subtitle {
  font-weight: normal;
  margin: 0;
}
.persoangem-atribut-value-container {
  display: flex;
  justify-content: center;
  width: 1.5rem;
}
.personagem-atributo-value {
  font-size: 20px;
  margin-top: .75rem;
  margin-bottom: .75rem;
}
</style>