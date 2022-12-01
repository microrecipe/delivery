import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { DeliveryCouriersDTO } from 'src/deliveries.dto';
import { Repository } from 'typeorm';
import { DeliveryCourier } from './delivery-couriers.entity';

@Injectable()
export class DeliveryCouriersService {
  constructor(
    @InjectRepository(DeliveryCourier)
    private deliveryCouriersRepository: Repository<DeliveryCourier>,
  ) {}

  async listDeliveryCouriers(): Promise<DeliveryCouriersDTO[]> {
    const couriers = await this.deliveryCouriersRepository.find();

    return couriers.map((courier) => DeliveryCouriersDTO.toDTO(courier));
  }
}
