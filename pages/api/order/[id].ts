import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../lib/db";
import { Order } from "../../../models/Order";
import { OrderService } from "../../../services/order";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query as { id: string };

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const order = await OrderService.fetchOrder(id);
        res.status(200).json({ success: true, data: { order } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const order = await OrderService.updateOrder(id, {
          fulfilled: req.body.fulfilled,
          item: req.body.fulfilled,
        });
        res.status(201).json({ success: true, data: { order } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        await OrderService.removeOrder(id);
        res.status(204).json({ success: true });
      } catch (error) {
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
