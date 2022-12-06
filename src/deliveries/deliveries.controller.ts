import { Controller } from '@nestjs/common/decorators';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TopicNames } from '../deliveries.enum';
import { PaymentPaidPayload } from '../deliveries.interface';
import { DeliveriesService } from './deliveries.service';

@Controller()
export class DeliveriesController {
  constructor(private readonly service: DeliveriesService) {}

  @EventPattern(TopicNames.paymentPaid)
  async handlePaymentPaid(@Payload() payload: PaymentPaidPayload) {
    return await this.service.handlePaymentPaid(payload);
  }
}
