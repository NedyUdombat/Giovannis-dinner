import { Order } from "../models/Order";
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
  Order.find({ fulfilled: false }).lean().exec();

const fetchOrder = (id: string) => Order.findById(id).exec();

const createOrder = (order: OrderReqObj) => {
  const newOrder = new Order({
    duration: getDuration(order.task),
    task: order.task,
    customer: order.customer,
    quantity: order.quantity,
  });

  return newOrder.save();
};

const updateOrder = (orderId: string, orderObject: any) =>
  Order.findByIdAndUpdate(
    {
      _id: orderId,
    },
    {
      fulfilled: orderObject.fulfilled,
      item: orderObject.fulfilled,
    }
  );

const removeOrder = (orderId: string) => Order.remove(orderId);

const OrderService = {
  fetchFulFilledOrders,
  fetchOrder,
  createOrder,
  updateOrder,
  removeOrder,
};

export { OrderService };
