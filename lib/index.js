const { collections } = require('@wmfs/cardscript-schema')
const dottie = require('dottie')

module.exports = function (cardscript) {
  const lists = {
    $simpleTitleMaps: {}
  }

  function buildLabelList (id, choices = []) {
    const map = {}
    lists[id] = choices.map(({ title, value, showWhen }) => {
      map[value] = title || value
      const res = {
        text: title || value,
        label: title || value,
        value
      }

      if (showWhen) res.disable = showWhen

      return res
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
    const { type } = element

    const collection = collections[type]

    if (collection) {
      dottie.get(element, collection).forEach(parseElement)
    } else if (type === 'Input.ApiLookup') {
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
    }
  }

  if (cardscript && cardscript.body) {
    cardscript.body.forEach(parseElement)
  }

  return lists
}
