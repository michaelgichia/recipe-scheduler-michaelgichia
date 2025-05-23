import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'entry-exit-queue',
        queueOptions: {
          durable: false,
        },
        prefetchCount: 1,
        persistent: true,
        noAck: false,
        socketOptions: {
          keepAlive: true,
        },
      },
    },
  );
  await app.listen();
}
bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
