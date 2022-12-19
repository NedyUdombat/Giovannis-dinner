import type { NextApiRequest, NextApiResponse } from "next";

import { dbConnect } from "../../../src/lib/db";
import { validateSchema } from "../../../src/lib/validate";
import { OrderService } from "../../../src/modules/order/services";
import { udpateOrderSchema } from "../../../src/modules/order/validation/order.joi";

export default async function orderIdHandler(
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
        await validateSchema(req.body, udpateOrderSchema);
        const order = await OrderService.updateOrder(id, {
          fulfilled: req.body.fulfilled,
          quantity: req.body.quantity,
        });
        res.status(201).json({ success: true, data: { order } });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error?.message || "An error occured",
        });
      }
      break;
    case "DELETE":
      try {
        const result = await OrderService.removeOrder(id);
        res.status(204).json({ success: true, result });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res
        .status(405)
        .json({ success: false, error: "This method is not allowed" });
      break;
  }
}
