import { ContentEntriesService } from './content-entries.service';
import { CreateContentEntryDto } from './dto/create-content-entry.dto';
import { UpdateContentEntryDto } from './dto/update-content-entry.dto';
import { JwtUser } from '../types/jwt-user';
import { AuthRequest } from '../types/auth-request';
export declare class ContentEntriesController {
    private readonly contentEntriesService;
    constructor(contentEntriesService: ContentEntriesService);
    create(dto: CreateContentEntryDto, req: AuthRequest<JwtUser>): Promise<{
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
    findAll(req: AuthRequest<JwtUser>): Promise<{
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
    findOne(id: string, req: AuthRequest<JwtUser>): Promise<{
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
    update(id: string, dto: UpdateContentEntryDto, req: AuthRequest<JwtUser>): Promise<{
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
    remove(id: string, req: AuthRequest<JwtUser>): Promise<{
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
