import { PrismaService } from '../prisma/prisma.service';
import { CreateWebsiteDto, UpdateWebsiteDto } from './dto';
import { JwtUser } from '../types/jwt-user';
export declare class WebsitesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateWebsiteDto, user: JwtUser): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        handle: string;
        domain: string | null;
        settings: import("@prisma/client/runtime/library").JsonValue;
        lastDeployed: Date | null;
    }>;
    findAll(user: JwtUser): Promise<({
        tenant: {
            id: string;
            createdAt: Date;
            name: string;
            plan: string | null;
        };
    } & {
        tenantId: string;
        id: string;
        createdAt: Date;
        handle: string;
        domain: string | null;
        settings: import("@prisma/client/runtime/library").JsonValue;
        lastDeployed: Date | null;
    })[]>;
    findOne(id: string, user: JwtUser): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        handle: string;
        domain: string | null;
        settings: import("@prisma/client/runtime/library").JsonValue;
        lastDeployed: Date | null;
    }>;
    update(id: string, dto: UpdateWebsiteDto, user: JwtUser): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        handle: string;
        domain: string | null;
        settings: import("@prisma/client/runtime/library").JsonValue;
        lastDeployed: Date | null;
    }>;
    remove(id: string, user: JwtUser): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        handle: string;
        domain: string | null;
        settings: import("@prisma/client/runtime/library").JsonValue;
        lastDeployed: Date | null;
    }>;
}
