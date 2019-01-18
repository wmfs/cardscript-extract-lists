# cardscript-extract-lists

[![Tymly Cardscript](https://img.shields.io/badge/tymly-cardscript-blue.svg)](https://tymly.io/)
[![Build Status](https://travis-ci.com/wmfs/cardscript-extract-lists.svg?branch=master)](https://travis-ci.com/wmfs/cardscript-extract-lists)
[![npm (scoped)](https://img.shields.io/npm/v/@wmfs/cardscript-extract-lists.svg)](https://www.npmjs.com/package/@wmfs/cardscript-extract-lists) 
[![codecov](https://codecov.io/gh/wmfs/cardscript-extract-lists/branch/master/graph/badge.svg)](https://codecov.io/gh/wmfs/cardscript-extract-lists) 
[![CodeFactor](https://www.codefactor.io/repository/github/wmfs/cardscript-extract-lists/badge)](https://www.codefactor.io/repository/github/wmfs/cardscript-extract-lists) 
[![Dependabot badge](https://img.shields.io/badge/Dependabot-active-brightgreen.svg)](https://dependabot.com/) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) 
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/wmfs/tymly/blob/master/packages/concrete-paths/LICENSE)

> Extracts list objects from some Cardscript.

## <a name="install"></a>Install
```bash
$ npm install cardscript-extract-lists --save
```

## <a name="usage"></a>Usage

```javascript
const extractLists = require('@wmfs/cardscript-extract-lists')

const lists = extractLists(
  {
    "type": "AdaptiveCard",
    "body": [
      {
        "type": "TextBlock",
        "text": "Change me!",
        "color": "attention",
        "horizontalAlignment": "center"
      }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.0"
  }
)

```

## <a name="test"></a>Testing

```bash
$ npm test
```

## <a name="license"></a>License
[MIT](https://github.com/wmfs/cardscript/blob/master/LICENSE)
