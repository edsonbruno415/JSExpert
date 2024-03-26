export default class ContextStrategy {
  constructor(connectionString) {
    this.connectionString = connectionString;
  }

  async connect() {
    return this.connectionString.connect();
  }

  async find(item) {
    return this.connectionString.find(item);
  }

  async save(item) {
    return this.connectionString.save(item);
  }
}