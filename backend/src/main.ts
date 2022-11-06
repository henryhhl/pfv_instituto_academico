import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function main() {
  const app = await NestFactory.create(AppModule);

  app.use( bodyParser.json( { limit: '150mb', }, ) );
  app.use( bodyParser.urlencoded( { limit: '150mb', extended: true, } ) );
  app.enableCors();

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe( {
      whitelist: true,
      forbidNonWhitelisted: true,
    } ),
  );
  await app.listen( process.env.PORT || 5000 );
}
main();
