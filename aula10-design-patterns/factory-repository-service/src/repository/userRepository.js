'use strict';

class UserRespository{
  constructor({ userDatabase }){
    this.userDatabase = userDatabase;
  }

  async findAllUsers(){
    return await this.userDatabase.findAll();
  }

}

module.exports = UserRespository;