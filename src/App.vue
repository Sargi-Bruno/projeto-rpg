<script setup>
import { RouterLink, RouterView } from 'vue-router'

const items = [
  {label: 'Início', name: 'home'},
  {label: 'Raças', name: 'listar-racas'},
  {label: 'Classes', name: 'listar-classes'},
  {label: 'Origens', name: 'listar-origens'},
  {label: 'Deuses', name: 'listar-deuses'},
  {label: 'Poderes Gerais', name: 'listar-poderes-gerais'},
  {label: 'Equipamentos', name: 'listar-equipamentos'},
  {label: 'Magias', name: 'listar-magias'},
]
</script>

<template>
  <h1 class="title">Projeto RPG</h1>
  <p-menubar :model="items">
    <template #item="{item}">
      <RouterLink :to="{ name: item.name }" class="p-menuitem-link">
        {{item.label}}
      </RouterLink>
    </template>
  </p-menubar>

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
