'use strict';

const dataMock = require('../data/userData.json');

class MockDatabase{
  connect = () => this;
  findAll = async () => dataMock;
}

module.exports = MockDatabase