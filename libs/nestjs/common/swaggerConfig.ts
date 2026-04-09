import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const createSwaggerConfig = (app: any, tittle: string, version: string, description: string, server: string) => {
  const config = new DocumentBuilder()
    .setTitle(tittle)
    .setDescription(description)
    .setVersion(version)
    // aqui igual, el nombre de la app
    .addServer(server)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  //aqui deberia poner en api, el nombre de la app
  SwaggerModule.setup('api', app, document);
};
