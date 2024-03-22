'use strict';

class UserRespository{
  constructor({ dbConnection }){
    this.dbConnection = dbConnection;
  }

  async findAllUsers(){
    return this.dbConnection.findAll();
  }

}

module.exports = UserRespository;