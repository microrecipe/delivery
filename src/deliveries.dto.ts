import { Expose } from 'class-transformer';
import { DeliveryCourier } from './delivery-couriers/delivery-couriers.entity';

export class DeliveryCouriersDTO {
  static toDTO(courier: DeliveryCourier) {
    const res = new DeliveryCouriersDTO();

    res.id = courier.id;
    res.name = courier.name;
    res.shippingCost = courier.shippingCost;

    return res;
  }
  id: number;

  name: string;

  @Expose({ name: 'shipping_cost' })
  shippingCost: number;
}
