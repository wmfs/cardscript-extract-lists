module.exports = function (cardscript) {
  const lists = {
    $simpleTitleMaps: {}
  }

  function buildLabelList (id, choices) {
    const map = {}
    lists[id] = choices.map(({ title, value }) => {
      map[value] = title || value
      return {
        text: title || value,
        label: title || value,
        value
      }
    })
    lists.$simpleTitleMaps[id] = map
  }

  function buildTitleMap (id, choices) {
    const map = {}
    choices.forEach(({ title, value }) => {
      map[value] = title || value
    })
    lists.$simpleTitleMaps[id] = map
  }

  function parseElement (element) {
    switch (element.type) {
      case 'Container':
        element.items.forEach(parseElement)
        break
      case 'Collapsible':
        element.card.body.forEach(parseElement)
        break
      case 'ColumnSet':
        element.columns.forEach(parseElement)
        break
      case 'CardList':
        element.card.body.forEach(parseElement)
        break
      case 'Column':
        element.items.forEach(parseElement)
        break
      case 'Input.ApiLookup':
        if (element.parametersCard) element.parametersCard.body.forEach(parseElement)
        if (element.resultsCard) element.resultsCard.body.forEach(parseElement)
        break
      case 'Input.ChoiceSet':
        if (element.choices) {
          buildLabelList(element.id, element.choices)
        }

        if (element.filter) {
          const origId = `${element.id}Orig`
          const filteredId = `${element.id}Filt`

          buildLabelList(origId, element.choices)
          buildLabelList(filteredId, element.choicesg)
        }
        break
      case 'TabSet':
        element.tabs.forEach(parseElement)
        break
      case 'Tab':
        element.items.forEach(parseElement)
        break
      case 'FactSet':
        for (const fact of element.facts) {
          if (fact.choices) {
            buildTitleMap(fact.title, fact.choices, true)
          }
        }
        break
    }
  }

  if (cardscript && cardscript.body) {
    cardscript.body.forEach(parseElement)
  }

  return lists
}
