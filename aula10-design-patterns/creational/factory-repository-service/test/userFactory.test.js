const rewiremock = require('rewiremock/node');
const { deepStrictEqual } = require('assert');
const driverMock = require('./mocks/driver/database');

rewiremock(() => require('../src/util/Database')).with(driverMock);

; (async () => {
  {
    const expected = [['Maria', 'Gonçalves'], ['João', 'Nettu', 'Cardoso']];
    rewiremock.enable();
    const UserFactory = require('../src/factory/userFactory');
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.splitFullNames();
    deepStrictEqual(result, expected);
    rewiremock.disable();
  }
  {
    const expected = [['Edson', 'Bruno'], ['Tayane', 'Ewelu']];
    const UserFactory = require('../src/factory/userFactory');
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.splitFullNames();
    deepStrictEqual(result, expected);
  }
})();