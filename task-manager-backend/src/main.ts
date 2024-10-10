import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORS aktivieren
  await app.listen(3000);
}
bootstrap();

//Durch app.enableCors() erlaubt dein NestJS-Backend Anfragen von anderen Domains,
//einschließlich der, die vom Angular-Frontend kommt (localhost:4200).
