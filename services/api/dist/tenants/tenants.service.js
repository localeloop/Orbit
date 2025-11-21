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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TenantsService = class TenantsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, user) {
        if (user && user.role !== 'admin') {
            throw new common_1.ForbiddenException('Only global admins can create tenants');
        }
        return this.prisma.tenant.create({
            data: {
                name: dto.name,
                plan: dto.plan || 'free',
            },
        });
    }
    async findAll(user) {
        if (user) {
            return this.prisma.tenant.findMany({
                where: { id: user.tenantId },
            });
        }
        return this.prisma.tenant.findMany();
    }
    async findOne(id, user) {
        const tenant = await this.prisma.tenant.findUnique({ where: { id } });
        if (!tenant)
            throw new common_1.NotFoundException('Tenant not found');
        if (user && user.tenantId !== id && user.role !== 'admin') {
            throw new common_1.ForbiddenException('Access denied');
        }
        return tenant;
    }
    async update(id, dto, user) {
        await this.findOne(id, user);
        return this.prisma.tenant.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id, user) {
        await this.findOne(id, user);
        return this.prisma.tenant.delete({ where: { id } });
    }
};
exports.TenantsService = TenantsService;
exports.TenantsService = TenantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TenantsService);
//# sourceMappingURL=tenants.service.js.map