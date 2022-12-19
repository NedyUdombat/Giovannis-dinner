import Joi from "joi";

export const createOrderSchema = Joi.object().keys({
  customer: Joi.string().trim(),
  quantity: Joi.string().trim(),
});

export const udpateOrderSchema = Joi.object().keys({
  customer: Joi.string().trim(),
  quantity: Joi.string().trim(),
});
