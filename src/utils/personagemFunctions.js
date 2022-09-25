const initialItems = {
  mochila: 'xipCwn5yqxVJOv1eRJDb',
  sacoDeDormir: 'Un8lqS5nSNmldHUSTu0L',
  trajeDeViajante: 'CTS0D3dD2ZlYzn5nOata'
}

export const addItem = (item, personagem, quantidade = 1) => {
  if(personagem.inventario.find(x => x.id === item.id)) {
    const index = personagem.inventario.findIndex(x => x.id === item.id)
    personagem.inventario[index].quantidade += parseInt(quantidade)
  } else {
    item.quantidade = quantidade
    personagem.inventario.push({...item})
  }
}

export const updateItemQuantity = (id, personagem, quantidade) => {
  const index = personagem.inventario.findIndex(x => x.id === id)
  personagem.inventario[index].quantidade = quantidade
}

export const removeItem = (id, personagem) => {
  const index = personagem.inventario.findIndex(x => x.id === id)
  personagem.inventario.splice(index, 1)
}

export const addInitialItemsToInventory = (personagem, equipamentos) => {
  const mochila = equipamentos.find(item => item.id === initialItems.mochila)
  const sacoDeDormir = equipamentos.find(item => item.id === initialItems.sacoDeDormir)
  const trajeDeViajante = equipamentos.find(item => item.id === initialItems.trajeDeViajante)

  addItem(mochila, personagem)
  addItem(sacoDeDormir, personagem)
  addItem(trajeDeViajante, personagem)
}