import ContextStrategy from './src/base/contextStrategy.js';
import MongoStrategy from './src/strategies/mongoStrategy.js';
import PostgresStrategy from './src/strategies/postgresStrategy.js';

const postgresConnectionString = 'postgres://edsonbruno:senha123@localhost:5432/heroes';
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));
await postgresContext.connect();

const mongodbConnectionString = 'mongodb://edsonbruno:mongo123@localhost:27017/heroes';
const mongoContext = new ContextStrategy(new MongoStrategy(mongodbConnectionString));
await mongoContext.connect();

const data = [{
  name: 'edson bruno',
  type: 'transaction'
}, {
  name: 'tayane ewelu',
  type: 'activityLog'
}];

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoContext,
};

for (const { type, name } of data) {
  const context = contextTypes[type];
  await context.save({ name: name + Date.now() });
  console.log(type, context.connectionString.constructor.name);
  console.log(await context.find());
}