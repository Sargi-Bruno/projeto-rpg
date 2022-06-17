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
  descricao = descricao.substr(0, 130)
  descricao = descricao.substr(0, Math.min(descricao.length, descricao.lastIndexOf(" ")))

  if(descricao[descricao.length - 1] === ',') {
    descricao = descricao.slice(0, -1)
  }

  descricao += '...'
  
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