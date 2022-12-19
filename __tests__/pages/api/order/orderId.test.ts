import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { createMocks, RequestMethod } from "node-mocks-http";
import { dbConnect } from "../../../../src/lib/db";

import orderIdHandler from "../../../../pages/api/order/[id]";

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

  it("should return single order", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = { id: "63a0cc13ad7dc3069127a2b1" };
    await orderIdHandler(req, res);

    expect(res.statusCode).toEqual(200);
  });

  it("should update an order", async () => {
    const { req, res } = mockRequestResponse("PUT");
    req.body = {
      fulfilled: true,
    };
    req.query = { id: "63a0cc13ad7dc3069127a2b1" };
    await orderIdHandler(req, res);

    expect(res.statusCode).toEqual(201);
  });

  it("should fail to update order if req object is not valid", async () => {
    const { req, res } = mockRequestResponse("PUT");
    req.body = {
      fulfilled: "a customer",
      quantity: "eee",
    };
    req.query = { id: "63a0cc13ad7dc3069127a2b1" };
    await orderIdHandler(req, res);

    expect(res.statusCode).toEqual(400);
  });

  it("should delete single order", async () => {
    const { req, res } = mockRequestResponse("DELETE");
    req.query = { id: "63a0cc13ad7dc3069127a2b1" };
    await orderIdHandler(req, res);

    expect(res.statusCode).toEqual(204);
  });

  it("should return an error if method does not exist", async () => {
    const { req, res } = mockRequestResponse("POST");
    const response = { success: false, error: "This method is not allowed" };

    await orderIdHandler(req, res);

    expect(res.statusCode).toEqual(405);
    expect(res._getJSONData()).toMatchObject(response);
  });
});
