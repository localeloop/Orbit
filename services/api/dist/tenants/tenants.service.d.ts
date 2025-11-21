import { PrismaService } from '../prisma/prisma.service';
import { CreateTenantDto, UpdateTenantDto } from './dto';
import { JwtUser } from '../types/jwt-user';
export declare class TenantsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTenantDto, user?: JwtUser): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        plan: string | null;
    }>;
    findAll(user?: JwtUser): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        plan: string | null;
    }[]>;
    findOne(id: string, user?: JwtUser): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        plan: string | null;
    }>;
    update(id: string, dto: UpdateTenantDto, user?: JwtUser): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        plan: string | null;
    }>;
    remove(id: string, user?: JwtUser): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        plan: string | null;
    }>;
}
