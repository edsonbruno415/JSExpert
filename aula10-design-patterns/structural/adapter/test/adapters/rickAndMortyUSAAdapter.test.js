import {
  expect,
  describe,
  test,
  jest,
  beforeEach
} from '@jest/globals'
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA'
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter'

describe('#RickAndMortyBRLAdapter tests', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('getCharacters should be an adapter for RickAndMortyBRL.getCharactersJSON', async () => {
    const usaIntegration = jest.spyOn(
      RickAndMortyUSA,
      RickAndMortyUSA.getCharactersFromXML.name
    ).mockResolvedValue([])

    const result = await RickAndMortyUSAAdapter.getCharacters()
    expect(usaIntegration).toHaveBeenCalled()
  })
})