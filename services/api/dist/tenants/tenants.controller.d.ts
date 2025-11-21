import { TenantsService } from './tenants.service';
import { CreateTenantDto, UpdateTenantDto } from './dto';
import { JwtUser } from '../types/jwt-user';
import { AuthRequest } from '../types/auth-request';
export declare class TenantsController {
    private readonly tenantsService;
    constructor(tenantsService: TenantsService);
    create(dto: CreateTenantDto, req: AuthRequest<JwtUser>): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        plan: string | null;
    }>;
    findAll(req: AuthRequest<JwtUser>): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        plan: string | null;
    }[]>;
    findOne(id: string, req: AuthRequest<JwtUser>): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        plan: string | null;
    }>;
    update(id: string, dto: UpdateTenantDto, req: AuthRequest<JwtUser>): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        plan: string | null;
    }>;
    remove(id: string, req: AuthRequest<JwtUser>): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        plan: string | null;
    }>;
}
