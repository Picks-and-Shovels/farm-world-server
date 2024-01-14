import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class APIDocumentation {
  public builder;

  constructor() {
    this.builder = new DocumentBuilder();
  }

  initializeOptions() {
    return this.builder
      .setTitle(process.env.npm_package_name)
      .setVersion(process.env.npm_package_version)
      .setDescription('NEST APIS')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      })
      .build();
  }

  setup(app) {
    const documentOptions = this.initializeOptions();
    const document = SwaggerModule.createDocument(app, documentOptions);

    // Swagger는 아래의 url로 들어갈 수 있음.
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });
  }
}
