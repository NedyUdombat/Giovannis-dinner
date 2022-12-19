import { OrderModel } from "../models";
import { TaskTypes, OrderReqObj } from "../types/order.d";

const getDuration = (task: TaskTypes) => {
  switch (task) {
    case TaskTypes.MAKE:
      return "02:30";
    case TaskTypes.SERVE:
      return "01:00";
    case TaskTypes.BREAK:
      return "03:00";
    default:
      throw Error(`Task ${task} does not exist`);
  }
};

const fetchFulFilledOrders = () =>
  OrderModel.find({ fulfilled: false }).lean().exec();

const fetchOrder = (id: string) => OrderModel.findOne({ _id: id }).exec();

const createOrder = (order: OrderReqObj) => {
  const newOrder = new OrderModel({
    duration: getDuration(order.task),
    task: TaskTypes.MAKE,
    customer: order.customer,
    quantity: order.quantity,
  });

  return newOrder.save();
};

const updateOrder = (orderId: string, orderObject: any) =>
  OrderModel.findOneAndUpdate(
    {
      _id: orderId,
    },
    orderObject
  );

const removeOrder = (orderId: string) => OrderModel.remove({ _id: orderId });

const OrderService = {
  fetchFulFilledOrders,
  fetchOrder,
  createOrder,
  updateOrder,
  removeOrder,
};

export { OrderService };
