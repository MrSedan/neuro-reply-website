import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swagger(app: INestApplication): INestApplication {
    const config = new DocumentBuilder().setTitle('Neuro website').setDescription('Some description').setVersion('0.1').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    return app;
}
