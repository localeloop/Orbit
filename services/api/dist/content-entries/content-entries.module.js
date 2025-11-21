"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentEntriesModule = void 0;
const common_1 = require("@nestjs/common");
const content_entries_service_1 = require("./content-entries.service");
const content_entries_controller_1 = require("./content-entries.controller");
let ContentEntriesModule = class ContentEntriesModule {
};
exports.ContentEntriesModule = ContentEntriesModule;
exports.ContentEntriesModule = ContentEntriesModule = __decorate([
    (0, common_1.Module)({
        controllers: [content_entries_controller_1.ContentEntriesController],
        providers: [content_entries_service_1.ContentEntriesService],
    })
], ContentEntriesModule);
//# sourceMappingURL=content-entries.module.js.map