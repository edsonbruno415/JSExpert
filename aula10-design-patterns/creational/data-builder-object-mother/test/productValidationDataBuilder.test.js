const { expect } = require('chai');
const { it, describe } = require('mocha');
const { productValidator } = require('../src');
// const ProductObjectMother = require('./model/productObjectMother');
const ProductObjectMother = require('./model/productObjectMother');

describe('Test Data Builder',()=>{
  it('should not return error with valid product',()=>{
    const product = ProductObjectMother.valid();
    const result = productValidator(product);

    const expected = {
      errors: [],
      result: true,
    };

    expect(result).to.be.deep.equal(expected);
  });
  describe('Product Validation Rules', ()=>{
    it('should return an object error when creating a Product with invalid id', ()=>{
      const product = ProductObjectMother.withInvalidId();
      const result = productValidator(product);
  
      const expected = {
        errors: ['id: is invalid, current [1] expected to be between 2 and 20'],
        result: false,
      };
  
      expect(result).to.be.deep.equal(expected);
    });
    it('should return an object error when creating a Product with invalid name', ()=>{
      const product = ProductObjectMother.withInvalidName();
      const result = productValidator(product);
  
      const expected = {
        errors: ['name: is invalid, current [abc1253] expected to have only words'],
        result: false,
      };
  
      expect(result).to.be.deep.equal(expected);
    });
    it('should return an object error when creating a Product with invalid price', ()=>{
      const product = ProductObjectMother.withInvalidPrice();
      const result = productValidator(product);
  
      const expected = {
        errors: ['price: is invalid, current [2000] expected to be between 0 and 1000'],
        result: false,
      };
  
      expect(result).to.be.deep.equal(expected);
    });
    it('should return an object error when creating a Product with invalid category', ()=>{
      const product = ProductObjectMother.withInvalidCategory();
      const result = productValidator(product);
  
      const expected = {
        errors: ['category: is invalid, current [kitchen] expected should be electronic or organic'],
        result: false,
      };
  
      expect(result).to.be.deep.equal(expected);
    });
  })
});