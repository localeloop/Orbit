import { PrismaService } from '../prisma/prisma.service';
import { CreateContentEntryDto } from './dto/create-content-entry.dto';
import { UpdateContentEntryDto } from './dto/update-content-entry.dto';
import { JwtUser } from '../types/jwt-user';
export declare class ContentEntriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateContentEntryDto, user: JwtUser): Promise<{
        tenantId: string | null;
        id: string;
        createdAt: Date;
        content: import("@prisma/client/runtime/library").JsonValue;
        websiteId: string;
        key: string;
        version: number;
        locale: string;
        updatedAt: Date;
    }>;
    findAll(user: JwtUser): Promise<{
        tenantId: string | null;
        id: string;
        createdAt: Date;
        content: import("@prisma/client/runtime/library").JsonValue;
        websiteId: string;
        key: string;
        version: number;
        locale: string;
        updatedAt: Date;
    }[]>;
    findOne(id: string, user: JwtUser): Promise<{
        website: {
            tenantId: string;
            id: string;
            createdAt: Date;
            handle: string;
            domain: string | null;
            settings: import("@prisma/client/runtime/library").JsonValue;
            lastDeployed: Date | null;
        };
    } & {
        tenantId: string | null;
        id: string;
        createdAt: Date;
        content: import("@prisma/client/runtime/library").JsonValue;
        websiteId: string;
        key: string;
        version: number;
        locale: string;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateContentEntryDto, user: JwtUser): Promise<{
        tenantId: string | null;
        id: string;
        createdAt: Date;
        content: import("@prisma/client/runtime/library").JsonValue;
        websiteId: string;
        key: string;
        version: number;
        locale: string;
        updatedAt: Date;
    }>;
    remove(id: string, user: JwtUser): Promise<{
        tenantId: string | null;
        id: string;
        createdAt: Date;
        content: import("@prisma/client/runtime/library").JsonValue;
        websiteId: string;
        key: string;
        version: number;
        locale: string;
        updatedAt: Date;
    }>;
}
