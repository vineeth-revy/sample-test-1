import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
  .setTitle("Sample project")
  .setDescription("This is a sample project")
  .setVersion("1.0.0")
  .addTag("Products")
  .build();

  const document = SwaggerModule.createDocument(app,options);

  SwaggerModule.setup('api',app,document);

  await app.listen(3000);

}
bootstrap();
