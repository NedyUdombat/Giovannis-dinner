export enum TaskTypes {
  MAKE = "MAKE",
  SERVE = "SERVE",
}

export interface OrderReqObj {
  customer: string;
  quantity: number;
}
