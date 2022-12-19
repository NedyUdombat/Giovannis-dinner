import { OrderReqObj } from "../modules";

export const validateSchema = async (
  body: OrderReqObj,
  schema: { validate: (arg0: OrderReqObj) => any }
) => {
  const status = schema.validate(body);

  if (status.error) {
    const error = status?.error?.details.map(
      (item: { message: any }) => item.message
    );
    throw Error(JSON.stringify(error[0]));
  }
};
