import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { DeliveryCouriersDTO } from 'src/deliveries.dto';
import { AddDeliveryCourierData } from 'src/deliveries.interface';
import { Repository } from 'typeorm';
import { DeliveryCourier } from '../entitites/delivery-courier.entity';

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

  async addDeliveryCourier(
    data: AddDeliveryCourierData,
  ): Promise<DeliveryCouriersDTO> {
    const courier = await this.deliveryCouriersRepository.save(
      this.deliveryCouriersRepository.create({
        name: data.name,
        shippingCost: data.shippingCost,
      }),
    );

    return DeliveryCouriersDTO.toDTO(courier);
  }

  async deleteDeliveryCourier(id: number): Promise<DeliveryCouriersDTO> {
    const courier = await this.deliveryCouriersRepository.findOneByOrFail({
      id,
    });

    await this.deliveryCouriersRepository.remove(courier);

    return DeliveryCouriersDTO.toDTO(courier);
  }
}
