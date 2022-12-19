import { Schema, model, models } from "mongoose";
import { TaskTypes } from "../types/order.d";

const OrderSchema = new Schema(
  {
    duration: { type: Schema.Types.String, required: true },
    task: {
      type: Schema.Types.String,
      enum: Object.values(TaskTypes),
      required: true,
    },
    meal: { type: Schema.Types.String, default: "Sandwich" },
    customer: { type: Schema.Types.String, required: true },
    quantity: { type: Schema.Types.Number, default: 1 },
    fulfilled: { type: Schema.Types.Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = models.Order || model("Order", OrderSchema);
