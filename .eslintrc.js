module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jest": true
  },

  "extends": ["react-app", "eslint:recommended", "plugin:jest/recommended", "plugin:react/recommended", "plugin:redux-saga/recommended"],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
      "react-in-jsx-scope": true,
      "codeFrame": false
    },
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "jest",
    "redux-saga"
  ],
  "rules": {
    "react/displayName": [
      0
    ],
    "no-debugger": [
      0
    ],
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": [
     1 
    ]
  }
};
