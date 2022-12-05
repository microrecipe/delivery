import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICourier } from '../deliveries.interface';
import { DeliveryCourier } from '../entitites/delivery-courier.entity';

@Injectable()
export class DeliveryCouriersGrpcService {
  constructor(
    @InjectRepository(DeliveryCourier)
    private deliveryCouriersRepository: Repository<DeliveryCourier>,
  ) {}

  async getCourierById(courierId: number): Promise<ICourier> {
    return await this.deliveryCouriersRepository.findOneByOrFail({
      id: courierId,
    });
  }
}
