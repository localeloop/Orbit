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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, user) {
        if (user && user.role !== 'admin') {
            throw new common_1.ForbiddenException('Only admins can create users');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 12);
        return this.prisma.$transaction(async (tx) => {
            const createdUser = await tx.user.create({
                data: {
                    email: dto.email,
                    passwordHash: hashedPassword,
                    role: dto.role || 'viewer',
                    tenantId: dto.tenantId,
                },
                select: {
                    id: true,
                    email: true,
                    tenantId: true,
                    role: true,
                    createdAt: true,
                },
            });
            await tx.auditLog.create({
                data: {
                    action: 'CREATE_USER',
                    performedById: user?.id || null,
                    tenantId: dto.tenantId,
                    metadata: {
                        createdUserId: createdUser.id,
                        createdUserEmail: createdUser.email,
                    },
                },
            });
            return createdUser;
        });
    }
    async findAll(user) {
        return this.prisma.user.findMany({
            where: { tenantId: user.tenantId },
            select: {
                id: true,
                email: true,
                tenantId: true,
                role: true,
                createdAt: true,
            },
        });
    }
    async findOne(id, user) {
        const found = await this.prisma.user.findFirst({
            where: { id, tenantId: user.tenantId },
            select: {
                id: true,
                email: true,
                tenantId: true,
                role: true,
                createdAt: true,
            },
        });
        if (!found)
            throw new common_1.NotFoundException('User not found or access denied');
        return found;
    }
    async update(id, dto, user) {
        const existing = await this.findOne(id, user);
        let data = { ...dto };
        if (dto.password) {
            data.passwordHash = await bcrypt.hash(dto.password, 12);
            delete data.password;
        }
        return this.prisma.user.update({
            where: { id: existing.id },
            data,
            select: {
                id: true,
                email: true,
                tenantId: true,
                role: true,
                createdAt: true,
            },
        });
    }
    async remove(id, user) {
        const existing = await this.findOne(id, user);
        return this.prisma.user.delete({
            where: { id: existing.id },
            select: {
                id: true,
                email: true,
                tenantId: true,
                role: true,
                createdAt: true,
            },
        });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map