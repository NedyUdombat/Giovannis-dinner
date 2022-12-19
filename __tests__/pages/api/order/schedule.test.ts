import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { createMocks, RequestMethod } from "node-mocks-http";
import { dbConnect } from "../../../../src/lib/db";

import orderScheduleHandler from "../../../../pages/api/order/schedule";

describe("API function", () => {
  const mockRequestResponse = (method: RequestMethod = "GET") => {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } =
      createMocks({ method });
    return { req, res };
  };

  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should return all orders", async () => {
    const { req, res } = mockRequestResponse("GET");
    await orderScheduleHandler(req, res);

    expect(res.statusCode).toEqual(200);
  });

  it("should return an error if method does not exist", async () => {
    const { req, res } = mockRequestResponse("PUT");
    const response = { success: false, error: "This method is not allowed" };

    await orderScheduleHandler(req, res);

    expect(res.statusCode).toEqual(405);
    expect(res._getJSONData()).toMatchObject(response);
  });
});
