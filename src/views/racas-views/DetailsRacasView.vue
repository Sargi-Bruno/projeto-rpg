<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { _getDoc } from '../../firebase/firestore'
import { sortAtributos, sortAtributosDinamico, renderDescricaoCompleta } from '@/utils/viewFunctions'

const router = useRouter()
const route = useRoute()
const raca = ref()

onMounted(async () => {
  raca.value = await _getDoc('racas', route.params.id)
  console.log(raca.value)
})
</script>

<template>
  <div class="content">
    <div v-if="raca">
      <div class="header">
        <h1>{{ raca.nome }}</h1>
        <p-button
          label="Editar"
          @click="router.push({ name: 'editar-raca', params: { id: raca.id } })"
        />
      </div>
      <div class="wrapper">
        <div class="wrapper-descricao">
          <div v-html="raca.descricao" />
        </div>
        <div class="wrapper-content">
          <div v-if="raca.tipoAtributos === 'fixo'">
            <h4 class="atributos">
              {{ sortAtributos(raca.atributos) }}.
            </h4>
          </div>
          <div v-if="raca.tipoAtributos === 'dinamico'">
            <div v-if="!raca.excecaoAtributo">
              <h4 class="atributos">
                +2 em três atributos diferentes.
              </h4>
            </div>
            <div v-else>
              <h4 class="atributos">
                +2 em três atributos diferentes (exceto {{ raca.excecaoAtributo }}), {{ raca.excecaoAtributo }} -2.
              </h4>
            </div>
          </div>
          <div v-if="raca.tipoAtributos === 'variante'">
            <h4 class="atributos">
              {{ sortAtributosDinamico(raca.atributos, raca.variantes) }}
            </h4>
          </div>
          <div class="habilidades">
            <div 
              v-for="(habilidade, index) in raca.habilidades"
              :key="index"
            >
              <h4 class="habilidades-title">
                {{ habilidade.nome }}
              </h4>
              <p class="habilidades-description">
                {{ renderDescricaoCompleta(habilidade.descricao) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header h1 {
  font-family: 'Tormenta', sans-serif;
  color: var(--tormenta-red);
}
.header button {
  height: 2.5rem;
}
.wrapper {
  display: flex;
}
.wrapper-descricao {
  width: 50%;
  padding-top: .5rem;
  padding-right: 2rem;
}
.wrapper-content {
  width: 50%;
}
.atributos {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 24px;
  font-family: 'Tormenta', sans-serif;
  color: var(--tormenta-red);
}
.habilidades-title {
  margin-top: 0;
  margin-bottom: .5rem;
  font-size: 20px;
  font-family: 'Tormenta', sans-serif;
  color: var(--tormenta-red);
}
.habilidades-description {
  margin-top: 0;
  margin-bottom: 2rem;
}
</style>