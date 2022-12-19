import { Schema, model, models } from "mongoose";
import { TaskTypes } from "../types/order";

const OrderSchema = new Schema({
  duration: { type: Schema.Types.String, required: true },
  task: {
    type: Schema.Types.String,
    enum: Object.values(TaskTypes),
    required: true,
  },
  customer: { type: Schema.Types.String, required: true },
  quantity: { type: Schema.Types.Number, default: 1 },
  fulfilled: { type: Schema.Types.Boolean, default: false },
});

export const Order = models.Order || model("Order", OrderSchema);
