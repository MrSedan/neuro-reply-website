"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("../config");
const libs_module_1 = require("../libs/libs.module");
const app_init_service_1 = require("./modules/initialization/app.init.service");
const user_module_1 = require("./modules/user/user.module");
const admin_module_1 = require("./admin/admin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [libs_module_1.LibsModule, user_module_1.UserModule, admin_module_1.AdminModule, typeorm_1.TypeOrmModule.forRoot(config_1.config.database)],
        controllers: [],
        providers: [app_init_service_1.AppInitService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map