'use strict';

const UserFactory = require('../src/factory/userFactory');

; (async () => {
  try {
    const users = await UserFactory.createInstance();
    const result = await users.splitFullNames();
    console.log('RESULT', result);
  } catch (error) {
    console.log('ERROR', error);
  }
})();