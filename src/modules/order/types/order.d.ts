export enum TaskTypes {
  MAKE = "MAKE",
  SERVE = "SERVE",
  BREAK = "BREAK",
}

export interface OrderReqObj {
  customer: string;
  quantity: number; 
}