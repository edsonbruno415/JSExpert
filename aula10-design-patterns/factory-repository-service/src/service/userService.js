'use strict';

class UserService {
  constructor({ userRepository }){
    this.userRepository = userRepository;
  }

  async splitFullNames(){
    const users = await this.userRepository.findAllUsers();
    return users.map(({ name }) => name.split(' '));
  }
}

module.exports = UserService;