import type { NextApiRequest, NextApiResponse } from "next";

import { dbConnect } from "../../../src/lib/db";
import { validateSchema } from "../../../src/lib/validate";
import { OrderService } from "../../../src/modules/order/services";
import { createOrderSchema } from "../../../src/modules/order/validation/order.joi";

export default async function orderHandler(
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
        await validateSchema(req.body, createOrderSchema);
        const order = await OrderService.createOrder({
          customer: req.body.customer,
          quantity: req.body.quantity,
        });
        res.status(201).json({ success: true, data: { order } });
      } catch (error: any) {
        res
          .status(400)
          .json({ success: false, error: error?.message || "An error occured" });
      }
      break;
    default:
      res
        .status(405)
        .json({ success: false, error: "This method is not allowed" });
      break;
  }
}
