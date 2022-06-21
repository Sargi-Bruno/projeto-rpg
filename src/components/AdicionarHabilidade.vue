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
  },
  noTitle: {
    type: Boolean,
    default: false
  },
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
    <div v-if="!noTitle">
      <h2 v-if="poder">
        Adicionar Poder
      </h2>
      <h2 v-else>
        Adicionar Habilidade
      </h2>
    </div>
    <div class="header">
      <div class="input-container">
        <label for="nome-habilidade">Nome</label>
        <p-input-text 
          id="nome-habilidade"
          v-model="habilidade.nome"
        />
      </div>
      <div 
        v-if="classe"
        class="input-nivel"
      >
        <label for="nivel-concedido">Nível concedido</label>
        <p-input-number 
          id="nivel-concedido"
          v-model="habilidade.nivelConcedido"
        />
      </div>
      <div class="switch-container">
        <label
          v-if="poder"
          for="magica-switch"
        >
          Poder Mágico
        </label>
        <label
          v-else
          for="magica-switch"
        >
          Habilidade Mágica
        </label>
        <p-input-switch 
          id="magica-switch"
          v-model="habilidade.habilidadeMagica"
        />
      </div>
    </div>   
    <div>
      <label>Descrição</label>
      <p-editor 
        v-model="habilidade.descricao" 
        editor-style="height: 10rem"
      />
    </div> 
    <p-button 
      label="Adicionar"
      class="adicionar-button"
      @click="adicionarHabilidade"
    />
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.input-container {
  display: flex;
  flex-direction: column;
  width: 10rem;
}
.switch-container {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}
.switch-container label {
  margin-right: 0.5rem;
}
.adicionar-button {
  display: block;
  margin-top: 1rem;
  margin-left: auto;
}
.input-nivel {
  width: 8rem;
}
</style>