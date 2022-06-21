<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut 
} from 'firebase/auth'

const auth = getAuth()
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
  <div class="content">
    <h1 class="title">
      Projeto RPG
    </h1>
    <div class="nav-bar">
      <RouterLink :to="{ name: 'home' }">
        Início
      </RouterLink>
      <RouterLink :to="{ name: 'listar-personagens' }">
        Personagens
      </RouterLink>
      <RouterLink :to="{ name: 'listar-racas' }">
        Raças
      </RouterLink>
      <RouterLink :to="{ name: 'listar-classes' }">
        Classes
      </RouterLink>
      <RouterLink :to="{ name: 'listar-origens' }">
        Origens
      </RouterLink>
      <RouterLink :to="{ name: 'listar-divindades' }">
        Divindades
      </RouterLink>
      <RouterLink :to="{ name: 'listar-poderes-gerais' }">
        Poderes Gerais
      </RouterLink>
      <RouterLink :to="{ name: 'listar-equipamentos' }">
        Equipamentos
      </RouterLink>
      <RouterLink :to="{ name: 'listar-magias' }">
        Magias
      </RouterLink>
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
    </div>
  </div>
</template>

<style scoped>
.title {
  font-family: 'Tormenta', sans-serif;
  color: var(--tormenta-red);
}
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>