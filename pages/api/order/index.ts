import type { NextApiRequest, NextApiResponse } from "next";

import { dbConnect } from "@lib";
import { createOrderSchema, OrderService, OrderReqObj } from "@order";

const validateOrder = async (body: OrderReqObj) => {
  const status = createOrderSchema.validate(body);

  const error = status?.error?.details.map((item) => item.message);

  throw Error(JSON.stringify(error[0]));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const orders = await OrderService.fetchFulFilledOrders();
        res.status(200).json({ success: true, data: orders });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        await validateOrder(req.body);
        const order = await OrderService.createOrder({
          customer: req.body.customer,
          quantity: req.body.quantity,
        });
        res.status(201).json({ success: true, data: { order } });
      } catch (error: any) {
        res
          .status(400)
          .json({ success: false, error: error?.message || "An erro occured" });
      }
      break;
    default:
      res
        .status(400)
        .json({ success: false, error: "This method is not allowed" });
      break;
  }
}
