import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth.guard';
import {
  AddDeliveryCourierBody,
  DeliveryCouriersDTO,
} from 'src/deliveries.dto';
import { DeliveryCouriersService } from './delivery-couriers.service';

@Controller('deliveries/couriers')
@UseInterceptors(ClassSerializerInterceptor)
export class DeliveryCouriersController {
  constructor(private readonly service: DeliveryCouriersService) {}

  @Get()
  async listDeliveryCouriers(): Promise<DeliveryCouriersDTO[]> {
    return await this.service.listDeliveryCouriers();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addDeliveryCourier(
    @Body() body: AddDeliveryCourierBody,
  ): Promise<DeliveryCouriersDTO> {
    return await this.service.addDeliveryCourier({
      name: body.name,
      shippingCost: body.shippingCost,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteDeliveryCourier(
    @Param('id') id: number,
  ): Promise<DeliveryCouriersDTO> {
    return await this.service.deleteDeliveryCourier(id);
  }
}
