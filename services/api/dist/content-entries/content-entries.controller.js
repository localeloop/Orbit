"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentEntriesController = void 0;
const common_1 = require("@nestjs/common");
const content_entries_service_1 = require("./content-entries.service");
const create_content_entry_dto_1 = require("./dto/create-content-entry.dto");
const update_content_entry_dto_1 = require("./dto/update-content-entry.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ContentEntriesController = class ContentEntriesController {
    contentEntriesService;
    constructor(contentEntriesService) {
        this.contentEntriesService = contentEntriesService;
    }
    create(dto, req) {
        return this.contentEntriesService.create(dto, req.user);
    }
    findAll(req) {
        return this.contentEntriesService.findAll(req.user);
    }
    findOne(id, req) {
        return this.contentEntriesService.findOne(id, req.user);
    }
    update(id, dto, req) {
        return this.contentEntriesService.update(id, dto, req.user);
    }
    remove(id, req) {
        return this.contentEntriesService.remove(id, req.user);
    }
};
exports.ContentEntriesController = ContentEntriesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_content_entry_dto_1.CreateContentEntryDto, Object]),
    __metadata("design:returntype", void 0)
], ContentEntriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContentEntriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ContentEntriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_content_entry_dto_1.UpdateContentEntryDto, Object]),
    __metadata("design:returntype", void 0)
], ContentEntriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ContentEntriesController.prototype, "remove", null);
exports.ContentEntriesController = ContentEntriesController = __decorate([
    (0, common_1.Controller)('content-entries'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [content_entries_service_1.ContentEntriesService])
], ContentEntriesController);
//# sourceMappingURL=content-entries.controller.js.map