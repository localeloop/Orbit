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
exports.ContentEntriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContentEntriesService = class ContentEntriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, user) {
        const website = await this.prisma.website.findFirst({
            where: {
                id: data.websiteId,
                tenantId: user.tenantId,
            },
        });
        if (!website) {
            throw new common_1.NotFoundException('Website not found or access denied');
        }
        return this.prisma.contentEntry.create({
            data: {
                websiteId: data.websiteId,
                key: data.key,
                locale: data.locale || 'en',
                content: data.content,
                version: data.version || 1,
            },
        });
    }
    async findAll(user) {
        return this.prisma.contentEntry.findMany({
            where: {
                website: {
                    tenantId: user.tenantId,
                },
            },
        });
    }
    async findOne(id, user) {
        const entry = await this.prisma.contentEntry.findUnique({
            where: { id },
            include: { website: true },
        });
        if (!entry)
            throw new common_1.NotFoundException('Content entry not found');
        if (entry.website.tenantId !== user.tenantId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return entry;
    }
    async update(id, dto, user) {
        const entry = await this.findOne(id, user);
        return this.prisma.contentEntry.update({
            where: { id: entry.id },
            data: dto,
        });
    }
    async remove(id, user) {
        const entry = await this.findOne(id, user);
        return this.prisma.contentEntry.delete({ where: { id: entry.id } });
    }
};
exports.ContentEntriesService = ContentEntriesService;
exports.ContentEntriesService = ContentEntriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentEntriesService);
//# sourceMappingURL=content-entries.service.js.map