import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Use cookie-parser middleware
  app.use(cookieParser());

  // Set up global validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Set a global prefix for your API
  app.setGlobalPrefix('api');

  // Serve static assets from the 'uploads' directory
  app.use('/uploads', express.static('uploads'));

  // Enable shutdown hooks
  await app.enableShutdownHooks();

  // Listen on port 8000
  await app.listen(8000);
}
bootstrap();
