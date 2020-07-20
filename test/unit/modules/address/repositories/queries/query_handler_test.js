const queryHandler = require('../../../../../../bin/modules/address/repositories/queries/query_handler');
const Address = require('../../../../../../bin/modules/address/repositories/queries/domain');
const sinon = require('sinon');
const assert = require('assert');

describe('Address-queryHandler', () => {

  const data = {
    success: true,
    data: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
    message: 'Your Request Has Been Processed',
    code: 200
  };

  const payload = {
    'AddressId': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9'
  };

  describe('getAllAddress', () => {

    it('should return get all address', async () => {
      sinon.stub(Address.prototype, 'getAllAddress').resolves(data);

      const rs = await queryHandler.getAllAddress();

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      Address.prototype.getAllAddress.restore();
    });
  });

  describe('getAddress', () => {

    it('should return get address', async () => {
      sinon.stub(Address.prototype, 'getAddress').resolves(data);

      const rs = await queryHandler.getAddress(payload);

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      Address.prototype.getAddress.restore();
    });
  });
});
