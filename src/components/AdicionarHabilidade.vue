<script setup>
import { ref } from 'vue'

defineProps({
  classe: {
    type: Boolean,
    default: false
  },
  poder: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['adicionar-habilidade'])

const habilidade = ref({
  nome: '',
  nivelConcedido: 1,
  habilidadeMagica: false,
  descricao: ''
})

const adicionarHabilidade = () => {
  emit('adicionar-habilidade', habilidade.value)

  habilidade.value.nome = ''
  habilidade.value.nivelConcedido = 1
  habilidade.value.descricao = ''
  habilidade.value.habilidadeMagica = false
}
</script>

<template>
  <div>
    <h2 v-if="poder">
      Adicionar Poder
    </h2>
    <h2 v-else>
      Adicionar Habilidade
    </h2>
    <label for="nome-habilidade">Nome</label>
    <p-input-text 
      id="nome-habilidade"
      v-model="habilidade.nome"
    />
    <div v-if="classe">
      <label for="nivel-concedido">Nível concedido</label>
      <p-input-text 
        id="nivel-concedido"
        v-model="habilidade.nivelConcedido"
      />
    </div>
    <label
      v-if="poder"
      for="magica-switch"
    >Poder Mágico</label>
    <label
      v-else
      for="magica-switch"
    >Habilidade Mágica</label>
    <p-input-switch 
      id="magica-switch"
      v-model="habilidade.habilidadeMagica"
    />
    <label>Descrição</label>
    <p-editor v-model="habilidade.descricao" />
    <p-button 
      label="Adicionar"
      @click="adicionarHabilidade"
    />
  </div>
</template>