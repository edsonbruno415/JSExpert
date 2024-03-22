'use strict';

/* 
class Database {
  constructor({ connectionString }) {
    this.connectionString = connectionString;
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async connect() {
    await this.sleep(1000);
    return this;
  }

  async findAll() {
    await this.sleep(1000);
    return [{ "id": 1, "name": "Edson Bruno" }, { "id": 2, "name": "Tayane Ewelu" }]
  }
} */


// Class Javascript syntax sugar = Função construtora
Database.prototype.sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

Database.prototype.connect = async function () {
  await this.sleep(1000);
  return this;
}

Database.prototype.findAll = async function () {
  await this.sleep(1000);
  return [{ "id": 1, "name": "Edson Bruno" }, { "id": 2, "name": "Tayane Ewelu" }];
}

function Database({ connectionString }) {
  this.connectionString = connectionString;
}

module.exports = Database;