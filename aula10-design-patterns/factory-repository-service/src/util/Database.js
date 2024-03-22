'use strict';

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
    return [{"id": 1, "name": "Edson Bruno"}, {"id": 2, "name": "Tayane Ewelu"}]
  }
}

module.exports = Database;