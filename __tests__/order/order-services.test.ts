const mockingoose = require("mockingoose");

import { OrderModel, OrderService } from "../../src/modules";

describe("Order service", () => {
  describe("fetch all unfulfilled orders", () => {
    it("should return the list of all unfulfilled orders", async () => {
      mockingoose(OrderModel).toReturn(
        [
          {
            _id: "63a054d250bce3490adfc8de",
            duration: "02:30",
            task: "SERVE",
            customer: "Andrew",
            fulfilled: false,
            __v: 0,
          },
        ],
        "find"
      );
      const results = await OrderService.fetchFulFilledOrders();
      expect(results[0].customer).toBe("Andrew");
    });
  });
  describe("fetch a single order", () => {
    it("should return a single order", async () => {
      const respObj = {
        _id: "63a054d250bce3490adfc8de",
        duration: "02:30",
        task: "MAKE",
        customer: "Andrew",
        item: "Toast",
        fulfilled: false,
        __v: 0,
      };
      mockingoose(OrderModel).toReturn(respObj, "findOne");
      const results = await OrderService.fetchOrder("63a054d250bce3490adfc8de");
      expect(results._id.toString()).toEqual(respObj._id);
    });
  });

  describe("Update an order", () => {
    it("should return a single order", async () => {
      const respObj = {
        _id: "63a054d250bce3490adfc8de",
        duration: "02:30",
        task: "MAKE",
        customer: "Andrew",
        quantity: 1,
        fulfilled: true,
        __v: 0,
      };
      mockingoose(OrderModel).toReturn(respObj, "findOneAndUpdate");
      const results = await OrderService.updateOrder(
        "63a054d250bce3490adfc8de",
        { fulfilled: true }
      );
      expect(results.fulfilled).toEqual(respObj.fulfilled);
    });
  });
  describe("Remove an order", () => {
    it("should return the list of all unfulfilled orders", async () => {
      const resObject = { acknowledged: true, deletedCount: 1 };
      mockingoose(OrderModel).toReturn(resObject, "remove");
      const results = await OrderService.removeOrder(
        "63a054d250bce3490adfc8de"
      );
      expect(results).toMatchObject(resObject);
    });
  });
});
