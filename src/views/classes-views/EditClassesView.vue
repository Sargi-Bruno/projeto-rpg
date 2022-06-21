<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { _getDoc, _updateDoc, _deleteDoc } from '../../firebase/firestore'
import AdicionarHabilidade from '../../components/AdicionarHabilidade.vue'

const route = useRoute()
const router = useRouter()
const editLoading = ref(false)
const deleteLoading = ref(false)
const classe = ref()

const proficienciasOptions = [
  'Armas marciais',
  'Armaduras pesadas',
  'Escudos',
]
const tipoMagiaOptions = [
  'Arcana',
  'Divina',
]
const tipoMagiaDicionario = {
  Arcana: 'arcanas',
  Divina: 'divinas',
}
const intervaloAprendizadoOptions = [
  {label: 'cada nível', value: 0},
  {label: 'cada nível par', value: 1},
  {label: 'cada nível ímpar', value: 2},
]
const atributoChaveOptions = [
  'Inteligência',
  'Sabedoria',
  'Carisma',
]
const periciasOptions = [
  {label: 'Acrobacia (Des)'},
  {label: 'Adestramento (Car)'},
  {label: 'Atletismo (For)'},
  {label: 'Atuação (Car)'},
  {label: 'Cavalgar (Des)'},
  {label: 'Conhecimento (Int)'},
  {label: 'Cura (Sab)'},
  {label: 'Diplomacia (Car)'},
  {label: 'Enganação (Car)'},
  {label: 'Fortitude (Con)'},
  {label: 'Furtividade (Des)'},
  {label: 'Guerra (Int)'},
  {label: 'Iniciativa (Des)'},
  {label: 'Intimidação (Car)'},
  {label: 'Intuição (Sab)'},
  {label: 'Investigação (Int)'},
  {label: 'Jogatina (Car)'},
  {label: 'Ladinagem (Des)'},
  {label: 'Luta (For)'},
  {label: 'Misticismo (Int)'},
  {label: 'Nobreza (Int)'},
  {label: 'Ofício (Int)'},
  {label: 'Percepção (Sab)'},
  {label: 'Pilotagem (Des)'},
  {label: 'Pontaria (Des)'},
  {label: 'Reflexos (Des)'},
  {label: 'Religião (Sab)'},
  {label: 'Sobrevivência (Sab)'},
  {label: 'Vontade (Sab)'},
]
const periciasDropdownOptions = [
  {label: 'Nenhuma'},
  ...periciasOptions
]
const pericias = ref({
  concedidas: [],
  escolha1: '',
  escolha2: '',
  quantidade: 0,
  opcoes: [],
})
const magiasCaminhoSwitch = ref(false)
const magiasCaminhoNome = ref('')
const magias = ref({
  escolherEscolas: false,
  tipoMagia: 'Arcana',
  quantidadeInicial: null,
  intervaloAprendizado: 0, // A cada nível, A cada nível par, a cada nível ímpar
  atributoChave: 'Inteligência',
  nivelCirculo2: null,
  nivelCirculo3: null,
  nivelCirculo4: null,
  nivelCirculo5: null,
  penalidadeArmaduraLeve: false,
})
const magiasAdicionadasRef = ref([])

onMounted(async () => {
  classe.value = await _getDoc('classes', route.params.id)

  pericias.value = classe.value.pericias

  if(classe.value.magias.length > 0) magiasAdicionadasRef.value = classe.value.magias
})

const adicionarHabilidade = (habilidade) => {
  classe.value.habilidades.push({
    nome: habilidade.nome,
    nivelConcedido: habilidade.nivelConcedido,
    habilidadeMagica: habilidade.habilidadeMagica,
    descricao: habilidade.descricao
  })
}

const removerHabilidade = (index) => {
  classe.value.habilidades.splice(index, 1)
}

const adicionarPoder = (poder) => {
  classe.value.poderes.push({
    nome: poder.nome,
    habilidadeMagica: poder.habilidadeMagica,
    descricao: poder.descricao
  })
}

const removerPoder = (index) => {
  classe.value.poderes.splice(index, 1)
}

const adicionarMagias = () => {
  if(magiasCaminhoSwitch.value) {
    magiasAdicionadasRef.value.push({
      ...magias.value,
      caminhoNome: magiasCaminhoNome.value
    })
  } else {
    magiasAdicionadasRef.value = []
    magiasAdicionadasRef.value.push({...magias.value})
  }
}

const removerMagias = (index) => {
  magiasAdicionadasRef.value.splice(index, 1)
}

const handleEdit = () => {
  editLoading.value = true

  classe.value.pericias = pericias.value

  if(magiasAdicionadasRef.value.length > 0) classe.value.magias = magiasAdicionadasRef.value

  _updateDoc(classe.value)
  router.push({ name: 'listar-classes' })
}

const handleDelete = () => {
  deleteLoading.value = true
  _deleteDoc(classe.value)
  router.push({ name: 'listar-classes' })
}
</script>

<template>
  <div
    v-if="classe"
    class="content"
  >
    <h1>Editar Classe</h1>
    <div>
      <div class="input-container name-container">
        <label for="nome-classe">Nome</label>
        <p-input-text 
          id="nome-classe"
          v-model="classe.nome"
          autocomplete="off"
        />
      </div>
      <label>Descrição</label>
      <p-editor 
        v-model="classe.descricao" 
        editor-style="height: 10rem"
      />
    </div>
    <div class="navigation-container">
      <!-- Navegação -->
      <p-tab-view>
        <!-- Características -->
        <p-tab-panel header="Características">
          <div>
            <div class="row">
              <div class="input-container">
                <label for="pvIniciais">Pontos de Vida Iniciais</label>
                <p-input-number 
                  id="pvIniciais"
                  v-model="classe.pvIniciais"
                  :min="0"
                  :max="99"
                />
              </div>
              <div class="input-container">
                <label for="pvPorNivel">Pontos de Vida Por Nível</label>
                <p-input-number 
                  id="pvPorNivel"
                  v-model="classe.pvPorNivel"
                  :min="0"
                  :max="99"
                />
              </div>
              <div class="input-container">
                <label for="pm">Pontos de Mana</label>
                <p-input-number 
                  id="pm"
                  v-model="classe.pm"
                  :min="0"
                  :max="99"
                />
              </div>
            </div>
            <div class="row">
              <div class="input-container">
                <label for="pericias-concedidas">Perícias Concedidas</label>
                <p-multi-select
                  id="pericias-concedidas"
                  v-model="pericias.concedidas"
                  :options="periciasOptions"
                  option-label="label"
                  option-value="label"
                  :filter="true"
                  :max-selected-labels="2"
                  selected-items-label="{0} perícias selecionadas"
                />
              </div>
              <div class="input-container">
                <label for="pericias-escolha1">Perícias Concedidas Opcionais (Se houver)</label>
                <div>
                  <p-dropdown
                    id="pericias-escolha1"
                    v-model="pericias.escolha1"
                    :options="periciasDropdownOptions"
                    class="pericias-input"
                    option-label="label"
                    option-value="label"
                    :filter="true"
                  />
                  <label 
                    for="pericias-escolha2"
                    class="pericias-input"
                  >
                    ou
                  </label>
                  <p-dropdown
                    id="pericias-escolha2"
                    v-model="pericias.escolha2"
                    :options="periciasDropdownOptions"
                    class="pericias-input"
                    option-label="label"
                    option-value="label"
                    :filter="true"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="input-container">
                <label for="pericias-quantidade">Quantidade a escolher</label>
                <p-input-number 
                  id="pericias-quantidade"
                  v-model="pericias.quantidade"
                  :min="0"
                  :max="99"
                />
              </div>
              <div class="input-container">
                <label for="pericias-opcoes">Opções para escolher</label>
                <p-multi-select
                  id="pericias-opcoes"
                  v-model="pericias.opcoes"
                  :options="periciasOptions"
                  option-label="label"
                  option-value="label"
                  :filter="true"
                  :max-selected-labels="2"
                  selected-items-label="{0} perícias selecionadas"
                />
              </div>
              <div class="input-container">
                <label for="proficiencias">Proficiências</label>
                <p-multi-select
                  id="proficiencias"
                  v-model="classe.proficiencias"
                  placeholder="Nenhuma"
                  :options="proficienciasOptions"
                  :max-selected-labels="1"
                  selected-items-label="{0} proficiências selecionadas"
                />
              </div>
            </div>
          </div>
        </p-tab-panel>
        <!-- Tabela -->
        <p-tab-panel header="Tabela de Evolução">
          <div class="flex">
            <div>
              <table class="table">
                <tr>
                  <th>Nível</th>
                  <th>Habilidades de Classe</th>
                </tr>
                <tr
                  v-for="index in 10"
                  :key="index"
                >
                  <td>{{ index }}º</td>
                  <td>
                    <p-input-text 
                      :id="index + '-nivel'"
                      v-model="classe.tabelaDeEvolucao[index-1]"
                      autocomplete="off"
                    />
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="table">
                <tr>
                  <th>Nível</th>
                  <th>Habilidades de Classe</th>
                </tr>
                <tr
                  v-for="index in 10"
                  :key="+index+10"
                >
                  <td>{{ +index+10 }}º</td>
                  <td>
                    <p-input-text 
                      :id="+index+10 + '-nivel'"
                      v-model="classe.tabelaDeEvolucao[+index+9]"
                      autocomplete="off"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </p-tab-panel>
        <!-- Habilidades -->
        <p-tab-panel header="Habilidades">
          <div class="flex">
            <div class="adicionar-habilidade-container">
              <AdicionarHabilidade 
                classe
                no-title
                @adicionar-habilidade="adicionarHabilidade"
              />
            </div>
            <div class="habilidades-adicionadas-container">
              <div class="habilidades-adicionadas-content">
                <div
                  v-for="(habilidade, index) in classe.habilidades"
                  :key="index"
                  class="habilidade-card"
                >
                  <h4>{{ habilidade.nome }}</h4>
                  <p-button 
                    label="Remover"
                    @click="removerHabilidade(index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </p-tab-panel>
        <!-- Poderes -->
        <p-tab-panel header="Poderes">
          <div class="flex">
            <div class="adicionar-habilidade-container">
              <AdicionarHabilidade 
                poder
                no-title
                @adicionar-habilidade="adicionarPoder"
              />
            </div>
            <div class="habilidades-adicionadas-container">
              <div class="habilidades-adicionadas-content">
                <div
                  v-for="(poder, index) in classe.poderes"
                  :key="index"
                  class="habilidade-card"
                >
                  <h4>{{ poder.nome }}</h4>
                  <p-button 
                    label="Remover"
                    @click="removerPoder(index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </p-tab-panel>
        <!-- Magias -->
        <p-tab-panel header="Magias">
          <div class="flex">
            <div class="adicionar-magia-container">
              <div class="row">
                <div class="input-switch-container">
                  <label for="escolas-de-magia-switch">Possui diferentes caminhos?</label>
                  <p-input-switch 
                    id="escolas-de-magia-switch"
                    v-model="magiasCaminhoSwitch"
                  />
                </div>
                <div class="input-container">
                  <label for="caminho-nome">Nome do caminho</label>
                  <p-input-text 
                    id="caminho-nome"
                    v-model="magiasCaminhoNome"
                    :disabled="!magiasCaminhoSwitch"
                  />
                </div>
              </div>
              <div class="row">
                <div class="input-container">
                  <label for="tipo-magia">Magia aprendida</label>
                  <p-dropdown
                    id="tipo-magia"
                    v-model="magias.tipoMagia"
                    :options="tipoMagiaOptions"
                  />
                </div>
                <div class="input-container">
                  <label for="quantidade-magias">Quantidade Inicial</label>
                  <p-input-number 
                    id="quantidade-magias"
                    v-model="magias.quantidadeInicial"
                    autocomplete="off"
                  />
                </div>
                <div class="input-container">
                  <label for="intervalo-aprendizado">Aprende magias a</label>
                  <p-dropdown
                    id="intervalo-aprendizado"
                    v-model="magias.intervaloAprendizado"
                    :options="intervaloAprendizadoOptions"
                    option-label="label"
                    option-value="value"
                  />
                </div>
                <div class="input-container">
                  <label for="atributo-chave">Atributo-Chave</label>
                  <p-dropdown
                    id="atributo-chave"
                    v-model="magias.atributoChave"
                    :options="atributoChaveOptions"
                  />
                </div>
              </div>
              <h4 class="magias-nivel-h4">
                Nível que aprende novos círculos de magia
              </h4>
              <div class="row">
                <div class="input-container">
                  <label for="circulo-2">2º círculo</label>
                  <p-input-number 
                    id="circulo-2"
                    v-model="magias.nivelCirculo2"
                    autocomplete="off"
                  />
                </div>
                <div class="input-container">
                  <label for="circulo-3">3º círculo</label>
                  <p-input-number 
                    id="circulo-3"
                    v-model="magias.nivelCirculo3"
                    autocomplete="off"
                  />
                </div>
                <div class="input-container">
                  <label for="circulo-4">4º círculo</label>
                  <p-input-number 
                    id="circulo-4"
                    v-model="magias.nivelCirculo4"
                    autocomplete="off"
                  />
                </div>
                <div class="input-container">
                  <label for="circulo-5">5º círculo</label>
                  <p-input-number 
                    id="circulo-5"
                    v-model="magias.nivelCirculo5"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="row">
                <div class="input-switch-container">
                  <label for="escolas-de-magia-switch">Escolher escolas de magia?</label>
                  <p-input-switch 
                    id="escolas-de-magia-switch"
                    v-model="magias.escolherEscolas"
                  />
                </div>
              </div>
              <div class="row">
                <div class="input-switch-container">
                  <label for="armadura-leve-switch">Pode utilizar armadura leve sem penalidade?</label>
                  <p-input-switch 
                    id="armadura-leve-switch"
                    v-model="magias.penalidadeArmaduraLeve"
                    :disabled="magias.tipoMagia === 'divina'"
                  />
                </div>
              </div>
              <p-button 
                label="Adicionar"
                class="add-magia-button"
                @click="adicionarMagias"
              />
            </div>
            <div class="magia-adicionadas-container">
              <div class="magia-adicionadas-content">
                <div
                  v-for="(magiasAdicionadas, index) in magiasAdicionadasRef"
                  :key="index"
                  class="magia-card"
                >
                  <h3 v-if="magiasAdicionadas.caminhoNome">
                    Caminho do {{ magiasAdicionadas.caminhoNome }}
                  </h3>
                  <p v-if="magiasAdicionadas.escolherEscolas">
                    Escolhe três escolas de magia. Uma vez feita, essa escolha não pode ser mudada.
                  </p>
                  <p>Você pode lançar magias <b>{{ tipoMagiaDicionario[magiasAdicionadas.tipoMagia] }}</b> de 1º círculo.</p>
                  <p v-if="magiasAdicionadas.nivelCirculo2">
                    Pode lançar magias do 2º círculo no <b>{{ magiasAdicionadas.nivelCirculo2 }}º nível</b>.
                  </p>
                  <p v-if="magiasAdicionadas.nivelCirculo3">
                    Pode lançar magias do 3º círculo no <b>{{ magiasAdicionadas.nivelCirculo3 }}º nível</b>.
                  </p>
                  <p v-if="magiasAdicionadas.nivelCirculo4">
                    Pode lançar magias do 4º círculo no  <b>{{ magiasAdicionadas.nivelCirculo4 }}º nível</b>.
                  </p>
                  <p v-if="magiasAdicionadas.nivelCirculo5">
                    Pode lançar magias do 5º círculo no <b>{{ magiasAdicionadas.nivelCirculo5 }}º nível</b>.
                  </p>
                  <p>
                    Você começa com <b>{{ magiasAdicionadas.quantidadeInicial }}</b> magias de 1º círculo<span v-if="magiasAdicionadas.escolherEscolas"> que pertençam a essas escolas</span>.
                  </p>
                  <p>
                    A <b>{{ intervaloAprendizadoOptions[magiasAdicionadas.intervaloAprendizado].label }}</b>,
                    aprende uma magia de qualquer cículo<span v-if="magiasAdicionadas.escolherEscolas"> e escola</span> que possa lançar.
                  </p>
                  <p v-if="magiasAdicionadas.penalidadeArmaduraLeve">
                    Você pode lançar essas magias vestindo armaduras leves sem precisar de testes de Misticismo.
                  </p>
                  <p>
                    Seu atributo-chave para lançar magias é <b>{{ magiasAdicionadas.atributoChave }}</b>
                    e você soma seu bônus de <b>{{ magiasAdicionadas.atributoChave }}</b> no seu
                    total de PM.
                  </p>
                  <p-button 
                    label="Remover"
                    @click="removerMagias(index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </p-tab-panel>
      </p-tab-view>
    </div>
    <div class="footer">
      <p-button
        label="Deletar"
        class="p-button-text p-button-danger"
        :disabled="deleteLoading"
        @click="handleDelete"
      />
      <p-button
        label="Cancelar"
        class="p-button-outlined"
        @click="router.push({ name: 'listar-classes' })"
      />
      <p-button
        label="Editar"
        class="p-button-success"
        :disabled="editLoading"
        @click="handleEdit"
      />
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  margin-bottom: .5rem;
}
.name-container {
  margin-bottom: .5rem;
  width: 25%;
}
.navigation-container {
  margin-top: 1rem;
  height: 34rem;
}
.pericias-input {
  margin-right: .5rem;
}
.table:first-of-type {
  margin-right: 1rem;
}
.table tr th:first-of-type {
  width: 4rem;
  text-align: center;
  padding-right: 1rem;
}
.table tr td:first-of-type {
  text-align: center;
  padding-right: 1rem;
}
.table tr th:not(:first-of-type) {
  text-align: left;
  width: 40rem;
}
.table tr input {
  width: 100%;
}
.adicionar-habilidade-container {
  width: 45%;
  padding-right: 1rem;
}
.habilidades-adicionadas-container {
  width: 55%;
}
.habilidade-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--tormenta-background);
}
.habilidades-adicionadas-content {
  margin-top: 1rem;
  height: 22rem;
  overflow: auto;
}
.magias-nivel-h4 {
  margin: 0;
}
.add-magia-button {
  display: block;
  margin-top: 1rem;
  margin-left: auto;
}
.adicionar-magia-container {
  width: 51%;
  padding-right: 1rem;
}
.magia-adicionadas-container {
  width: 49%;
}
.magia-card {
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--tormenta-background);
}
.magia-card p {
  margin: 0;
}
.magia-card h3 {
  margin: 0;
}
.magia-card button {
  display: block;
  margin-top: 1rem;
  margin-left: auto;
}
.magia-adicionadas-content {
  margin-top: 1rem;
  height: 22rem;
  overflow: auto;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  margin-bottom: 2rem;
}
.footer button {
  margin-left: 1rem;
}
</style>