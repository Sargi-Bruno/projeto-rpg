<script setup>
import { onMounted, ref } from 'vue'
import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import { _getDoc, _getDocs, _updateDoc } from '../../../firebase/firestore'
import AddInitialWeaponsView from './equipamentos-view/AddInitialWeaponsView.vue'
import AddInitialArmorView from './equipamentos-view/AddInitialArmorView.vue'
import AddItemsView from './equipamentos-view/AddItemsView.vue'
import InventoryView from './equipamentos-view/InventoryView.vue'
import { addInitialItemsToInventory, addItem, updateItemQuantity, removeItem } from '@/utils/personagemFunctions.js'

const props = defineProps({
  personagemId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['handle-next-step'])

const ARCANISTA_ID = 'L6Q01cwH4whrWKKo48gP'
const loading = ref(true)
const personagem = ref()
const equipamentos = ref([])

onMounted(async () => {
  personagem.value = await _getDoc('personagens', props.personagemId)
  equipamentos.value = await _getDocs('equipamentos')

  if(!personagem.value.inventario) {
    const roll = new DiceRoll('4d6')
    personagem.value.inventario = []
    personagem.value.tibares = {}
    personagem.value.tibares.prata = roll.total
    addInitialItemsToInventory(personagem.value, equipamentos.value)
    _updateDoc(personagem.value)
  }

  loading.value = false
})

const handleChangeQuantity = (payload) => {
  updateItemQuantity(payload.id, personagem.value, payload.quantidade)
}

const handleRemove = (id) => {
  removeItem(id, personagem.value)
}

const handleAdd = (payload) => {
  addItem(payload.equipamento, personagem.value, payload.quantidade)
}

const handleChangeTibares = (tibares) => {
  personagem.value.tibares.prata = tibares
}

const handleRollTibares = (tibares) => {
  personagem.value.tibares.prata = tibares
}

const handleSavePersonagem = async () => {
  _updateDoc(personagem.value)
    .then(emit('handle-next-step', 6))
}
</script>

<template>
  <div v-if="!loading">
    <div v-if="personagem.classe">
      <p-button
        class="button"
        label="Continuar"
        @click="handleSavePersonagem"
      />
      <p-accordion>
        <p-accordion-tab header="Armamento Inicial">
          <AddInitialWeaponsView
            :equipamentos="equipamentos"
            :classe="personagem.classe"
            @handle-add="handleAdd"
          />
        </p-accordion-tab>
        <div v-if="personagem.classe.id !== ARCANISTA_ID">
          <p-accordion-tab header="Armadura Inicial">
            <AddInitialArmorView
              :equipamentos="equipamentos"
              :classe="personagem.classe"
              @handle-add="handleAdd"
            />
          </p-accordion-tab>
        </div>
        <p-accordion-tab header="Adicionar Itens">
          <AddItemsView 
            :equipamentos="equipamentos"
            @handle-add="handleAdd"
          />
        </p-accordion-tab>
      </p-accordion>
      <div>
        <InventoryView
          :personagem="personagem"
          @handle-change-tibares="handleChangeTibares"
          @handle-roll-tibares="handleRollTibares"
          @handle-change-quantity="handleChangeQuantity"
          @handle-remove="handleRemove"
        />
      </div>
    </div>
    <div v-else>
      <h1>Escolha uma classe primeiro</h1>
    </div>
  </div>
</template>

<style scoped>
.button {
  display: block;
  margin-left: auto;
  margin-bottom: 2rem;
}
</style>