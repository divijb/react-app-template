const aliases = require('./config/aliases');

module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:promise/recommended", "airbnb"],
  "env": {
    "browser": true,
    "node": true,
    "jest": true,
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "ecmaFeatures": {
      "modules": true,
      "jsx": true
    }
  },
  "plugins": [
    "babel",
    "react",
    "promise",
    "filenames",
    "compat"
  ],
  "settings": {
    "import/resolver": {
      "alias": aliases
    },
    "polyfills": [
      "promises"
    ]
  },
  "rules": {
    "import/extensions": ["off"],
    "import/no-extraneous-dependencies": [
      "off",
      {
        "devDependencies": true,
        "optionalDependencies": true,
        "peerDependencies": false
      }
    ],
    "jsx-a11y/href-no-hash": ["warn"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": ["warn"],
    "react/require-default-props": ["off"],
    "react/sort-comp": ["warn"],
    "filenames/match-regex": [2, "(\.store)*(\.test)*"],
    "filenames/match-exported": [1, ["pascal", "kebab", "camel"], "\.store" ],
    "filenames/no-index": 2,
    "compat/compat": "error",
    "react/no-unused-prop-types": [1, { skipShapeProps: true }],
    "no-restricted-properties": [
      "error",
      {
        "object": "window",
        "property": "localStorage",
        "message": "Please use client/utils/storage.js instead of localStorage directly"
      }
    ],
    "no-restricted-globals": [
      "error",
      "localStorage"
    ]
  }
};
