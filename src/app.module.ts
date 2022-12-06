import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryCouriersController } from './delivery-couriers/delivery-couriers.controller';
import { DeliveryCourier } from './entitites/delivery-courier.entity';
import { DeliveryCouriersService } from './delivery-couriers/delivery-couriers.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { DeliveryCouriersGrpcController } from './delivery-couriers/delivery-couriers.grpc.controller';
import { DeliveryCouriersGrpcService } from './delivery-couriers/delivery-couriers.grpc.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientPackageNames } from './deliveries.enum';
import { Delivery } from './entitites/delivery.entity';
import { DeliveriesService } from './deliveries/deliveries.service';
import { DeliveriesController } from './deliveries/deliveries.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: ClientPackageNames.deliveryOrderedTopic,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'microrecipe',
            brokers: process.env.KAFKA_BROKERS.split(','),
          },
        },
      },
      {
        name: ClientPackageNames.deliveryRoutedTopic,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'microrecipe',
            brokers: process.env.KAFKA_BROKERS.split(','),
          },
        },
      },
      {
        name: ClientPackageNames.deliveryFinishedTopic,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'microrecipe',
            brokers: process.env.KAFKA_BROKERS.split(','),
          },
        },
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DELIVERY_DB_HOST'),
        port: Number(configService.get('DELIVERY_DB_PORT')),
        username: configService.get('DELIVERY_DB_USERNAME'),
        password: configService.get('DELIVERY_DB_PASSWORD'),
        database: configService.get('DELIVERY_DB_NAME'),
        entities: [__dirname + './**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([DeliveryCourier, Delivery]),
  ],
  controllers: [
    DeliveryCouriersController,
    DeliveryCouriersGrpcController,
    DeliveriesController,
  ],
  providers: [
    DeliveryCouriersService,
    JwtStrategy,
    DeliveryCouriersGrpcService,
    DeliveriesService,
  ],
})
export class AppModule {}
