'use strict';

const UserDatabase = require('../util/userDatabase');
const UserRespository = require('../repository/userRepository');
const UserService = require('../service/userService');

class userFactory {
  static async createNewInstance() {
    const database = {
      connect: () => 'Conectado!!!'
    };
    const url = `monguinho:2020/Users`;
    const userDatabase = new UserDatabase({ database, url });
    await userDatabase.connect()
    const userRepository = new UserRespository({ userDatabase });
    const userService = new UserService({ userRepository });
    return userService;
  }
}

module.exports = userFactory;