<script setup>
import { ref } from 'vue'

const origem = ref({
  nome: '',
  descricao: '',
  itens: '',
  beneficios: '',
  poderUnico: {
    nome: '',
    descricao: '',
  }
})
</script>

<template>
  <h1>Criar Origem</h1>
  <div>
    <label for="nome">Nome</label>
    <p-input-text 
      id="nome"
      v-model="origem.nome"
    />
    <label>Descrição</label>
    <!-- editorStyle="height: 320px" -->
    <p-editor v-model="origem.descricao">
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
    <label>Itens</label>
    <!-- editorStyle="height: 320px" -->
    <p-editor v-model="origem.itens">
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
    <label>Benefícios</label>
    <!-- editorStyle="height: 320px" -->
    <p-editor v-model="origem.beneficios">
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
    <h4>Poder Único</h4>
    <label for="poder-unico-nome">Nome</label>
    <p-input-text 
      id="poder-unico-nome"
      v-model="origem.poderUnico.nome"
    />
    <label>Descrição</label>
    <!-- editorStyle="height: 320px" -->
    <p-editor v-model="origem.poderUnico.descricao">
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
  <p-button 
      label="Finalizar"
  />
</template>