import type { NextApiRequest, NextApiResponse } from "next";

import { dbConnect } from "@lib";
import { OrderService } from "@order";

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
        res.status(200).json({ success: true, data: { orders } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const order = await OrderService.createOrder({
          customer: req.body.customer,
          quantity: req.body.quantity,
        });
        res.status(201).json({ success: true, data: { order } });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res
        .status(400)
        .json({ success: false, error: "This method is not allowed" });
      break;
  }
}
