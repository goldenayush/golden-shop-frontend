export interface IOrderItem {
  [key: string]: any;
}

export interface IProduct {
  [key: string]: any;
}

export interface IAddress {
  [key: string]: any;
}

export interface IOrder {
  OrderItem?: IOrderItem[];
  shippingAddress?: IAddress;
  billingAddress?: IAddress;
  [key: string]: any;
}
