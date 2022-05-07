<script setup>
import { onMounted, ref } from 'vue'
import { _getDoc, _updateDoc } from '../../../firebase/firestore'

const props = defineProps({
  personagemId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['handle-next-step'])

const personagem = ref()
const periciasOptions = ref([])
const periciasOpcoesOptions = ref([])
// const isClasseFinished = ref(false)

onMounted(async () => {
  personagem.value = await _getDoc('personagens', props.personagemId)
  personagem.value.classe.pericias.treinadas = []
  personagem.value.classe.pericias.opcoes.forEach((pericia) => {
    periciasOptions.value.push({ label: pericia })
  })
  if (personagem.value.classe.pericias.escolha1) {
    periciasOpcoesOptions.value.push(personagem.value.classe.pericias.escolha1)
    periciasOpcoesOptions.value.push(personagem.value.classe.pericias.escolha2)
  }
})

const handleSavePersonagem = async () => {
  _updateDoc(personagem.value).then(emit('handle-next-step', 6))
}
</script>

<template>
  <h1>Escolher Perícias</h1>
  <div v-if="personagem">
    <h4>Classe escolhida: {{ personagem.classe.nome }}</h4>
    <h4>
      Perícias.
      <span
        v-for="(pericia, i) in personagem.classe.pericias.concedidas"
        :key="i"
      >
        {{ pericia }},
      </span>
      mais {{ personagem.classe.pericias.quantidade }} a sua escolha entre
      <span
        v-for="(pericia, i) in personagem.classe.pericias.opcoes"
        :key="i"
      >
        {{ pericia }},
      </span>
    </h4>
    <div v-if="personagem.classe.pericias.escolha1">
      <label for="pericias-escolha1">Escolhas</label>
      <p-dropdown
        id="pericias-escolha1"
        :options="periciasOpcoesOptions"
      />
    </div>
    <label for="pericias">Escolha</label>
    <p-multi-select
      id="pericias"
      v-model="personagem.classe.pericias.treinadas"
      :options="periciasOptions"
      option-label="label"
      option-value="label"
      :filter="true"
    />
    <p-button
      label="Salvar"
      @click="handleSavePersonagem"
    />
  </div>
</template>
