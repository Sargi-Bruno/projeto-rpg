export const atributosDicionario = {
  forca: 'Força',
  destreza: 'Destreza',
  constituicao: 'Constituição',
  inteligencia: 'Inteligência',
  sabedoria: 'Sabedoria',
  carisma: 'Carisma'
}

export const renderDescricao = (descricao) => {
  descricao = descricao.replace('<p>', '')
  descricao = descricao.replace('</p>', '')

  if(descricao.length > 130) {
    descricao = descricao.substr(0, 130)
    descricao = descricao.substr(0, Math.min(descricao.length, descricao.lastIndexOf(" ")))

    if(descricao[descricao.length - 1] === ',') {
      descricao = descricao.slice(0, -1)
    }
  
    descricao += '...'
  }

  return descricao
}

export const renderDescricaoCompleta = (descricao) => {
  descricao = descricao.replace('<p>', '')
  descricao = descricao.replace('</p>', '')

  return descricao
}

export const sortAtributos = (atributos) => {
  let stringReturn = ''
  let atributosOrdem = []

  for(let atributo in atributos) {
    if(atributos[atributo] !== 0) atributosOrdem.push([atributo, atributos[atributo]])
  }

  atributosOrdem.sort((a, b) => {
    return b[1] - a[1]
  })

  atributosOrdem.forEach((atributo, index) => {
    if(index === atributosOrdem.length - 1) {
      if(Math.sign(atributo[1]) === 1) {
        stringReturn += `${atributosDicionario[atributo[0]]} +${atributo[1]}`
      } else {
        stringReturn += `${atributosDicionario[atributo[0]]} ${atributo[1]}`
      }
    } else {
      if(Math.sign(atributo[1]) === 1) {
        stringReturn += `${atributosDicionario[atributo[0]]} +${atributo[1]}, `
      } else {
        stringReturn += `${atributosDicionario[atributo[0]]} ${atributo[1]}, `
      }
    }
  })

  return stringReturn
}

export const sortAtributosDinamico = (atributos, variantes) => {
  let stringReturn = ''

  variantes.forEach((variante, index) => {
    let atributosOrdem = sortAtributos(atributos[index])
    if(index === variantes.length - 1) {
      stringReturn += `${atributosOrdem} (${variante}).`
    } else {
      stringReturn += `${atributosOrdem} (${variante}); `
    }
  })

  return stringReturn
}

export const renderHabilidades = (habilidades) => {
  let stringReturn = ''
  
  habilidades.sort((a, b) => a.nome.localeCompare(b.nome))

  habilidades.forEach((habilidade, index) => {
    if(index === habilidades.length - 1) {
      stringReturn += `${habilidade.nome}.`
    } else {
      stringReturn += `${habilidade.nome}, `
    }
  })

  return stringReturn
}

export const renderArray = (array) => {
  let stringReturn = ''

  array.sort((a, b) => a.localeCompare(b))

  array.forEach((item, index) => {
    if(index === array.length -1) {
      stringReturn += `${item}`
    } else {
      stringReturn += `${item}, `
    }
  })

  return stringReturn
}

export const getModifier = (abilityScore) => {
  const modifier = Math.floor((abilityScore - 10) / 2)

  if(Math.sign(modifier) === 1) return '+' + modifier

  if(isNaN(Math.sign(modifier))) return '-'

  return modifier
}

export const getRacaAtributos = (raca) => {
  if(raca.tipoAtributos === 'fixo') {
    return raca.atributos
  }

  if(raca.tipoAtributos === 'dinamico') {
    const atributos = {
      forca: 0,
      destreza: 0,
      constituicao: 0,
      inteligencia: 0,
      sabedoria: 0,
      carisma: 0
    }

    raca.atributosDinamicoEscolhidos.forEach(atributo => {
      atributos[atributo] = 2
    })

    if(raca.excecaoAtributo) {
      atributos[raca.excecaoAtributo.toLowerCase()] = -2
    }

    return atributos
  }

  if(raca.tipoAtributos === 'variante') {
    const index = raca.variantes.findIndex((value) => value === raca.varianteEscolhida)

    return raca.atributos[index]
  }
}