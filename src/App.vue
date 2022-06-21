<script setup>
import { RouterView } from 'vue-router'
import NavbarViewVue from './components/NavbarView.vue';
</script>

<template>
  <NavbarViewVue />
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

@import 'primevue/resources/primevue.min.css ';
@import 'primeicons/primeicons.css';
@import './assets/theme.css';
/* @import 'primevue/resources/themes/saga-blue/theme.css'; */

@font-face {
  font-family: 'Tormenta';
  src: url('./assets/fonts/Tormenta.ttf') format('truetype');
}

*, *::after, *::before {
  box-sizing: border-box; 
}

:root {
  --tormenta-red: #d13133;
  --tormenta-dark-red: #b52d34;
  --tormenta-background: #f4f3f2;
  --background-color: #F5F5F5;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  background-color: var(--background-color);
  line-height: 1.6;
}

.content {
  width: 75rem;
  margin-left: auto;
  margin-right: auto;
}

.page-title {
  font-family: 'Tormenta', sans-serif;
  color: var(--tormenta-red);
}

.p-inputnumber-input {
  width: 6rem;
  height: 2.5rem;
}

.p-tabview-panels {
  background-color: var(--background-color) !important;
}

.p-tabview-panel {
  background-color: var(--background-color);
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
}

.input-switch-container {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.input-switch-container label {
  margin-right: .5rem;
}

.flex {
  display: flex;
}
</style>
