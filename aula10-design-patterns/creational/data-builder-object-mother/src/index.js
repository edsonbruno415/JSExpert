/*
ProducId: should be between 2 and 20 characters
Name: should be only words
Price: should be from zero to a thousand
Category: should be electronic or organic
*/

function productValidator(product) {
  const errors = [];
  const errorMessage = (field, value, rule) => `${field}: is invalid, current [${value}] expected ${rule}`;

  if (!(product.id.length >= 2 && product.id.length <= 20)) {
    errors.push(errorMessage('id', product.id, 'to be between 2 and 20'));
  }

  if (/\W|\d/.test(product.name)) {
    errors.push(errorMessage('name', product.name, 'to have only words'));
  }

  if (!(product.price >= 0 && product.price <= 1000)) {
    errors.push(errorMessage('price', product.price, 'to be between 0 and 1000'));
  }

  if (!(['electronic', 'organic'].includes(product.category))) {
    errors.push(errorMessage('category', product.category, 'should be electronic or organic'));
  }

  return {
    result: errors.length === 0,
    errors,
  };
}

module.exports = {
  productValidator,
};
