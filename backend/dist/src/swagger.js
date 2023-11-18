"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swagger = void 0;
const swagger_1 = require("@nestjs/swagger");
function swagger(app) {
    const config = new swagger_1.DocumentBuilder().setTitle('Neuro website').setDescription('Some description').setVersion('0.1').build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    return app;
}
exports.swagger = swagger;
//# sourceMappingURL=swagger.js.map