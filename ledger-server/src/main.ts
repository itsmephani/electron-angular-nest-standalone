import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
    console.log('server-started');
    process.send &&
      process.send({
        type: 'SERVER_STARTED',
        message: 'Server started at 3000',
      });
  });
}
bootstrap();
