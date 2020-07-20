const Address = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const address = new Address(db);

const getAllAddress = async () => {
  const getData = async () => {
    const result = await address.getAllAddress();
    return result;
  };
  const result = await getData();
  return result;
};

const getAddress = async (data) => {
  const getData = async () => {
    const result = await address.getAddress(data);
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  getAllAddress,
  getAddress
};
