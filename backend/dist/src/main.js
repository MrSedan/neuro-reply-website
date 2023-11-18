"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("../config");
const app_module_1 = require("./app.module");
const swagger_1 = require("./swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log', 'debug', 'error', 'warn', 'verbose'],
    });
    (0, swagger_1.swagger)(app);
    await app.listen(config_1.config.server.port, () => common_1.Logger.log(`Server started on port ${config_1.config.server.port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map