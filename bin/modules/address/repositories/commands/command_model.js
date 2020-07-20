const joi = require('joi');

const createAddress = joi.object({
  country: joi.string().required(),
  province: joi.string().required(),
  city: joi.string().required(),
  district: joi.string().required(),
  postcode: joi
    .string()
    .regex(/(?=\D*\d)[0-9]{5,5}$/)
    .required(),
  address: joi.string().required(),
});

const address = () => {
  const model = {
    addressId: '',
    country: '',
    province: '',
    city: '',
    district: '',
    postcode: '',
    address: '',
  };
  return model;
};

const updateAddress = joi.object({
  addressId: joi.string().required(),
  country: joi.string().required(),
  province: joi.string().required(),
  city: joi.string().required(),
  district: joi.string().required(),
  postcode: joi
    .string()
    .regex(/(?=\D*\d)[0-9]{5,5}$/)
    .required(),
  address: joi.string().required(),
});

const addressId = joi.object({
  addressId: joi.string().required(),
});

module.exports = {
  createAddress,
  address,
  updateAddress,
  addressId,
};
