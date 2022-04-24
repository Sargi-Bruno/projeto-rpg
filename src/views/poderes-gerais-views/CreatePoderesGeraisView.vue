<script setup>
import { ref } from 'vue'

const categoriaOptions = [
  'Combate',
  'Destino',
  'Magia',
  'Concedidos',
  'Tormenta',
]

const poderGeral = ref({
  nome: '',
  categoria: '', // Combate, Destino, Magia, Concedidos, Tormenta
  descricao: '',
  habilidadeMagica: false,
})
</script>

<template>
  <h1>Criar Poder Geral</h1>
  <div>
    <label for="nome">Nome</label>
    <p-input-text 
      id="nome"
      v-model="poderGeral.nome"
    />
    <div>
      <label for="canalizar-energia">Categoria</label>
      <p-dropdown
        id="canalizar-energia"
        v-model="poderGeral.categoria"
        :options="categoriaOptions"
      />
    </div>
    <label for="magica-switch">Poder Mágico</label>
    <p-input-switch 
      id="magica-switch"
      v-model="poderGeral.habilidadeMagica"
    />
    <label>Descrição</label>
    <!-- editorStyle="height: 320px" -->
    <p-editor v-model="poderGeral.descricao">
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