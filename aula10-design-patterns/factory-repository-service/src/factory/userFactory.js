'use strict';

const Database = require('../util/Database');
const UserRespository = require('../repository/userRepository');
const UserService = require('../service/userService');

class userFactory {
  static async createInstance() {
    const db = new Database({ connectionString: 'mongodb://localhost:4000/Users'});
    const dbConnection = await db.connect();
    const userRepository = new UserRespository({ dbConnection });
    const userService = new UserService({ userRepository });
    return userService;
  }
}

module.exports = userFactory;