const Command = require('./command');
const Query = require('../queries/query');
const model = require('./command_model');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const { InternalServerError } = require('../../../../helpers/error');
const uuidv4 = require('uuid/v4');

class Address {
  constructor(db) {
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async createAddress(data) {
    const ctx = 'createAddress';
    const address = model.address();
    address.addressId = uuidv4();
    address.country = data.country;
    address.province = data.province;
    address.city = data.city;
    address.district = data.district;
    address.postcode = data.postcode;
    address.address = data.address;

    const saveAddress = await this.command.insertOneAddress(address);
    if (saveAddress.err) {
      logger.error(ctx, 'error', 'Internal server error', saveAddress.err);
      return wrapper.error(new InternalServerError('Internal server error'));
    }
    logger.info(ctx, 'success', 'Create address success', address);
    return wrapper.data(address, 'Create address success', 100);
  }

  async updateAddress(data) {
    const ctx = 'updateAddress';
    const document = {
      $set: {
        country: data.country,
        province: data.province,
        city: data.city,
        district: data.district,
        postcode: data.postcode,
        address: data.address,
      },
    };
    const saveAddress = await this.command.upsertOneAddress(
      { addressId: data.addressId },
      document
    );
    if (saveAddress.err) {
      logger.error(ctx, 'error', 'Internal server error', saveAddress.err);
      return wrapper.error(new InternalServerError('Internal server error'));
    }
    logger.info(ctx, 'success', 'Update address success', saveAddress.data);
    return wrapper.data(saveAddress.data, 'Update address success', 200);
  }

  async deleteAddress(data) {
    const ctx = 'deleteAddress';
    const deleteAddress = await this.command.deleteOneAddress({
      addressId: data.addressId,
    });
    if (deleteAddress.err) {
      logger.error(ctx, 'error', 'Internal server error', deleteAddress.err);
      return wrapper.error(new InternalServerError('Internal server Error'));
    }

    logger.info(ctx, 'success', 'Delete address success', '');
    return wrapper.data('', 'Delete address success', 200);
  }
}

module.exports = Address;
