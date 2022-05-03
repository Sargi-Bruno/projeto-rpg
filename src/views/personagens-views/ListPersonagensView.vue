<script setup>
import { useRouter } from 'vue-router'
import { createPersonagem } from '../../firebase/firestore'
import { getAuth } from 'firebase/auth'

const { currentUser } = getAuth()

const router = useRouter()
const personagem = {}

const handleCreatePersonagem = async () => {
  const id = await createPersonagem(personagem, currentUser.uid)
  router.push({ name: 'criar-personagem', params: { id: id } })
}
</script>

<template>
  <h1>Personagens</h1>
  <p-button 
    label="Criar Personagem"
    @click="handleCreatePersonagem"
  />
</template>