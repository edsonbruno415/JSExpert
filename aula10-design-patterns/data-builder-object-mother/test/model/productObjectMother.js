const ProductDataBuilder = require("./productDataBuilder");

class ProductObjectMother {
  static valid() {
    return ProductDataBuilder
            .instanceProductDataBuilder()
            .build();
  }

  static withInvalidId() {
    return ProductDataBuilder
            .instanceProductDataBuilder()
            .withInvalidId()
            .build();
  }

  static withInvalidName() {
    return ProductDataBuilder
            .instanceProductDataBuilder()
            .withInvalidName()
            .build();
  }

  static withInvalidPrice() {
    return ProductDataBuilder
            .instanceProductDataBuilder()
            .withInvalidPrice()
            .build();
  }

  static withInvalidCategory() {
    return ProductDataBuilder
            .instanceProductDataBuilder()
            .withInvalidCategory()
            .build();
  }
}

module.exports = ProductObjectMother;