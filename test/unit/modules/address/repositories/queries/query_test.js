const assert = require('assert');
const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/address/repositories/queries/query');

describe('findAllAddress', () => {
  const db = {
    setCollection: sinon.stub(),
    findMany: sinon.stub().resolves({
      err: null,
      data: [
        {
          _id: '5bac53b45ea76b1e9bd58e1c',
          country: 'Indonesia',
          province: 'Jawa Timur',
          city: 'Tuban',
          district: 'Jatirogo',
          postcode: '62362',
          address: 'Jalan Raya Lasem No 728 Desa Paseyan RT 5 RW 7',
        },
      ],
    }),
  };

  it('should return success get all address', async () => {
    const query = new Query(db);
    const result = await query.findAllAddress({});
    assert.notEqual(result.data, null);
    assert.equal(result.data.length, 1);
  });
});

describe('findOneAddress', () => {
  const db = {
    setCollection: sinon.stub(),
    findOne: sinon.stub().resolves({
      err: null,
      data: {
        _id: '5bac53b45ea76b1e9bd58e1c',
        country: 'Indonesia',
        province: 'Jawa Timur',
        city: 'Tuban',
        district: 'Jatirogo',
        postcode: '62362',
        address: 'Jalan Raya Lasem No 728 Desa Paseyan RT 5 RW 7',
      },
    }),
  };

  it('should return success get address', async () => {
    const query = new Query(db);
    const result = await query.findOneAddress({});
    assert.notEqual(result.data, null);
    assert.equal(result.data.country, 'Indonesia');
  });
});
