import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3003,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3003);

  console.log('🔨 Worker Service started');
  console.log('📡 Microservice listening on port 3003');
  console.log('⚡ BullMQ workers are processing jobs...');
}

bootstrap().catch((error) => {
  console.error('Failed to start Backend Service:', error);
  process.exit(1);
});
