import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function buildSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('MFOS Backend API')
    .setDescription(
      'Multi-tenant Food Ordering System backend API.\n\n' +
      'All protected endpoints require a Bearer JWT token.\n' +
      'Obtain a token via `POST /api/auth/login` or `POST /api/auth/register`, ' +
      'then click **Authorize** and enter `Bearer <token>`.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .build();
}

export function setupSwagger(app: INestApplication): void {
  const document = SwaggerModule.createDocument(app, buildSwaggerConfig());
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
}
