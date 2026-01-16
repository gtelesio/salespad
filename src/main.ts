import { NestFactory } from '@nestjs/core';
import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
