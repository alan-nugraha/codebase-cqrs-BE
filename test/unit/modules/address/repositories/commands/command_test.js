const assert = require('assert');
const sinon = require('sinon');

const Command = require('../../../../../../bin/modules/address/repositories/commands/command');

describe('Address-command', () => {
  describe('insertOneAddress', () => {
    const queryResult = {
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
    };

    it('should success to insert data to db', async () => {
      const db = {
        insertOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub(),
      };
      const command = new Command(db);
      const res = await command.insertOneAddress({});
      assert.equal(res.data.country, queryResult.data.country);
    });
  });

  describe('upsertOneAddress', () => {
    const queryResult = {
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
    };

    it('should success to update data to db', async () => {
      const db = {
        upsertOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub(),
      };
      const command = new Command(db);
      const res = await command.upsertOneAddress({});
      assert.equal(res.data.country, queryResult.data.country);
    });
  });

  describe('deleteOneAddress', () => {
    const queryResult = {
      err: null,
      data: '',
    };

    it('should success to delete data from db', async () => {
      const db = {
        deleteOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub(),
      };
      const command = new Command(db);
      const res = await command.deleteOneAddress({});
      assert.equal(res.err, null);
    });
  });
});
