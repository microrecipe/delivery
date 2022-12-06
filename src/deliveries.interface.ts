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
export interface IDelivery {
  id?: number;
  orderId?: number;
  deliveryStatus?: any;
  courier?: any;
  address?: string;
}

export type OrderStatus = 'placed' | 'routed' | 'finished' | 'paid';

export interface IOrder {
  id?: number;
  userId?: number;
  orderStatus?: OrderStatus | string;
  createdAt?: Date;
  updateAt?: Date;
}

export interface INutrition {
  id?: number;
  name?: string;
  perGram?: string;
  ingredientId?: number;
}

export interface IIngredient {
  id?: number;
  name?: string;
  quantity?: number;
  unit?: string;
  price?: number;
  nutritions?: INutrition[];
  recipeId?: number;
}

export interface IOrderItem {
  id?: number;
  ingredient?: IIngredient;
  order?: IOrder;
  price?: number;
  quantity?: number;
}

export interface IPaymentMethod {
  id?: number;
  name?: string;
}

export interface OrderPlacedPayload {
  orderId: number;
  cartItems: Array<IOrderItem>;
  courier: ICourier;
  paymentMethod: IPaymentMethod;
  userId: number;
  address: string;
  timestamp: Date;
}

export interface PaymentPaidPayload {
  paymentId: number;
  order: OrderPlacedPayload;
  timestamp: Date;
}

export interface DeliveryTopicPayload {
  order: OrderPlacedPayload;
  timestamp: Date;
}
