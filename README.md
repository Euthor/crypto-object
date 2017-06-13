# crypto-object
Encrypt Objects in Node.js, using built-in [Crypto][1]

[![Build Status](https://travis-ci.org/Euthor/crypto-object.svg?branch=master)](https://travis-ci.org/Euthor/crypto-object)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Usage

```bash
$ npm i --save https://github.com/Euthor/crypto-object.git
```

```javascript
const CryptoObject = require('crypto-object');
const cryptoObject = new CryptoObject({password: 'veronica'});

// Note: The ciphertext has the same length as the plaintext.
cryptoObject.encrypt({foo: 'bar'})
// `{foo: '5eadc2'}`

cryptoObject.decrypt({foo: '5eadc2'})
// `{foo: 'bar'}`
```

## Run the tests

```bash
$ npm install -g mocha
$ npm test
```

## Contributing?

```bash
# Always run the linter & fix code style before pushing
$ npm run lint
```

## Authors

- Nicholas Kyriakides, [@nicholaswmin][2]

## Owners

- [Euthor][3]

## License

> The MIT License

[1]: https://nodejs.org/api/crypto.html
[2]: https://github.com/nicholaswmin
[3]: https://github.com/Euthor
