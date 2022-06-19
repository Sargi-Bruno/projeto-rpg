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
  municao: {
    nome: '',
    quantidade: 20,
    preco: null,
    peso: null,
  },
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
  subdivisao: 'Uma Mão', // Leve, Uma Mão, Duas Mãos para Corpo a Corpo. Arremesso, Disparo para À Distância
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
  municao: {
    nome: '',
    quantidade: 20,
    preco: null,
    peso: null,
  },
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
  router.push({ name: 'listar-equipamentos' })
}
</script>

<template>
  <div class="content">
    <h1>Criar Equipamento</h1>
    <div class="flex">
      <div class="first-column">
        <div class="input-container name-container">
          <label for="nome">Nome</label>
          <p-input-text 
            id="nome"
            v-model="equipamento.nome"
            autocomplete="off"
          />
        </div>
        <label>Descrição</label>
        <p-editor 
          v-model="equipamento.descricao" 
          editor-style="height: 10rem"
        />
      </div>
      <!-- Categoria do Equipamento -->
      <div class="second-column">
        <div class="row">
          <div>
            <label>Categoria</label>
            <p-select-button 
              v-model="equipamento.categoria"
              :options="categoriaOptions"
            />
          </div>
        </div>
        <div v-if="equipamento.categoria === 'Arma'">
          <div class="row">
            <div class="first-element">
              <label>Propósito</label>
              <p-select-button 
                v-model="arma.proposito"
                :options="propositoOptions"
              />
            </div>
            <div>
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
            </div>
          </div>
          <div class="row">
            <div class="input-container">
              <label for="facilidade-de-uso">Facilidade de Uso</label>
              <p-dropdown 
                id="facilidade-de-uso"
                v-model="arma.facilidadeDeUso"
                :options="facilidadeDeUsoOptions"
              />
            </div>
            <div class="input-container">
              <label for="arma-preco">Preço</label>
              <p-input-number 
                id="arma-preco"
                v-model="arma.preco"
                prefix="T$ "
                placeholder="-"
                :max-fraction-digits="1"
              />
            </div>
            <div class="input-container">
              <label for="arma-peso">Peso</label>
              <p-input-number 
                id="arma-peso"
                v-model="arma.peso"
                suffix=" kg"
                placeholder="-"
                :min-fraction-digits="1"
                :max-fraction-digits="1"
              />
            </div>
          </div>
          <div class="row">
            <div class="input-container">
              <label for="arma-alcance">Alcance</label>
              <p-dropdown 
                id="arma-alcance"
                v-model="arma.alcance"
                :options="alcanceOptions"
              />
            </div>
            <div class="input-container">
              <label for="arma-tipo">Tipo</label>
              <p-multi-select
                id="arma-tipo"
                v-model="arma.tipo"
                :options="tipoOptions"
              />
            </div>
            <div class="input-container">
              <label for="arma-habilidades-de-armas">Habilidades de Armas</label>
              <p-multi-select
                id="arma-habilidades-de-armas"
                v-model="arma.habilidadesDeArmas"
                :options="habilidadesDeArmasOptions"
              />
            </div>
          </div>
          <div class="row">
            <div class="input-container">
              <label>Dano</label>
              <div>
                <p-input-number 
                  id="arma-dano-quantidade"
                  v-model="arma.dano.quantidade"
                />
                <p-dropdown 
                  id="arma-dano-dado"
                  v-model="arma.dano.dado"
                  class="second-input"
                  :options="dadoOptions"
                />
              </div>
            </div>
            <div class="input-container">
              <label>Crítico</label>
              <div>
                <p-input-number 
                  id="arma-critico-margem-de-ameaca"
                  v-model="arma.critico.margemDeAmeaca"
                  show-buttons
                  :min="1"
                  :max="20"
                />
                <p-input-number 
                  id="arma-critico-multiplicador"
                  v-model="arma.critico.multiplicador"
                  class="second-input"
                  suffix=" x"
                  show-buttons
                  :min="2"
                  :max="99"
                />
              </div>
            </div>
          </div>
          <div v-if="arma.subdivisao === 'Disparo'">
            <div class="row">
              <div class="input-container">
                <label for="arma-nome-municao">Munição</label>
                <p-input-text 
                  id="arma-nome-municao"
                  v-model="arma.municao.nome"
                  autocomplete="off"
                />
              </div>
              <div class="input-container">
                <label for="arma-municao-quantidade">Quantidade</label>
                <p-input-number 
                  id="arma-municao-quantidade"
                  v-model="arma.municao.quantidade"
                />
              </div>
              <div class="input-container">
                <label for="arma-municao-preco">Preço</label>
                <p-input-number 
                  id="arma-municao-preco"
                  v-model="arma.municao.preco"
                  prefix="T$ "
                  placeholder="-"
                  :max-fraction-digits="1"
                />
              </div>
              <div class="input-container">
                <label for="arma-municao-peso">Peso</label>
                <p-input-number 
                  id="arma-municao-peso"
                  v-model="arma.municao.peso"
                  suffix=" kg"
                  placeholder="-"
                  :min-fraction-digits="1"
                  :max-fraction-digits="1"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="equipamento.categoria === 'Armadura'">
          <div class="row">
            <div class="input-container">
              <label for="armadura-classificacao">Classificação</label>
              <p-dropdown 
                id="armadura-classificacao"
                v-model="armadura.classificacao"
                :options="classificacaoArmaduraOptions"
              />
            </div>
            <div class="input-container">
              <label for="armadura-preco">Preço</label>
              <p-input-number 
                id="armadura-preco"
                v-model="armadura.preco"
                prefix="T$ "
                placeholder="-"
                :max-fraction-digits="1"
              />
            </div>
            <div class="input-container">
              <label for="armadura-peso">Peso</label>
              <p-input-number 
                id="armadura-peso"
                v-model="armadura.peso"
                suffix=" kg"
                placeholder="-"
                :min-fraction-digits="1"
                :max-fraction-digits="1"
              />
            </div>
          </div>
          <div class="row">
            <div class="input-container">
              <label for="armadura-defesa">Bônus na Defesa</label>
              <div>
                <p-input-number 
                  id="armadura-defesa"
                  v-model="armadura.defesa"
                  show-buttons
                  :min="1"
                  :max="99"
                />
              </div>
            </div>
            <div class="input-container">
              <label for="armadura-penalidade">Penalidade de Armadura</label>
              <div>
                <p-input-number 
                  id="armadura-penalidade"
                  v-model="armadura.penalidade"
                  show-buttons
                  :min="-99"
                  :max="0"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="equipamento.categoria === 'Escudo'">
          <div class="row">
            <div class="first-element">
              <label>Propósito</label>
              <p-select-button 
                v-model="escudo.proposito"
                :options="propositoOptions"
              />
            </div>
            <div>
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
            </div>
          </div>
          <div class="row">
            <div class="input-container">
              <label for="escudo-preco">Preço</label>
              <p-input-number 
                id="escudo-preco"
                v-model="escudo.preco"
                prefix="T$ "
                placeholder="-"
                :max-fraction-digits="1"
              />
            </div>
            <div class="input-container">
              <label for="escudo-peso">Peso</label>
              <p-input-number 
                id="escudo-peso"
                v-model="escudo.peso"
                suffix=" kg"
                placeholder="-"
                :min-fraction-digits="1"
                :max-fraction-digits="1"
              />
            </div>
          </div>
          <div class="row">
            <div class="input-container">
              <label for="escudo-alcance">Alcance</label>
              <p-dropdown 
                id="escudo-alcance"
                v-model="escudo.alcance"
                :options="alcanceOptions"
              />
            </div>
            <div class="input-container">
              <label for="escudo-tipo">Tipo</label>
              <p-multi-select
                id="escudo-tipo"
                v-model="escudo.tipo"
                :options="tipoOptions"
              />
            </div>
            <div class="input-container">
              <label for="escudo-habilidades-de-armas">Habilidades de Armas</label>
              <p-multi-select
                id="escudo-habilidades-de-armas"
                v-model="escudo.habilidadesDeArmas"
                :options="habilidadesDeArmasOptions"
              />
            </div>
          </div>
          <div class="row">
            <div class="input-container">
              <label>Dano</label>
              <div>
                <p-input-number 
                  id="escudo-dano-quantidade"
                  v-model="escudo.dano.quantidade"
                />
                <p-dropdown 
                  id="escudo-dano-dado"
                  v-model="escudo.dano.dado"
                  class="second-input"
                  :options="dadoOptions"
                />
              </div>
            </div>
            <div class="input-container">
              <label>Crítico</label>
              <div>
                <p-input-number 
                  id="escudo-critico-margem-de-ameaca"
                  v-model="escudo.critico.margemDeAmeaca"
                  show-buttons
                  :min="1"
                  :max="20"
                />
                <p-input-number 
                  id="escudo-critico-multiplicador"
                  v-model="escudo.critico.multiplicador"
                  class="second-input"
                  suffix=" x"
                  show-buttons
                  :min="2"
                  :max="99"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="input-container">
              <label for="escudo-defesa">Bônus na Defesa</label>
              <div>
                <p-input-number 
                  id="escudo-defesa"
                  v-model="escudo.defesa"
                  show-buttons
                  :min="1"
                  :max="99"
                />
              </div>
            </div>
            <div class="input-container">
              <label for="escudo-penalidade">Penalidade de Armadura</label>
              <div>
                <p-input-number 
                  id="escudo-penalidade"
                  v-model="escudo.penalidade"
                  show-buttons
                  :min="-99"
                  :max="0"
                />
              </div>
            </div>
          </div>
          <div v-if="escudo.subdivisao === 'Disparo'">
            <div class="row">
              <div class="input-container">
                <label for="escudo-nome-municao">Munição</label>
                <p-input-text 
                  id="escudo-nome-municao"
                  v-model="escudo.municao.nome"
                  autocomplete="off"
                />
              </div>
              <div class="input-container">
                <label for="escudo-municao-quantidade">Quantidade</label>
                <p-input-number 
                  id="escudo-municao-quantidade"
                  v-model="escudo.municao.quantidade"
                />
              </div>
              <div class="input-container">
                <label for="escudo-municao-preco">Preço</label>
                <p-input-number 
                  id="escudo-municao-preco"
                  v-model="escudo.municao.preco"
                  prefix="T$ "
                  placeholder="-"
                  :max-fraction-digits="1"
                />
              </div>
              <div class="input-container">
                <label for="escudo-municao-peso">Peso</label>
                <p-input-number 
                  id="escudo-municao-peso"
                  v-model="escudo.municao.peso"
                  suffix=" kg"
                  placeholder="-"
                  :min-fraction-digits="1"
                  :max-fraction-digits="1"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="equipamento.categoria === 'Itens e Serviços'">
          <div class="row">
            <div class="input-container">
              <label for="itens-classificacao">Classificação</label>
              <p-dropdown 
                id="itens-classificacao"
                v-model="itens.classificacao"
                :options="classificacaoItensOptions"
                option-label="label"
                option-value="label"
                :filter="true"
              />
            </div>
            <div class="input-container">
              <label for="itens-preco">Preço</label>
              <p-input-number 
                id="itens-preco"
                v-model="itens.preco"
                prefix="T$ "
                placeholder="-"
                :max-fraction-digits="1"
              />
            </div>
            <div class="input-container">
              <label for="itens-peso">Peso</label>
              <p-input-number 
                id="itens-peso"
                v-model="itens.peso"
                suffix=" kg"
                placeholder="-"
                :min-fraction-digits="1"
                :max-fraction-digits="1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <p-button
      label="Finalizar"
      class="finish-button"
      :disabled="registerLoading"
      @click="handleRegister"
    />
  </div>
</template>

<style scoped>
.first-column {
  width: 50%;
  padding-right: 2rem;
}
.second-column {
  width: 50%;
  height: 28.75rem;
}
.name-container {
  width: 50%;
  margin-bottom: .5rem;
}
.row {
  display: flex;
  margin-bottom: .5rem;
}
.first-element {
  margin-right: 1rem;
}
.second-input {
  margin-left: .5rem;
}
.finish-button {
  display: block;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: auto;
}
</style>