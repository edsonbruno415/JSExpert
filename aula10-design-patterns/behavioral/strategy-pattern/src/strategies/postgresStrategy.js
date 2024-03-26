import knex from 'knex';

export default class PostgresStrategy {
  #instance;
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.table = 'warriors';
  }

  async connect() {
    this.#instance = knex({
      client: 'pg',
      connection: this.connectionString,
    });

    return this.#instance.raw('select 1+1 as result;');
  }

  async find(item) {
    return this.#instance.select(item).from(this.table);
  }

  async save(item) {
    return this.#instance.insert(item).into(this.table);
  }
}