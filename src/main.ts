import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as process from 'process';

async function bootstrap() {
  // dotenv
  config();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ credentials: true, origin: true });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`Main service available on PORT: ${PORT}`);
  });
}
bootstrap();
