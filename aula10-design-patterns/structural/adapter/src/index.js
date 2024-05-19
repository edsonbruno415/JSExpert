import RickAndMortyBRLAdapter from './business/adapters/rickAndMortyBRLAdapter.js';
import RickAndMortyUSAAdapter from "./business/adapters/rickAndMortyUSAAdapter.js";

const data = [
  RickAndMortyBRLAdapter,
  RickAndMortyUSAAdapter
].map(integration => integration.getCharacters())

const all = await Promise.allSettled(data)

const successCases = all.filter(({ status }) => status === 'fulfilled')
                        .map(({ value }) => value)
                        .reduce((prev, next) => prev.concat(next), [])

const failedCases = all.filter(({ status}) => status === 'rejected')

console.table(successCases)

console.table(failedCases)