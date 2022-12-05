import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'deliveries',
      protoPath: join(__dirname, '../src/proto/deliveries.proto'),
      url: `0.0.0.0:${process.env.DELIVERY_GRPC_PORT}`,
    },
  });

  app.startAllMicroservices();

  logger.log(`gRPC service running on port: ${process.env.DELIVERY_GRPC_PORT}`);

  const restPort = process.env.DELIVERY_REST_PORT || 80;

  await app.listen(restPort);

  logger.log(`HTTP service running on port: ${restPort}`);
}
bootstrap();
