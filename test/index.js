/* eslint no-unused-vars: 0 */
/* eslint no-unused-expressions: 0 */
/* eslint no-undef: 0 */

'use strict';

const chai = require('chai');
const CryptoObject = require('../index.js');

const should = chai.should();
const expect = chai.expect;

const testOptions = {
  password: 'Monica'
};

describe('Crypto Object Tests', () => {
  it(`Should instantiate`, () => {
    const cryptoObject = new CryptoObject(testOptions);
    expect(cryptoObject).to.be.ok;
  });

  it('Should throw an exception if no password is provided', () => {
    expect(() => new CryptoObject()).to.throw();
  });

  it('Should not encrypt keys that are not Strings with at least some content', () => {
    const cryptoObject = new CryptoObject(testOptions);

    const plainObject = {
      foo: 'bar',
      foo2: null,
      foo3: 'baz',
      foo4: 123
    };

    const cipherObject = cryptoObject.encrypt(plainObject);
    const decryptedObject = cryptoObject.decrypt(cipherObject);

    cipherObject.should.be.an('Object');
    decryptedObject.should.be.an('Object');

    cipherObject.should.not.deep.equal(plainObject);
    cipherObject.should.not.deep.equal(decryptedObject);

    decryptedObject.should.deep.equal(plainObject);
  });

  it('Should encrypt alphanumeric key values', () => {
    const cryptoObject = new CryptoObject(testOptions);

    const plainObject = {
      foo: 'bar'
    };

    const cipherObject = cryptoObject.encrypt(plainObject);
    const decryptedObject = cryptoObject.decrypt(cipherObject);

    cipherObject.should.be.an('Object');
    decryptedObject.should.be.an('Object');

    cipherObject.should.not.deep.equal(plainObject);
    cipherObject.should.not.deep.equal(decryptedObject);

    decryptedObject.should.deep.equal(plainObject);
  });

  it('Should encrypt non-ASCII key values - (Arabic Text)', () => {
    const cryptoObject = new CryptoObject(testOptions);

    const plainObject = {
      foo: 'اعهااايووواعععت'
    };

    const cipherObject = cryptoObject.encrypt(plainObject);
    const decryptedObject = cryptoObject.decrypt(cipherObject);

    cipherObject.should.be.an('Object');
    decryptedObject.should.be.an('Object');

    cipherObject.should.not.deep.equal(plainObject);
    cipherObject.should.not.deep.equal(decryptedObject);

    decryptedObject.should.deep.equal(plainObject);
  });

  it('Should encrypt long key values - (> 1500 chars)', () => {
    const cryptoObject = new CryptoObject(testOptions);

    const plainObject = {
      foo: ''
    };

    for (let i = 0; i < 1500; i++) {
      plainObject.foo += 'bar-baz';
    }

    const cipherObject = cryptoObject.encrypt(plainObject);
    const decryptedObject = cryptoObject.decrypt(cipherObject);

    cipherObject.should.be.an('Object');
    decryptedObject.should.be.an('Object');

    cipherObject.should.not.deep.equal(plainObject);
    cipherObject.should.not.deep.equal(decryptedObject);

    decryptedObject.should.deep.equal(plainObject);
  });

  it('Should allow excluding key values from being encrypted', () => {
    const cryptoObject = new CryptoObject(Object.assign(testOptions, {
      excludeKeys: ['fooExcluded']
    }));

    const plainObject = {
      foo: 'bar',
      fooExcluded: 'I-shall-not-be-encrypted'
    };

    const cipherObject = cryptoObject.encrypt(plainObject);
    const decryptedObject = cryptoObject.decrypt(cipherObject);

    cipherObject.should.be.an('Object');
    cipherObject.should.have.property('fooExcluded');
    cipherObject.fooExcluded.should.equal(plainObject.fooExcluded);

    decryptedObject.should.be.an('Object');

    cipherObject.should.not.deep.equal(plainObject);
    cipherObject.should.not.deep.equal(decryptedObject);

    decryptedObject.should.deep.equal(plainObject);
  });


  it('Should not decrypt if decryption password is different than encryption password', () => {
    let cryptoObject = {};

    const plainObject = {
      foo: 'bar'
    };

    cryptoObject = new CryptoObject(testOptions);
    const cipherObject = cryptoObject.encrypt(plainObject);

    cryptoObject = new CryptoObject({password: 'a-wrong-password'});
    const decryptedObject = cryptoObject.decrypt(cipherObject);

    cipherObject.should.be.an('Object');
    decryptedObject.should.be.an('Object');

    cipherObject.should.not.deep.equal(plainObject);
    cipherObject.should.not.deep.equal(decryptedObject);

    decryptedObject.should.not.deep.equal(plainObject);
  });
});
