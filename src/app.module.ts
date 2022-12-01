import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryCouriersController } from './delivery-couriers/delivery-couriers.controller';
import { DeliveryCourier } from './delivery-couriers/delivery-couriers.entity';
import { DeliveryCouriersService } from './delivery-couriers/delivery-couriers.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    TypeOrmModule.forFeature([DeliveryCourier]),
  ],
  controllers: [DeliveryCouriersController],
  providers: [DeliveryCouriersService, JwtStrategy],
})
export class AppModule {}
