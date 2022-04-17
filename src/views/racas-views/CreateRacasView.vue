<script setup>
import { ref } from 'vue'

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
const atributosOptionSelected = ref('Modificadores fixos')
const excecaoSwitch = ref(false)
const varianteSwitch = ref(false)
const excecaoAtributo = ref('Força')
const raca = ref({
  nome: '',
  tipoModificadores: '', //fixo ou dinamico
  habilidades: [],
  tamanho: 'Médio',
  deslocamento: 9
})
const atributos = ref({
  forca: 0,
  destreza: 0,
  constituicao: 0,
  inteligencia: 0,
  sabedoria: 0,
  carisma: 0
})
const varianteNome = ref('')
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
    <p-select-button 
      v-model="atributosOptionSelected"
      :options="atributosButtonOptions"
    />
    <div v-if="atributosOptionSelected === 'Modificadores fixos'">
      <div>
        <label for="forca">Força</label>
        <p-input-number 
          id="forca"
          v-model="atributos.forca"
          :min="-99"
          :max="99"
        />
        <label for="destreza">Destreza</label>
        <p-input-number 
          id="destreza"
          v-model="atributos.destreza"
          :min="-99"
          :max="99"
        />
        <label for="constituicao">Constituição</label>
        <p-input-number 
          id="constituicao"
          v-model="atributos.constituicao"
          :min="-99"
          :max="99"
        />
        <label for="inteligencia">Inteligência</label>
        <p-input-number 
          id="inteligencia"
          v-model="atributos.inteligencia"
          :min="-99"
          :max="99"
        />
        <label for="sabedoria">Sabedoria</label>
        <p-input-number 
          id="sabedoria"
          v-model="atributos.sabedoria"
          :min="-99"
          :max="99"
        />
        <label for="carisma">Carisma</label>
        <p-input-number 
          id="carisma"
          v-model="atributos.carisma"
          :min="-99"
          :max="99"
        />
      </div>
      <div>
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
        <p-button :disabled="!varianteSwitch">
          Adicionar
        </p-button>
      </div>
    </div>
    <div v-else>
      <label for="excecao-switch">Exceção</label>
      <p-input-switch 
        id="excecao-switch"
        v-model="excecaoSwitch"
      />
      <label for="excecao-atributo">Atributo</label>
      <p-dropdown 
      id="excecao-atributo"
      v-model="excecaoAtributo"
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
    <p-button @click="adicionarHabilidade">
      Adicionar
    </p-button>
  </div>
</template>