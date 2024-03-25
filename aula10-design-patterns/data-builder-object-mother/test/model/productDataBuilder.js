const Product = require("../../src/entities/product");

class ProductDataBuilder {
  constructor() {
    // default: são os dados corretos
    // override: os dados modificados para cada teste
    this.productData = {
      id: '000001',
      name: 'computer',
      price: 1000,
      category: 'electronic'
    };
  }

  static instanceProductDataBuilder() {
    return new ProductDataBuilder();
  }

  withInvalidId(){
    this.productData.id = '1';
    return this;
  }

  withInvalidName(){
    this.productData.name = 'abc1253';
    return this;
  }

  withInvalidPrice(){
    this.productData.price = 2000;
    return this;
  }

  withInvalidCategory(){
    this.productData.category = 'kitchen';
    return this;
  }
  
  build() {
    const product = new Product(this.productData);
    return product;
  }
}

module.exports = ProductDataBuilder;