import { INestApplication } from "@nestjs/common";

export const enableCors = (app: INestApplication) => {
    const allowedOrigins = process.env["FRONTEND_URLS"] 
      ? process.env["FRONTEND_URLS"].split(',').map(url => url.trim())
      : ['http://localhost:4200', 'http://localhost:3000'];
    
    return app.enableCors({
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-HTTP-Method-Override'],
      origin: allowedOrigins,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      credentials: true,
    });
}