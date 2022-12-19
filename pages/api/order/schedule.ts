import type { NextApiRequest, NextApiResponse } from "next";

import { dbConnect } from "../../../src/lib/db";
import { OrderService } from "../../../src/modules/order/services";

export default async function orderScheduleHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const orders = await OrderService.fetchSchedule();
        res.status(200).json({ success: true, data: orders });
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
