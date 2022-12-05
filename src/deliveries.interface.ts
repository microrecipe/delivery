export class AddDeliveryCourierData {
  name: string;

  shippingCost: number;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface ICourier {
  id?: number;
  name?: string;
  shippingCost?: number;
}

export interface CourierId {
  id: number;
}
