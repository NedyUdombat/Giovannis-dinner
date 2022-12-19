import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

import { OrderModel } from "../models";
import { TaskTypes, OrderReqObj } from "../types/order.d";

const tasks = [
  { taskType: TaskTypes.MAKE, duration: "02:30" },
  { taskType: TaskTypes.SERVE, duration: "01:00" },
];

const fetchFulFilledOrders = async () => {
  const orders = await OrderModel.find({ fulfilled: false }).lean();

  if (!orders.length) {
    return [];
  }

  return { orders };
};

const fetchSchedule = async () => {
  const orders = await OrderModel.find({ fulfilled: false }).lean();

  if (!orders.length) {
    return [];
  }

  const now = dayjs();

  const updatedOrders = orders.map((order, index) => {
    const timeline =
      index === 0
        ? now
        : order.task === TaskTypes.SERVE
        ? orders[index - 1].timeline.add(
            150 * orders[index - 1].quantity,
            "second"
          )
        : orders[index - 1].timeline.add(
            60 * orders[index - 1].quantity,
            "second"
          );
    order.timeline = timeline;
    order.sn = index + 1;

    return order;
  });

  updatedOrders.push({
    _id: uuidv4(),
    task: "Take a Break",
    sn: updatedOrders.length + 1,
  });

  return { orders: updatedOrders };
};

const fetchOrder = (id: string) => OrderModel.findOne({ _id: id });

const createOrder = async (order: OrderReqObj) => {
  const result = await OrderModel.create({
    task: TaskTypes.MAKE,
    duration: tasks.find((task) => task.taskType === TaskTypes.MAKE)?.duration,
    customer: order.customer,
    quantity: order.quantity,
  }).then(async (res) => {
    const serveOrder = await OrderModel.create({
      task: TaskTypes.SERVE,
      duration: tasks.find((task) => task.taskType === TaskTypes.SERVE)
        ?.duration,
      customer: order.customer,
      quantity: order.quantity,
    });

    return [res, serveOrder];
  });

  return result;
};

const updateOrder = (orderId: string, orderObject: any) =>
  OrderModel.findOneAndUpdate(
    {
      _id: orderId,
    },
    orderObject,
    { new: true }
  );

const removeOrder = (orderId: string) => OrderModel.deleteOne({ _id: orderId });

const OrderService = {
  fetchFulFilledOrders,
  fetchSchedule,
  fetchOrder,
  createOrder,
  updateOrder,
  removeOrder,
};

export { OrderService };
