import { Controller, Get } from '@nestjs/common';
import { DeliveryCouriersDTO } from 'src/deliveries.dto';
import { DeliveryCouriersService } from './delivery-couriers.service';

@Controller('deliveries/couriers')
export class DeliveryCouriersController {
  constructor(private readonly service: DeliveryCouriersService) {}

  @Get()
  async listDeliveryCouriers(): Promise<DeliveryCouriersDTO[]> {
    return await this.service.listDeliveryCouriers();
  }
}
