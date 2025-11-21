import { WebsitesService } from './websites.service';
import { CreateWebsiteDto, UpdateWebsiteDto } from './dto';
import { JwtUser } from '../types/jwt-user';
import { AuthRequest } from '../types/auth-request';
export declare class WebsitesController {
    private readonly websitesService;
    constructor(websitesService: WebsitesService);
    create(dto: CreateWebsiteDto, req: AuthRequest<JwtUser>): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        handle: string;
        domain: string | null;
        settings: import("@prisma/client/runtime/library").JsonValue;
        lastDeployed: Date | null;
    }>;
    findAll(req: AuthRequest<JwtUser>): Promise<({
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
    findOne(id: string, req: AuthRequest<JwtUser>): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        handle: string;
        domain: string | null;
        settings: import("@prisma/client/runtime/library").JsonValue;
        lastDeployed: Date | null;
    }>;
    update(id: string, dto: UpdateWebsiteDto, req: AuthRequest<JwtUser>): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        handle: string;
        domain: string | null;
        settings: import("@prisma/client/runtime/library").JsonValue;
        lastDeployed: Date | null;
    }>;
    remove(id: string, req: AuthRequest<JwtUser>): Promise<{
        tenantId: string;
        id: string;
        createdAt: Date;
        handle: string;
        domain: string | null;
        settings: import("@prisma/client/runtime/library").JsonValue;
        lastDeployed: Date | null;
    }>;
}
