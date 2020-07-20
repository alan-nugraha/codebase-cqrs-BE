const Address = require('../../../../../../bin/modules/address/repositories/commands/domain');
const command = require('../../../../../../bin/modules/address/repositories/commands/command');
const sinon = require('sinon');
const assert = require('assert');
const logger = require('../../../../../../bin/helpers/utils/logger');

describe('Address-commandDomain', () => {
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

  describe('createAddress', () => {
    const db = {
      setCollection: sinon.stub()
    };

    const address = new Address(db);

    it('should return internal server error', async () => {
      let payload = {
        country: 'Indonesia',
        province: 'Jawa Timur',
        city: 'Tuban',
        district: 'Jatirogo',
        postcode: '62362',
        address: 'Jalan Raya Lasem No 728 Desa Paseyan RT 5 RW 7',
      };
      sinon.stub(command.prototype, 'insertOneAddress').resolves({ err: true });
      const result = await address.createAddress(payload);
      command.prototype.insertOneAddress.restore();
      assert.equal(result.err.message, 'Internal server error');
    });

    it('should return success create address', async () => {
      let payload = {
        country: 'Indonesia',
        province: 'Jawa Timur',
        city: 'Tuban',
        district: 'Jatirogo',
        postcode: '62362',
        address: 'Jalan Raya Lasem No 728 Desa Paseyan RT 5 RW 7',
      };
      sinon
        .stub(command.prototype, 'insertOneAddress')
        .resolves({ err: null, data: { country: 'Indonesia' } });
      const result = await address.createAddress(payload);
      command.prototype.insertOneAddress.restore();
      assert.equal(result.data.country, 'Indonesia');
    });
  });

  describe('updateAddress', () => {
    const db = {
      setCollection: sinon.stub(),
    };

    const address = new Address(db);

    it('should return internal server error', async () => {
      let queryResult = {
        err: true,
        data: '',
      };
      let payload = {
        country: 'Indonesia',
        province: 'Jawa Timur',
        city: 'Tuban',
        district: 'Jatirogo',
        postcode: '62362',
        address: 'Jalan Raya Lasem No 728 Desa Paseyan RT 5 RW 7',
      };
      sinon.stub(command.prototype, 'upsertOneAddress').resolves(queryResult);
      const result = await address.updateAddress(payload);
      command.prototype.upsertOneAddress.restore();
      assert.equal(result.err.message, 'Internal server error');
    });

    it('should return succes update address', async () => {
      let queryResult = {
        err: null,
        data: {
          country: 'Indonesia',
          province: 'Jawa Timur',
          city: 'Tuban',
          district: 'Jatirogo',
          postcode: '62362',
          address: 'Jalan Raya Lasem No 728 Desa Paseyan RT 5 RW 7',
        }
      };
      let payload = {
        country: 'Indonesia',
        province: 'Jawa Timur',
        city: 'Tuban',
        district: 'Jatirogo',
        postcode: '62362',
        address: 'Jalan Raya Lasem No 728 Desa Paseyan RT 5 RW 7',
      };
      sinon.stub(command.prototype, 'upsertOneAddress').resolves(queryResult);
      const result = await address.updateAddress(payload);
      command.prototype.upsertOneAddress.restore();
      assert.equal(result.data.country, 'Indonesia');
    });
  });

  describe('deleteAddress', () => {
    const db = {
      setCollection: sinon.stub(),
    };

    const address = new Address(db);

    it('should return internal server error', async () => {
      let queryResult = {
        err: true,
        data: '',
      };
      let payload = {
        addressId: 'testest',
      };
      sinon.stub(command.prototype, 'deleteOneAddress').resolves(queryResult);
      const result = await address.deleteAddress(payload);
      command.prototype.deleteOneAddress.restore();
      assert.equal(result.err.message, 'Internal server error');
    });

    it('should return success delete address', async () => {
      let queryResult = {
        err: null,
        data: '',
      };
      let payload = {
        addressId: 'testest',
      };
      sinon.stub(command.prototype, 'deleteOneAddress').resolves(queryResult);
      const result = await address.deleteAddress(payload);
      command.prototype.deleteOneAddress.restore();
      assert.equal(result.err, null);
    });
  });
});
