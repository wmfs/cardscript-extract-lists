/* eslint-env mocha */

'use strict'
const extractLists = require('./../lib/')
const chai = require('chai')
const expect = chai.expect
const { simple, complex } = require('@wmfs/cardscript-examples')

const duplicateIds = {
  body: [
    {
      id: 'outcome',
      title: 'Outcome',
      showWhen: 'type === \'A\'',
      type: 'Input.ChoiceSet',
      choices: [
        { title: 'Choice A1', value: 'A1' },
        { title: 'Choice A2', value: 'A2' },
        { title: 'Choice A3', value: 'A3' },
        { title: 'Choice X', value: 'X' },
        { title: 'Choice Y', value: 'Y' },
        { title: 'Choice Z', value: 'Z' }
      ]
    },
    {
      id: 'outcome',
      title: 'Outcome',
      showWhen: 'type === \'B\'',
      type: 'Input.ChoiceSet',
      choices: [
        { title: 'Choice B1', value: 'B1' },
        { title: 'Choice B2', value: 'B2' },
        { title: 'Choice Y', value: 'Y' },
        { title: 'Choice Z', value: 'Z' }
      ]
    },
    {
      id: 'outcome',
      title: 'Outcome',
      showWhen: 'type === \'C\'',
      type: 'Input.ChoiceSet',
      choices: [
        { title: 'Choice C1', value: 'C1' }
      ]
    },
    {
      id: 'outcome',
      title: 'Outcome',
      showWhen: 'type === \'D\'',
      type: 'Input.ChoiceSet',
      choices: [
        { title: 'Choice X', value: 'X' },
        { title: 'Choice Y', value: 'Y' },
        { title: 'Choice Z', value: 'Z' }
      ]
    },
    {
      type: 'FactSet',
      facts: [
        {
          title: 'Outcome',
          showWhen: 'type === \'A\'',
          value: 'A1',
          choices: [
            { title: 'Choice A1', value: 'A1' },
            { title: 'Choice A2', value: 'A2' },
            { title: 'Choice A3', value: 'A3' },
            { title: 'Choice X', value: 'X' },
            { title: 'Choice Y', value: 'Y' },
            { title: 'Choice Z', value: 'Z' }
          ]
        },
        {
          title: 'Outcome',
          showWhen: 'type === \'B\'',
          value: 'B1',
          choices: [
            { title: 'Choice B1', value: 'B1' },
            { title: 'Choice B2', value: 'B2' },
            { title: 'Choice Y', value: 'Y' },
            { title: 'Choice Z', value: 'Z' }
          ]
        },
        {
          title: 'Outcome',
          showWhen: 'type === \'C\'',
          value: 'C1',
          choices: [
            { title: 'Choice C1', value: 'C1' }
          ]
        },
        {
          title: 'Outcome',
          showWhen: 'type === \'D\'',
          value: 'X',
          choices: [
            { title: 'Choice X', value: 'X' },
            { title: 'Choice Y', value: 'Y' },
            { title: 'Choice Z', value: 'Z' }
          ]
        }
      ]
    }
  ]
}

describe('Run some Cardscript list-extracting tests', function () {
  it('should extract no list from some simple Cardscript', function () {
    const result = extractLists(simple)
    expect(result).to.eql({ $simpleTitleMaps: {} })
  })

  it('should extract some lists from complex Cardscript', function () {
    const result = extractLists(complex)
    expect(result).to.eql(
      {
        $simpleTitleMaps: {
          base: {
            BBQ: 'BBQ',
            SWEETSOUR: 'Sweet and Sour',
            TOMATO: 'Tomato Sauce'
          },
          deliveryOrCollection: {
            COLLECT: 'Collect',
            DELIVER: 'Deliver'
          },
          dietaryReq: {
            DAIRY_FREE: 'Dairy Free',
            GLUTEN_FREE: 'Gluten Free',
            OTHER: 'Other',
            PEANUT: 'Peanut Allergy'
          },
          howHot: {
            1: '1 Chilli',
            2: '2 Chillies',
            3: '3 Chillies',
            4: '4 Chillies',
            5: '5 Chillies',
            6: '6 Chillies'
          },
          primaryFlavour: {
            DARK_CHOC: 'Dark Chocolate',
            MILK_CHOC: 'Milk Chocolate',
            TOFFEE: 'Toffee',
            WHITE_CHOC: 'White Chocolate'
          },
          savouryOrSweet: {
            SAVOURY: 'Savoury',
            SWEET: 'Sweet'
          },
          secondaryFlavour: {
            DARK_CHOC: 'Dark Chocolate',
            MILK_CHOC: 'Milk Chocolate',
            TOFFEE: 'Toffee',
            WHITE_CHOC: 'White Chocolate'
          },
          size: {
            L: 'Large',
            M: 'Medium',
            S: 'Small',
            XL: 'Extra Large',
            XXL: 'Extra Extra Large'
          },
          toppings: {
            CHICKEN: 'Chicken',
            HAM: 'Ham',
            JALAPENOS: 'Jalapenos',
            OLIVES: 'Olives',
            PEPPERONI: 'Pepperoni',
            PEPPERS: 'Peppers',
            PINEAPPLE: 'Pineapple',
            SPICY_BEEF: 'Spicy Beef'
          }
        },
        base: [
          {
            value: 'TOMATO',
            text: 'Tomato Sauce',
            label: 'Tomato Sauce'
          },
          {
            value: 'BBQ',
            text: 'BBQ',
            label: 'BBQ'
          },
          {
            value: 'SWEETSOUR',
            text: 'Sweet and Sour',
            label: 'Sweet and Sour'
          }
        ],
        deliveryOrCollection: [
          {
            label: 'Collect',
            text: 'Collect',
            value: 'COLLECT'
          },
          {
            label: 'Deliver',
            text: 'Deliver',
            value: 'DELIVER'
          }
        ],
        dietaryReq: [
          {
            text: 'Peanut Allergy',
            label: 'Peanut Allergy',
            value: 'PEANUT'
          },
          {
            text: 'Gluten Free',
            label: 'Gluten Free',
            value: 'GLUTEN_FREE'
          },
          {
            text: 'Dairy Free',
            label: 'Dairy Free',
            value: 'DAIRY_FREE'
          },
          {
            text: 'Other',
            label: 'Other',
            value: 'OTHER'
          }
        ],
        howHot: [
          {
            text: '1 Chilli',
            label: '1 Chilli',
            value: 1
          },
          {
            text: '2 Chillies',
            label: '2 Chillies',
            value: 2
          },
          {
            text: '3 Chillies',
            label: '3 Chillies',
            value: 3
          },
          {
            text: '4 Chillies',
            label: '4 Chillies',
            value: 4
          },
          {
            text: '5 Chillies',
            label: '5 Chillies',
            value: 5
          },
          {
            text: '6 Chillies',
            label: '6 Chillies',
            value: 6
          }
        ],
        primaryFlavour: [
          {
            value: 'MILK_CHOC',
            label: 'Milk Chocolate',
            text: 'Milk Chocolate'
          },
          {
            value: 'WHITE_CHOC',
            label: 'White Chocolate',
            text: 'White Chocolate'
          },
          {
            value: 'DARK_CHOC',
            label: 'Dark Chocolate',
            text: 'Dark Chocolate'
          },
          {
            value: 'TOFFEE',
            label: 'Toffee',
            text: 'Toffee'
          }
        ],
        secondaryFlavour: [
          {
            value: 'MILK_CHOC',
            label: 'Milk Chocolate',
            text: 'Milk Chocolate'
          },
          {
            value: 'WHITE_CHOC',
            label: 'White Chocolate',
            text: 'White Chocolate'
          },
          {
            value: 'DARK_CHOC',
            label: 'Dark Chocolate',
            text: 'Dark Chocolate'
          },
          {
            value: 'TOFFEE',
            label: 'Toffee',
            text: 'Toffee'
          }
        ],
        size: [
          {
            text: 'Small',
            label: 'Small',
            value: 'S'
          },
          {
            text: 'Medium',
            label: 'Medium',
            value: 'M'
          },
          {
            text: 'Large',
            label: 'Large',
            value: 'L'
          },
          {
            text: 'Extra Large',
            label: 'Extra Large',
            value: 'XL'
          },
          {
            text: 'Extra Extra Large',
            label: 'Extra Extra Large',
            value: 'XXL'
          }
        ],
        toppings: [
          {
            text: 'Pepperoni',
            label: 'Pepperoni',
            value: 'PEPPERONI'
          },
          {
            text: 'Olives',
            label: 'Olives',
            value: 'OLIVES'
          },
          {
            text: 'Peppers',
            label: 'Peppers',
            value: 'PEPPERS'
          },
          {
            text: 'Pineapple',
            label: 'Pineapple',
            value: 'PINEAPPLE'
          },
          {
            text: 'Ham',
            label: 'Ham',
            value: 'HAM'
          },
          {
            text: 'Chicken',
            label: 'Chicken',
            value: 'CHICKEN'
          },
          {
            text: 'Spicy Beef',
            label: 'Spicy Beef',
            value: 'SPICY_BEEF'
          },
          {
            text: 'Jalapenos',
            label: 'Jalapenos',
            value: 'JALAPENOS'
          }
        ],
        savouryOrSweet: [
          {
            label: 'Savoury',
            text: 'Savoury',
            value: 'SAVOURY'
          },
          {
            label: 'Sweet',
            text: 'Sweet',
            value: 'SWEET'
          }
        ]
      }
    )
  })

  it('should extract lists from Cardscript with duplicate ID', function () {
    const result = extractLists(duplicateIds)
    expect(result).to.eql({
      $simpleTitleMaps: {
        Outcome: {
          A1: 'Choice A1',
          A2: 'Choice A2',
          A3: 'Choice A3',
          B1: 'Choice B1',
          B2: 'Choice B2',
          C1: 'Choice C1',
          X: 'Choice X',
          Y: 'Choice Y',
          Z: 'Choice Z'
        },
        outcome: {
          A1: 'Choice A1',
          A2: 'Choice A2',
          A3: 'Choice A3',
          B1: 'Choice B1',
          B2: 'Choice B2',
          C1: 'Choice C1',
          X: 'Choice X',
          Y: 'Choice Y',
          Z: 'Choice Z'
        }
      },
      outcome: [
        {
          label: 'Choice A1',
          text: 'Choice A1',
          value: 'A1'
        },
        {
          label: 'Choice A2',
          text: 'Choice A2',
          value: 'A2'
        },
        {
          label: 'Choice A3',
          text: 'Choice A3',
          value: 'A3'
        },
        {
          label: 'Choice X',
          text: 'Choice X',
          value: 'X'
        },
        {
          label: 'Choice Y',
          text: 'Choice Y',
          value: 'Y'
        },
        {
          label: 'Choice Z',
          text: 'Choice Z',
          value: 'Z'
        },
        {
          label: 'Choice B1',
          text: 'Choice B1',
          value: 'B1'
        },
        {
          label: 'Choice B2',
          text: 'Choice B2',
          value: 'B2'
        },
        {
          label: 'Choice C1',
          text: 'Choice C1',
          value: 'C1'
        }
      ]
    })
  })
})
