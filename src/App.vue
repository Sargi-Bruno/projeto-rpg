<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import { ref } from 'vue'

// const selectedCars = ref(null)
// const cars = ref([
//   {brand: 'Audi', value: 'Audi'},
//   {brand: 'BMW', value: 'BMW'},
//   {brand: 'Fiat', value: 'Fiat'},
//   {brand: 'Honda', value: 'Honda'},
//   {brand: 'Jaguar', value: 'Jaguar'},
//   {brand: 'Mercedes', value: 'Mercedes'},
//   {brand: 'Renault', value: 'Renault'},
//   {brand: 'Volkswagen', value: 'Volkswagen'},
//   {brand: 'Volvo', value: 'Volvo'}
// ])
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <h1 class="title">Projeto RPG</h1>
        <RouterLink :to="{ name: 'home' }">Início</RouterLink>
        <RouterLink :to="{ name: 'criar-raça' }">Raças</RouterLink>
        <RouterLink :to="{ name: 'criar-classe' }">Classes</RouterLink>
        <RouterLink :to="{ name: 'criar-origem' }">Origens</RouterLink>
        <RouterLink :to="{ name: 'criar-deus' }">Deuses</RouterLink>
        <RouterLink :to="{ name: 'criar-poder-geral' }">Poderes Gerais</RouterLink>
        <RouterLink :to="{ name: 'criar-equipamento' }">Equipamentos</RouterLink>
        <RouterLink :to="{ name: 'criar-magia' }">Magias</RouterLink>
      </nav>
    </div>
    <!-- <p-button label="Botão"></p-button>
    <p-input-number />
    <p-multi-select v-model="selectedCars" :options="cars" optionLabel="brand" placeholder="Select Brands" />
    <p-editor editorStyle="height: 320px">
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
    </p-editor> -->
  </header>

  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

@import 'primevue/resources/primevue.min.css ';
@import 'primeicons/primeicons.css';
/* @import './assets/theme.css'; */
@import 'primevue/resources/themes/md-light-indigo/theme.css';

@font-face {
  font-family: 'Tormenta';
  src: url('./assets/fonts/Tormenta.ttf') format('truetype');
}

*, *::after, *::before {
  box-sizing: border-box;
  
}

body {
  margin: 0;
}

#app {
  font-family: 'Roboto', sans-serif;
}

.title {
  font-family: 'Tormenta', sans-serif;
}
</style>
