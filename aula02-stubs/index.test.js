const Service = require('./service');
const sinon = require('sinon');
const { deepStrictEqual } = require('assert');
const mocks = {
  tatooine: require('./mocks/tatooine.json'),
  alderaan: require('./mocks/alderaan.json'),
};

const BASE_URL_1 = 'https://swapi.dev/api/planets/1';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2';

(async () => {
  /* realiza a chamada para o serviço utilizando internet
  const result = await new Service().makeRequest(BASE_URL_1);
  console.log(result);
  */

  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  stub
    .withArgs(BASE_URL_1)
    .resolves(mocks.tatooine)
  stub
    .withArgs(BASE_URL_2)
    .resolves(mocks.alderaan)

  {
    const response = await service.getPlanet(BASE_URL_1);
    const expected = {
      name: 'Tatooine',
      surfaceWater: '1',
      appearedIn: 5,
    };
    deepStrictEqual(response, expected);
  }
  {
    const response = await service.getPlanet(BASE_URL_2);
    const expected = {
      name: 'Alderaan',
      surfaceWater: '40',
      appearedIn: 2,
    };
    deepStrictEqual(response, expected);
  }
})();