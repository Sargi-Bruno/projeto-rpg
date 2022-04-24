<script setup>
import { ref } from 'vue'

const canalizarEnergiaOptions = [
  'Positiva',
  'Negativa',
  'Qualquer',
]

const deus = ref({
  nome: '',
  descricao: '',
  crencasObjetivos: '',
  devotos: '',
  simboloSagrado: '',
  canalizarEnergia: '',
  armaPreferida: '',
  obrigacoesRestricoes: '',
  poderesConcedidos: '',
})
</script>

<template>
  <h1>Criar Deus</h1>
  <div>
    <label for="nome">Nome</label>
    <p-input-text 
      id="nome"
      v-model="deus.nome"
    />
    <label>Descrição</label>
    <!-- editorStyle="height: 320px" -->
    <p-editor v-model="deus.descricao">
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
  </div>
  <div>
    <label>Crenças e Objetivos</label>
    <!-- editorStyle="height: 320px" -->
    <p-editor v-model="deus.crencasObjetivos">
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
  </div>
  <div>
    <label>Devotos</label>
    <!-- editorStyle="height: 320px" -->
    <p-editor v-model="deus.devotos">
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
  </div>
  <div>
    <label>Símbolo Sagrado</label>
    <!-- editorStyle="height: 320px" -->
    <p-editor v-model="deus.crencasObjetivos">
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
  </div>
  <div>
    <label for="canalizar-energia">Canalizar Energia</label>
    <p-dropdown
      id="canalizar-energia"
      v-model="deus.canalizarEnergia"
      :options="canalizarEnergiaOptions"
    />
  </div>
  <div>
    <label>Arma Preferida</label>
    <!-- editorStyle="height: 320px" -->
    <p-editor v-model="deus.armaPreferida">
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
  </div>
  <div>
    <label>Obrigações e Restrições</label>
    <!-- editorStyle="height: 320px" -->
    <p-editor v-model="deus.obrigacoesRestricoes">
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
  </div>
  <div>
    <label>Poderes Concedidos</label>
    <!-- editorStyle="height: 320px" -->
    <p-editor v-model="deus.poderesConcedidos">
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
  </div>
</template>