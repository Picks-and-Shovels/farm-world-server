import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APIDocumentation } from './document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = new APIDocumentation();
  document.setup(app);

  await app.listen(3000);
}
bootstrap();
