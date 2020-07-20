class Query {

  constructor(db) {
    this.db = db;
  }

  async findAllAddress(parameter) {
    this.db.setCollection('alladdress');
    const recordset = await this.db.findMany(parameter);
    return recordset;
  }

  async findOneAddress(parameter) {
    this.db.setCollection('alladdress');
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }
}

module.exports = Query;
