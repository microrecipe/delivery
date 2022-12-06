import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { Logger } from '@nestjs/common/services';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientPackageNames, TopicNames } from '../deliveries.enum';
import {
  DeliveryTopicPayload,
  PaymentPaidPayload,
} from '../deliveries.interface';
import { DeliveryCourier } from '../entitites/delivery-courier.entity';
import { Delivery } from '../entitites/delivery.entity';

@Injectable()
export class DeliveriesService {
  private logger = new Logger(DeliveriesService.name);

  constructor(
    @Inject(ClientPackageNames.deliveryOrderedTopic)
    private deliveryOrderedTopic: ClientKafka,
    @Inject(ClientPackageNames.deliveryRoutedTopic)
    private deliveryRoutedTopic: ClientKafka,
    @Inject(ClientPackageNames.deliveryFinishedTopic)
    private deliveryFinishedTopic: ClientKafka,
    @InjectRepository(Delivery)
    private deliveriesRepository: Repository<Delivery>,
    @InjectRepository(DeliveryCourier)
    private deliveryCouriersRepository: Repository<DeliveryCourier>,
  ) {}

  private async simulateOrderFinished(
    delivery: Delivery,
    data: PaymentPaidPayload,
  ): Promise<void> {
    delivery.deliveryStatus = 'finished';

    await this.deliveriesRepository.save(delivery);

    this.deliveryFinishedTopic.emit<any, DeliveryTopicPayload>(
      TopicNames.deliveryFinished,
      {
        order: data.order,
        timestamp: new Date(),
      },
    );

    this.logger.log(`delivery finished`);

    return;
  }

  private async simulateOrderRouted(
    delivery: Delivery,
    data: PaymentPaidPayload,
  ): Promise<void> {
    delivery.deliveryStatus = 'routed';

    await this.deliveriesRepository.save(delivery);

    this.deliveryRoutedTopic.emit<any, DeliveryTopicPayload>(
      TopicNames.deliveryRouted,
      {
        order: data.order,
        timestamp: new Date(),
      },
    );

    this.logger.log(`delivery routed`);

    setTimeout(() => {
      this.simulateOrderFinished(delivery, data);
    }, 10000);

    return;
  }

  async handlePaymentPaid(data: PaymentPaidPayload): Promise<void> {
    const courier = await this.deliveryCouriersRepository.findOneByOrFail({
      id: data.order.courier.id,
    });

    const initiateDelivery = await this.deliveriesRepository.save(
      this.deliveriesRepository.create({
        orderId: data.order.orderId,
        deliveryStatus: 'ordered',
        courier,
        address: data.order.address,
      }),
    );

    this.deliveryOrderedTopic.emit<any, DeliveryTopicPayload>(
      TopicNames.deliveryOrdered,
      {
        order: data.order,
        timestamp: new Date(),
      },
    );

    this.logger.log(`delivery ordered`);

    setTimeout(() => {
      this.simulateOrderRouted(initiateDelivery, data);
    }, 10000);

    return;
  }
}
