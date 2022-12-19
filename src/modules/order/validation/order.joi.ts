import Joi from "joi";

export const createOrderSchema = Joi.object().keys({
  customer: Joi.string().trim(),
  quantity: Joi.number(),
});

export const udpateOrderSchema = Joi.object().keys({
  customer: Joi.string().trim(),
  quantity: Joi.number(),
  fulfilled: Joi.boolean(),
});
