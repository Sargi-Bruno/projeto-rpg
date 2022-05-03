<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { _addDoc } from '../../firebase/firestore'

const router = useRouter()
const registerLoading = ref(false)
const categoriaOptions = [
  'Arma',
  'Armadura',
  'Escudo',
  'Itens e Serviços',
]
const facilidadeDeUsoOptions = [
  'Simples',
  'Marcial',
  'Exótica',
  'De Fogo',
]
const propositoOptions = [
  'Corpo a Corpo',
  'À Distância',
]
const subdivisaoCorpoACorpoOptions = [
  'Leve',
  'Uma Mão',
  'Duas Mãos',
]
const subdivisaoADistanciaOptions = [
  'Arremesso',
  'Disparo',
]
const dadoOptions = [
  'd3',
  'd4',
  'd6',
  'd8',
  'd10',
  'd12',
  'd20',
  'd100',
]
const alcanceOptions = [
  '-',
  'Curto',
  'Médio',
  'Longo',
]
const tipoOptions = [
  'Corte',
  'Impacto',
  'Perfuração',
]
const habilidadesDeArmasOptions = [
  'Adaptável',
  'Ágil',
  'Alongada',
  'Dupla',
  'Versátil',
]
const classificacaoArmaduraOptions = [
  'Leve',
  'Pesada',
]
const classificacaoItensOptions = [
  {label: 'Gerais'},
  {label: 'Alquimia'},
  {label: 'Alimentação'},
  {label: 'Animais'},
  {label: 'Veículos'},
  {label: 'Vestuário'},
  {label: 'Hospedagem'},
  {label: 'Serviços'},
]
const equipamento = ref({
  nome: '',
  descricao: '',
  categoria: 'Arma', // Arma, Armadura, Escudo, Itens e Serviços
})
const arma = ref({
  facilidadeDeUso: 'Simples', // Simples, Marcial, Exótica, De Fogo
  proposito: 'Corpo a Corpo', // Corpo a Corpo, Á Distância
  subdivisao: 'Leve', // Leve, Uma Mão, Duas Mãos para Corpo a Corpo. Arremesso, Disparo para À Distância
  preco: null,
  dano: {
    quantidade: 1,
    dado: 'd4',
  },
  critico: {
    margemDeAmeaca: 20,
    multiplicador: 2,
  },
  alcance: '-', // -, Curto, Médio, Longo
  peso: null,
  tipo: '', // Corte, Impacto, Perfuração
  habilidadesDeArmas: '', // Adaptável, Ágil, Alongada, Dupla, Versátil
})
const armadura = ref({
  classificacao: 'Leve', // Leve, Pesada
  preco: null,
  defesa: 1,
  penalidade: 0,
  peso: null,
})
const escudo = ref({
  proposito: 'Corpo a Corpo', // Corpo a Corpo, Á Distância
  subdivisao: 'Uma Mão', // Leve, Uma Mão, Duas Mãos
  preco: null,
  defesa: 1,
  penalidade: 0,
  peso: null,
  dano: {
    quantidade: 1,
    dado: 'd4',
  },
  critico: {
    margemDeAmeaca: 20,
    multiplicador: 2,
  },
  alcance: '-', // -, Curto, Médio, Longo
  tipo: '', // Corte, Impacto, Perfuração
  habilidadesDeArmas: '', // Adaptável, Ágil, Alongada, Dupla, Versátil
})
const itens = ref({
  classificacao: 'Gerais', // Gerais, Alquimia, Alimentação, Animais, Veículos, Vestuário, Hospedagem, Serviços
  preco: null,
  peso: null,
})

const handleRegister = () => {
  registerLoading.value = true

  if(equipamento.value.categoria === 'Arma') {
    equipamento.value = {
      ...equipamento.value,
      ...arma.value
      }
  } else if(equipamento.value.categoria === 'Armadura') {
    equipamento.value = {
      ...equipamento.value,
      ...armadura.value
    }
  } else if(equipamento.value.categoria === 'Escudo') {
    equipamento.value = {
      ...equipamento.value,
      ...escudo.value
    }
  } else if(equipamento.value.categoria === 'Itens e Serviços') {
    equipamento.value = {
      ...equipamento.value,
      ...itens.value
    }
  }
  
  _addDoc('equipamentos', equipamento.value)
  router.push({ name: 'home' })
}
</script>

<template>
  <h1>Criar Equipamento</h1>
  <div>
    <label for="nome">Nome</label>
    <p-input-text 
      id="nome"
      v-model="equipamento.nome"
      autocomplete="off"
    />
    <label>Descrição</label>
    <p-editor v-model="equipamento.descricao" />
  </div>
  <!-- Categoria do Equipamento -->
  <h3>Categoria</h3>
  <p-select-button 
    v-model="equipamento.categoria"
    :options="categoriaOptions"
  />
  <div v-if="equipamento.categoria === 'Arma'">
    <label for="facilidade-de-uso">Facilidade de Uso</label>
    <p-dropdown 
      id="facilidade-de-uso"
      v-model="arma.facilidadeDeUso"
      :options="facilidadeDeUsoOptions"
    />
    <label>Propósito</label>
    <p-select-button 
      v-model="arma.proposito"
      :options="propositoOptions"
    />
    <div v-if="arma.proposito === 'Corpo a Corpo'">
      <label>Subdivisão</label>
      <p-select-button 
        v-model="arma.subdivisao"
        :options="subdivisaoCorpoACorpoOptions"
      />
    </div>
    <div v-else>
      <label>Subdivisão</label>
      <p-select-button 
        v-model="arma.subdivisao"
        :options="subdivisaoADistanciaOptions"
      />
    </div>
    <label for="arma-preco">Preço</label>
    <p-input-number 
      id="arma-preco"
      v-model="arma.preco"
      prefix="T$ "
      placeholder="-"
      :maxFractionDigits="1"
    />
    <label>Dano</label>
    <label for="arma-dano-quantidade">Quantidade</label>
    <p-input-number 
      id="arma-dano-quantidade"
      v-model="arma.dano.quantidade"
    />
    <label for="arma-dano-dado">Dado</label>
    <p-dropdown 
      id="arma-dano-dado"
      v-model="arma.dano.dado"
      :options="dadoOptions"
    />
    <label>Crítico</label>
    <label for="arma-critico-margem-de-ameaca">Margem de Ameaça</label>
    <p-input-number 
      id="arma-critico-margem-de-ameaca"
      v-model="arma.critico.margemDeAmeaca"
      showButtons
      :min="1"
      :max="20"
    />
    <label for="arma-critico-multiplicador">Multiplicador</label>
    <p-input-number 
      id="arma-critico-multiplicador"
      v-model="arma.critico.multiplicador"
      suffix=" x"
      showButtons
      :min="2"
      :max="99"
    />
    <label for="arma-alcance">Alcance</label>
    <p-dropdown 
      id="arma-alcance"
      v-model="arma.alcance"
      :options="alcanceOptions"
    />
    <label for="arma-peso">Peso</label>
    <p-input-number 
      id="arma-peso"
      v-model="arma.peso"
      suffix=" kg"
      placeholder="-"
      :minFractionDigits="1"
      :maxFractionDigits="1"
    />
    <label for="arma-tipo">Tipo</label>
    <p-multi-select
      id="arma-tipo"
      v-model="arma.tipo"
      :options="tipoOptions"
    />
    <label for="arma-habilidades-de-armas">Habilidades de Armas</label>
    <p-multi-select
      id="arma-habilidades-de-armas"
      v-model="arma.habilidadesDeArmas"
      :options="habilidadesDeArmasOptions"
    />
  </div>
  <div v-if="equipamento.categoria === 'Armadura'">
    <label for="armadura-classificacao">Classificação</label>
    <p-dropdown 
      id="armadura-classificacao"
      v-model="armadura.classificacao"
      :options="classificacaoArmaduraOptions"
    />
    <label for="armadura-preco">Preço</label>
    <p-input-number 
      id="armadura-preco"
      v-model="armadura.preco"
      prefix="T$ "
      placeholder="-"
      :maxFractionDigits="1"
    />
    <label for="armadura-defesa">Bônus na Defesa</label>
    <p-input-number 
      id="armadura-defesa"
      v-model="armadura.defesa"
      showButtons
      :min="1"
      :max="99"
    />
    <label for="armadura-penalidade">Penalidade de Armadura</label>
    <p-input-number 
      id="armadura-penalidade"
      v-model="armadura.penalidade"
      showButtons
      :min="-99"
      :max="0"
    />
    <label for="armadura-peso">Peso</label>
    <p-input-number 
      id="armadura-peso"
      v-model="armadura.peso"
      suffix=" kg"
      placeholder="-"
      :minFractionDigits="1"
      :maxFractionDigits="1"
    />
  </div>
  <div v-if="equipamento.categoria === 'Escudo'">
    <label>Propósito</label>
    <p-select-button 
      v-model="escudo.proposito"
      :options="propositoOptions"
    />
    <div v-if="escudo.proposito === 'Corpo a Corpo'">
      <label>Subdivisão</label>
      <p-select-button 
        v-model="escudo.subdivisao"
        :options="subdivisaoCorpoACorpoOptions"
      />
    </div>
    <div v-else>
      <label>Subdivisão</label>
      <p-select-button 
        v-model="escudo.subdivisao"
        :options="subdivisaoADistanciaOptions"
      />
    </div>
    <label for="escudo-preco">Preço</label>
    <p-input-number 
      id="escudo-preco"
      v-model="escudo.preco"
      prefix="T$ "
      placeholder="-"
      :maxFractionDigits="1"
    />
    <label>Dano</label>
    <label for="escudo-dano-quantidade">Quantidade</label>
    <p-input-number 
      id="escudo-dano-quantidade"
      v-model="escudo.dano.quantidade"
    />
    <label for="escudo-dano-dado">Dado</label>
    <p-dropdown 
      id="escudo-dano-dado"
      v-model="escudo.dano.dado"
      :options="dadoOptions"
    />
    <label>Crítico</label>
    <label for="escudo-critico-margem-de-ameaca">Margem de Ameaça</label>
    <p-input-number 
      id="escudo-critico-margem-de-ameaca"
      v-model="escudo.critico.margemDeAmeaca"
      showButtons
      :min="1"
      :max="20"
    />
    <label for="escudo-critico-multiplicador">Multiplicador</label>
    <p-input-number 
      id="escudo-critico-multiplicador"
      v-model="escudo.critico.multiplicador"
      suffix=" x"
      showButtons
      :min="2"
      :max="99"
    />
    <label for="escudo-alcance">Alcance</label>
    <p-dropdown 
      id="escudo-alcance"
      v-model="escudo.alcance"
      :options="alcanceOptions"
    />
    <label for="escudo-peso">Peso</label>
    <p-input-number 
      id="escudo-peso"
      v-model="escudo.peso"
      suffix=" kg"
      placeholder="-"
      :minFractionDigits="1"
      :maxFractionDigits="1"
    />
    <label for="escudo-tipo">Tipo</label>
    <p-multi-select
      id="escudo-tipo"
      v-model="escudo.tipo"
      :options="tipoOptions"
    />
    <label for="escudo-habilidades-de-armas">Habilidades de Armas</label>
    <p-multi-select
      id="escudo-habilidades-de-armas"
      v-model="escudo.habilidadesDeArmas"
      :options="habilidadesDeArmasOptions"
    />
    <label for="escudo-defesa">Bônus na Defesa</label>
    <p-input-number 
      id="escudo-defesa"
      v-model="escudo.defesa"
      showButtons
      :min="1"
      :max="99"
    />
    <label for="escudo-penalidade">Penalidade de Armadura</label>
    <p-input-number 
      id="escudo-penalidade"
      v-model="escudo.penalidade"
      showButtons
      :min="-99"
      :max="0"
    />
  </div>
  <div v-if="equipamento.categoria === 'Itens e Serviços'">
    <label for="itens-classificacao">Classificação</label>
    <p-dropdown 
      id="itens-classificacao"
      v-model="itens.classificacao"
      :options="classificacaoItensOptions"
      optionLabel="label"
      optionValue="label"
      :filter="true"
    />
    <label for="itens-preco">Preço</label>
    <p-input-number 
      id="itens-preco"
      v-model="itens.preco"
      prefix="T$ "
      placeholder="-"
      :maxFractionDigits="1"
    />
    <label for="itens-peso">Peso</label>
    <p-input-number 
      id="itens-peso"
      v-model="itens.peso"
      suffix=" kg"
      placeholder="-"
      :minFractionDigits="1"
      :maxFractionDigits="1"
    />
  </div>
  <p-button
    label="Finalizar"
    @click="handleRegister"
    :disabled="registerLoading"
  />
</template>