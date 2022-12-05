import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CourierId, ICourier } from '../deliveries.interface';
import { DeliveryCouriersGrpcService } from './delivery-couriers.grpc.service';

@Controller()
export class DeliveryCouriersGrpcController {
  constructor(private readonly service: DeliveryCouriersGrpcService) {}

  @GrpcMethod('DeliveriesService')
  async getCourierById(courierId: CourierId): Promise<ICourier> {
    return await this.service.getCourierById(courierId.id);
  }
}
