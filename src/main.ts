import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from '@shared/infrastructure/interceptors/response.interceptor';

async function bootstrap() {
    const app: NestExpressApplication = await NestFactory.create(AppModule);

    app.useGlobalInterceptors(new ResponseInterceptor());

    const openApiConfig = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Mail Parser API')
        .setDescription(
            'This is an API to parse emails and extract data from them.',
        )
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, openApiConfig);
    SwaggerModule.setup('api-docs', app, document);

    const config: ConfigService = app.get(ConfigService);
    const port: number = config.get<number>('APP_PORT');

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
        );
        res.header('Access-Control-Allow-Credentials', true);

        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }
    });

    await app.listen(port, () => {
        console.info(
            '[Endpoint] 🚀 Application running on: ',
            config.get<string>('BASE_URL'),
        );
        console.info(
            '[OpenApi] 📖 Endpoint specification running on: ',
            config.get<string>('OPENAPI_URL'),
        );
    });
}
bootstrap();
