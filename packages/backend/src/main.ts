import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3001,
      },
    },
  );

  await app.listen();
  console.log(`🚀 Backend service running on port 3001`);
}

bootstrap().catch((error) => {
  console.error('Failed to start Backend Service:', error);
  process.exit(1);
});
