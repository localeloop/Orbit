/**
 * main.ts
 * 
 * Entry point for the NestJS application.
 * Configures the application, sets up Swagger API documentation, 
 * and applies global validation pipes for all incoming requests.
 * Starts the server on PORT 3000 Dev Server.
 * Production runs on a secure PORT
 * 
 * @author Joshua Rene Burger
 * @version 0.01
 * @date 14-10-2025
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Orbit API')
    .setDescription('API Documentation for Orbit CMS')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
  console.log('📘 Swagger Docs available at http://localhost:3000/docs');
}

bootstrap();
