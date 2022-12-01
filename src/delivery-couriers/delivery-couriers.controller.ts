import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  AddDeliveryCourierBody,
  DeliveryCouriersDTO,
} from 'src/deliveries.dto';
import { DeliveryCouriersService } from './delivery-couriers.service';

@Controller('deliveries/couriers')
export class DeliveryCouriersController {
  constructor(private readonly service: DeliveryCouriersService) {}

  @Get()
  async listDeliveryCouriers(): Promise<DeliveryCouriersDTO[]> {
    return await this.service.listDeliveryCouriers();
  }

  @Post()
  async addDeliveryCourier(
    @Body() body: AddDeliveryCourierBody,
  ): Promise<DeliveryCouriersDTO> {
    return await this.service.addDeliveryCourier({
      name: body.name,
      shippingCost: body.shipping_cost,
    });
  }
}
