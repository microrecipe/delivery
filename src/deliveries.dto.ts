import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { AddDeliveryCourierData } from './deliveries.interface';
import { DeliveryCourier } from './entitites/delivery-courier.entity';

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

export class AddDeliveryCourierBody implements AddDeliveryCourierData {
  @IsString()
  name: string;

  @IsNumber()
  @Expose({ name: 'shipping_cost' })
  shippingCost: number;
}
