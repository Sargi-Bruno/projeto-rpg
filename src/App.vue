<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { 
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut 
} from 'firebase/auth'

const auth = getAuth()
const items = [
  {label: 'Início', name: 'home'},
  {label: 'Raças', name: 'listar-racas'},
  {label: 'Classes', name: 'listar-classes'},
  {label: 'Origens', name: 'listar-origens'},
  {label: 'Divindades', name: 'listar-divindades'},
  {label: 'Poderes Gerais', name: 'listar-poderes-gerais'},
  {label: 'Equipamentos', name: 'listar-equipamentos'},
  {label: 'Magias', name: 'listar-magias'},
  {label: 'Personagens', name: 'listar-personagens'},
]
const isLoggedIn = ref(false)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if(user) isLoggedIn.value = true
    else isLoggedIn.value = false
  })
})

const handleSignIn = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(result => {
      console.log(result.user)
      // router.push('')
    })
    .catch(err => {
      console.log(err)
    })
}

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log('signOut')
    })
}
</script>

<template>
  <h1 class="title">
    Projeto RPG
  </h1>
  <p-menubar :model="items">
    <template #item="{item}">
      <RouterLink
        :to="{ name: item.name }"
        class="p-menuitem-link"
      >
        {{ item.label }}
      </RouterLink>
    </template>
    <template #end>
      <div v-if="isLoggedIn === false">
        <p-button 
          label="Login"
          @click="handleSignIn"
        />
      </div>
      <div v-else>
        <p-button 
          label="Logout"
          @click="handleSignOut"
        />
      </div>
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
