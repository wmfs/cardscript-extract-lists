const { collections } = require('@wmfs/cardscript-schema')
const dottie = require('dottie')

module.exports = function (cardscript) {
  const lists = {
    $simpleTitleMaps: {}
  }

  function buildLabelList (id, choices = []) {
    const map = {}
    lists[id] = choices.map(({ title, value, showWhen, tooltip, color }) => {
      map[value] = title || value
      const choice = {
        text: title || value,
        label: title || value,
        value
      }

      if (showWhen) {
        choice.disable = showWhen
      }

      if (tooltip) {
        choice.tooltip = tooltip
      }

      if (color) {
        choice.color = color
      }

      return choice
    })
    lists.$simpleTitleMaps[id] = map
  }

  function buildTitleMap (id, choices) {
    const map = {}
    choices.forEach(({ title, value }) => {
      map[value] = title || value
    })
    if (lists.$simpleTitleMaps[id]) {
      console.warn(`cardscript-extract-lists Applying title map over existing ID: '${id}'`)
    }
    lists.$simpleTitleMaps[id] = map
  }

  function parseElement (element) {
    const { type } = element

    const collection = collections[type]

    if (type === 'Input.ApiLookup') {
      if (element.parametersCard) element.parametersCard.body.forEach(parseElement)
      if (element.resultsCard) element.resultsCard.body.forEach(parseElement)
    } else if (type === 'Input.ChoiceSet') {
      if (element.choices) {
        buildLabelList(element.id, element.choices)
      }

      if (element.filter) {
        const origId = `${element.id}Orig`
        const filteredId = `${element.id}Filt`

        buildLabelList(origId, element.choices)
        buildLabelList(filteredId, element.choices)
      }
    } else if (type === 'FactSet') {
      if (Array.isArray(element.facts)) {
        for (const fact of element.facts) {
          if (fact.choices) {
            buildTitleMap(fact.title, fact.choices, true)
          }
        }
      }
    } else if (type === 'Table' || type === 'MarkupTable') {
      if (Array.isArray(element.columns)) {
        for (const column of element.columns) {
          if (column.choices) {
            buildTitleMap(column.title || element.title, column.choices, true)
          }
        }
      }
    } else if (collection) {
      dottie.get(element, collection).forEach(parseElement)
    }
  }

  if (cardscript && cardscript.body) {
    cardscript.body.forEach(parseElement)
  }

  return lists
}
