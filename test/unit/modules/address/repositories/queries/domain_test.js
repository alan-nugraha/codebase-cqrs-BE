const Address = require('../../../../../../bin/modules/address/repositories/queries/domain');
const query = require('../../../../../../bin/modules/address/repositories/queries/query');
const sinon = require('sinon');
const assert = require('assert');
const logger = require('../../../../../../bin/helpers/utils/logger');

describe('Address-queryDomain', () => {
  beforeEach(async () => {
    sinon.stub(logger, 'log');
    sinon.stub(logger, 'info');
    sinon.stub(logger, 'error');
  });

  afterEach(async () => {
    logger.log.restore();
    logger.info.restore();
    logger.error.restore();
  });

  describe('getAllAddress', () => {
    const db = {
      setCollection: sinon.stub(),
    };

    const address = new Address(db);

    it('should return not found error', async () => {
      let queryResult = {
        err: true,
        data: '',
      };
      sinon.stub(query.prototype, 'findAllAddress').resolves(queryResult);
      const result = await address.getAllAddress();
      query.prototype.findAllAddress.restore();
      assert.notEqual(result.err, null);
    });

    it('should return get all address success', async () => {
      let queryResult = {
        err: null,
        data: [
          {
            addressId: 'testest',
            country: 'Indonesia',
            province: 'Jawa Timur',
            city: 'Tuban',
            district: 'Jatirogo',
            postcode: '62362',
            address: 'Jalan Raya Lasem No 728 Desa Paseyan RT 5 RW 7',
          },
        ],
      };
      sinon.stub(query.prototype, 'findAllAddress').resolves(queryResult);
      const result = await address.getAllAddress();
      query.prototype.findAllAddress.restore();
      assert.equal(result.data.length, 1);
    });
  });

  describe('getAddress', () => {
    const db = {
      setCollection: sinon.stub(),
    };

    const address = new Address(db);

    it('should return not found error', async () => {
      let queryResult = {
        err: true,
        data: '',
      };
      let payload = {
        addressId: 'testtest',
      };
      sinon.stub(query.prototype, 'findOneAddress').resolves(queryResult);
      const result = await address.getAddress(payload);
      query.prototype.findOneAddress.restore();
      assert.notEqual(result.err, null);
    });

    it('should return get address success', async () => {
      let queryResult = {
        err: null,
        data: {
          addressId: 'testest',
          country: 'Indonesia',
          province: 'Jawa Timur',
          city: 'Tuban',
          district: 'Jatirogo',
          postcode: '62362',
          address: 'Jalan Raya Lasem No 728 Desa Paseyan RT 5 RW 7',
        },
      };
      let payload = {
        addressId: 'testest',
      };
      sinon.stub(query.prototype, 'findOneAddress').resolves(queryResult);
      const result = await address.getAddress(payload);
      query.prototype.findOneAddress.restore();
      assert.equal(result.data.country, 'Indonesia');
    });
  });
});
