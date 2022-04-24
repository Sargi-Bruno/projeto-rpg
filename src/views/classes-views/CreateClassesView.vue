<script setup>
import { ref } from 'vue'
import AdicionarHabilidade from '../../components/AdicionarHabilidade.vue'

const proficienciasOptions = [
  'Armas marciais',
  'Armaduras pesadas',
  'Escudos',
]
const tipoMagiaOptions = [
  {label: 'Arcana', value: 'arcana'},
  {label: 'Divina', value: 'divina'},
]
const intervaloAprendizadoOptions = [
  {label: 'cada nível', value: 0},
  {label: 'cada nível par', value: 1},
  {label: 'cada nível ímpar', value: 2},
]
const atributoChaveOptions = [
  {label: 'Inteligência', value: 'inteligencia'},
  {label: 'Sabedoria', value: 'sabedoria'},
  {label: 'Carisma', value: 'carisma'},
]
const atributosDicionario = {
  inteligencia: 'Inteligência',
  sabedoria: 'Sabedoria',
  carisma: 'Carisma',
}
const periciasOptions = [
  {label: 'Acrobacia (Des)', value: 'Acrobacia (Des)'},
  {label: 'Adestramento (Car)', value: 'Adestramento (Car)'},
  {label: 'Atletismo (For)', value: 'Atletismo (For)'},
  {label: 'Atuação (Car)', value: 'Atuação (Car)'},
  {label: 'Cavalgar (Des)', value: 'Cavalgar (Des)'},
  {label: 'Conhecimento (Int)', value: 'Conhecimento (Int)'},
  {label: 'Cura (Sab)', value: 'Cura (Sab)'},
  {label: 'Diplomacia (Car)', value: 'Diplomacia (Car)'},
  {label: 'Enganação (Car)', value: 'Enganação (Car)'},
  {label: 'Fortitude (Con)', value: 'Fortitude (Con)'},
  {label: 'Furtividade (Des)', value: 'Furtividade (Des)'},
  {label: 'Guerra (Int)', value: 'Guerra (Int)'},
  {label: 'Iniciativa (Des)', value: 'Iniciativa (Des)'},
  {label: 'Intimidação (Car)', value: 'Intimidação (Car)'},
  {label: 'Intuição (Sab)', value: 'Intuição (Sab)'},
  {label: 'Investigação (Int)', value: 'Investigação (Int)'},
  {label: 'Jogatina (Car)', value: 'Jogatina (Car)'},
  {label: 'Ladinagem (Des)', value: 'Ladinagem (Des)'},
  {label: 'Luta (For)', value: 'Luta (For)'},
  {label: 'Misticismo (Int)', value: 'Misticismo (Int)'},
  {label: 'Nobreza (Int)', value: 'Nobreza (Int)'},
  {label: 'Ofício (Int)', value: 'Ofício (Int)'},
  {label: 'Percepção (Sab)', value: 'Percepção (Sab)'},
  {label: 'Pilotagem (Des)', value: 'Pilotagem (Des)'},
  {label: 'Pontaria (Des)', value: 'Pontaria (Des)'},
  {label: 'Reflexos (Des)', value: 'Reflexos (Des)'},
  {label: 'Religião (Sab)', value: 'Religião (Sab)'},
  {label: 'Sobrevivência (Sab)', value: 'Sobrevivência (Sab)'},
  {label: 'Vontade (Sab)', value: 'Vontade (Sab)'},
]

const pericias = ref({
  fixa: [],
  escolha1: '',
  escolha2: '',
  quantidade: 0,
  opcoes: [],
})
const classe = ref({
  nome: '',
  descricao: '',
  pvIniciais: 0,
  pvPorNivel: 0,
  pm: 0,
  pericias: {
    concedidas: [],
    quantidade: 0,
    opcoes: [],
  },
  proficiencias: [],
  tabelaDeEvolucao: [],
  habilidades: [],
  poderes: [],
})
const magiasCaminhoSwitch = ref(false)
const magiasCaminhoNome = ref('')
const magias = ref({
  escolherEscolas: false,
  tipoMagia: 'arcana',
  quantidadeInicial: null,
  intervaloAprendizado: 0, // A cada nível, A cada nível par, a cada nível ímpar
  atributoChave: 'inteligencia',
  nivelCirculo2: null,
  nivelCirculo3: null,
  nivelCirculo4: null,
  nivelCirculo5: null,
  penalidadeArmaduraLeve: false,
})
const magiasAdicionadas = ref([])

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
    magiasAdicionadas.value.push({
      ...magias.value,
      caminhoNome: magiasCaminhoNome.value
    })
  } else {
    magiasAdicionadas.value = []
    magiasAdicionadas.value.push({...magias.value})
  }
}

const removerMagias = (index) => {
  magiasAdicionadas.value.splice(index, 1)
}
</script>

<template>
  <h1>Criar Classe</h1>
  <div>
    <label for="nome-classe">Nome</label>
    <p-input-text 
      id="nome-classe"
      v-model="classe.nome"
    />
    <label>Descrição</label>
    <!-- editorStyle="height: 320px" -->
    <p-editor v-model="classe.descricao">
      <template #toolbar>
        <span class="ql-formats">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-link"></button>
          <button class="ql-clean"></button>
        </span>
      </template>
    </p-editor>
  </div>
  <div>
    <h2>Características de Classe</h2>
    <label for="pvIniciais">Pontos de Vida Iniciais</label>
    <p-input-number 
      id="pvIniciais"
      v-model="classe.pvIniciais"
      :min="0"
      :max="99"
    />
    <label for="pvPorNivel">Pontos de Vida Por Nível</label>
    <p-input-number 
      id="pvPorNivel"
      v-model="classe.pvPorNivel"
      :min="0"
      :max="99"
    />
    <label for="pm">Pontos de Mana</label>
    <p-input-number 
      id="pm"
      v-model="classe.pm"
      :min="0"
      :max="99"
    />
    <h3>Perícias</h3>
    <label for="pericias-concedidas">Concedidas</label>
    <p-multi-select
      id="pericias-concedidas"
      v-model="pericias.fixa"
      :options="periciasOptions"
      optionLabel="label"
      optionValue="value"
      :filter="true"
    />
    <label for="pericias-escolha1">Escolhas</label>
    <p-dropdown
      id="pericias-escolha1"
      v-model="pericias.escolha1"
      :options="periciasOptions"
      optionLabel="label"
      optionValue="value"
      :filter="true"
    />
    <label for="pericias-escolha2">ou</label>
    <p-dropdown
      id="pericias-escolha2"
      v-model="pericias.escolha2"
      :options="periciasOptions"
      optionLabel="label"
      optionValue="value"
      :filter="true"
    />
    <label for="pericias-quantidade">Quantidade que pode escolher</label>
    <p-input-number 
      id="pericias-quantidade"
      v-model="pericias.quantidade"
      :min="0"
      :max="99"
    />
    <label for="pericias-opcoes">Opções</label>
    <p-multi-select
      id="pericias-opcoes"
      v-model="pericias.opcoes"
      :options="periciasOptions"
      optionLabel="label"
      optionValue="value"
      :filter="true"
    />
    <label for="proficiencias">Proficiências</label>
    <p-multi-select
      id="proficiencias"
      placeholder="Nenhuma"
      v-model="classe.proficiencias"
      :options="proficienciasOptions"
    />
    <h3>Tabela</h3>
    <p>Nível - Habilidade de Classe</p>
    <div v-for="index in 20" :key="index">
      <label :for="index + '-nivel'">{{index}}º</label>
      <p-input-text 
        :id="index + '-nivel'"
        v-model="classe.tabelaDeEvolucao[index-1]"
      />
    </div>
  </div>
  <div>
    <h2>Habilidades de Classe</h2>
    <div v-for="(habilidade, index) in classe.habilidades" :key="index">
      <h3>{{habilidade.nome}}</h3>
      <div v-html="habilidade.descricao"></div>
      <p-button 
        label="Remover"
        @click="removerHabilidade(index)"
      />
    </div>
    <AdicionarHabilidade 
      classe
      @adicionarHabilidade="adicionarHabilidade"
    />
  </div>
  <div>
    <h2 v-if="classe.nome.length > 0">Poder de {{classe.nome}}</h2>
    <h2 v-else>Poder de...</h2>
    <div v-for="(poder, index) in classe.poderes" :key="index">
      <h3>{{poder.nome}}</h3>
      <div v-html="poder.descricao"></div>
      <p-button 
        label="Remover"
        @click="removerPoder(index)"
      />
    </div>
    <AdicionarHabilidade
      poder
      @adicionarHabilidade="adicionarPoder"
    />
  </div>
  <div>
    <div v-for="(magias, index) in magiasAdicionadas" :key="index">
      <h2>Magias</h2>
      <h3 v-if="magias.caminhoNome">
        Caminho do {{magias.caminhoNome}}
      </h3>
      <p v-if="magias.escolherEscolas">
        Escolhe três escolas de magia. Uma vez feita, essa escolha
        não pode ser mudada.
      </p>
      <p>Pode lançar magias do tipo {{magias.tipoMagia}}.</p>
      <p v-if="magias.nivelCirculo2">
        Pode lançar magias do 2º círculo no nível {{magias.nivelCirculo2}}.
      </p>
      <p v-if="magias.nivelCirculo3">
        Pode lançar magias do 3º círculo no nível {{magias.nivelCirculo3}}.
      </p>
      <p v-if="magias.nivelCirculo4">
        Pode lançar magias do 4º círculo no nível {{magias.nivelCirculo4}}.
      </p>
      <p v-if="magias.nivelCirculo5">
        Pode lançar magias do 5º círculo no nível {{magias.nivelCirculo5}}.
      </p>
      <p>
        Você começa com {{magias.quantidadeInicial}} magias de 1º círculo<span v-if="magias.escolherEscolas"> que pertençam a essas escolas</span>.
      </p>
      <p>
        A {{intervaloAprendizadoOptions[magias.intervaloAprendizado].label}},
        aprende uma magia de qualquer cículo<span v-if="magias.escolherEscolas"> e escola</span> que possa lançar.
      </p>
      <p v-if="magias.penalidadeArmaduraLeve">
        Você pode lançar essas magias vestindo armaduras leves sem precisar
        de testes de Misticismo
      </p>
      <p>
        Seu atributo-chave para lançar magias é {{atributosDicionario[magias.atributoChave]}}
        e você soma seu bônus de {{atributosDicionario[magias.atributoChave]}} no seu
        total de PM.
      </p>
      <p-button 
        label="Remover Magias"
        @click="removerMagias(index)"
      />
    </div>
    

    <h3>Adicionar Habilidade Magias</h3>
    <label for="escolas-de-magia-switch">Possui diferentes caminhos?</label>
    <p-input-switch 
      id="escolas-de-magia-switch"
      v-model="magiasCaminhoSwitch"
    />
    <label for="caminho-nome">Nome do caminho</label>
    <p-input-text 
      id="caminho-nome"
      v-model="magiasCaminhoNome"
      :disabled="!magiasCaminhoSwitch"
    />
    <label for="escolas-de-magia-switch">Escolher escolas de magia?</label>
    <p-input-switch 
      id="escolas-de-magia-switch"
      v-model="magias.escolherEscolas"
    />
    <label for="tipo-magia">Tipo de magia aprendida</label>
    <p-dropdown
      id="tipo-magia"
      v-model="magias.tipoMagia"
      :options="tipoMagiaOptions"
      optionLabel="label"
      optionValue="value"
    />
    <form autocomplete="off">
      <label for="quantidade-magias">Quantidade de Magias Iniciais</label>
      <p-input-number 
        id="quantidade-magias"
        v-model="magias.quantidadeInicial"
      />
    </form>
    <label for="intervalo-aprendizado">Aprende magias a</label>
    <p-dropdown
      id="intervalo-aprendizado"
      v-model="magias.intervaloAprendizado"
      :options="intervaloAprendizadoOptions"
      optionLabel="label"
      optionValue="value"
    />
    <label for="atributo-chave">Atributo-Chave</label>
    <p-dropdown
      id="atributo-chave"
      v-model="magias.atributoChave"
      :options="atributoChaveOptions"
      optionLabel="label"
      optionValue="value"
    />
    <h4>Nível que aprende novos círculos de magia</h4>
    <form autocomplete="off">
      <label for="circulo-2">2º círculo</label>
      <p-input-number 
        id="circulo-2"
        v-model="magias.nivelCirculo2"
      />
      <label for="circulo-3">3º círculo</label>
      <p-input-number 
        id="circulo-3"
        v-model="magias.nivelCirculo3"
      />
      <label for="circulo-4">4º círculo</label>
      <p-input-number 
        id="circulo-4"
        v-model="magias.nivelCirculo4"
      />
      <label for="circulo-5">5º círculo</label>
      <p-input-number 
        id="circulo-5"
        v-model="magias.nivelCirculo5"
      />
    </form>
    <label for="armadura-leve-switch">Pode utilizar armadura leve sem penalidade?</label>
    <p-input-switch 
      id="armadura-leve-switch"
      v-model="magias.penalidadeArmaduraLeve"
      :disabled="magias.tipoMagia === 'divina'"
    />
    <p-button 
      label="Adicionar Magias"
      @click="adicionarMagias"
    />
  </div>
  <!-- <div>
    <p-button 
      label="Finalizar Criação"
      @click=""
    />
  </div> -->
</template>