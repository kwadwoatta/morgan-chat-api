import { RpcExceptionFilter } from '@app/common/filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new RpcExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Morgan Chat API')
    .setDescription(
      'API for the Morgan Chat application, a tool for simplifying financial documents',
    )
    .setVersion('1.0')
    .addTag('Morgan Chat API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
