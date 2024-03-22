'use strict';

class UserDatabase {
  constructor({ database, url }) {
    this.database = database;
    this.connectionUrl = url;
    this.connection = undefined;
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async connect() {
    await this.sleep(1000);
    this.connection = this.database.connect(this.connectionUrl);
    return 1;
  }

  async findAll() {
    await this.sleep(1000);
    if(!this.connection) throw new Error('Conection Failed!');
    return [{"id": 1, "name": "Edson Bruno"}, {"id": 2, "name": "Tayane Ewelu"}]
  }
}

module.exports = UserDatabase;