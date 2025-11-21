import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtUser } from '../types/jwt-user';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUserDto, user?: JwtUser): Promise<{
        tenantId: string;
        email: string;
        role: string;
        id: string;
        createdAt: Date;
    }>;
    findAll(user: JwtUser): Promise<{
        tenantId: string;
        email: string;
        role: string;
        id: string;
        createdAt: Date;
    }[]>;
    findOne(id: string, user: JwtUser): Promise<{
        tenantId: string;
        email: string;
        role: string;
        id: string;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateUserDto, user: JwtUser): Promise<{
        tenantId: string;
        email: string;
        role: string;
        id: string;
        createdAt: Date;
    }>;
    remove(id: string, user: JwtUser): Promise<{
        tenantId: string;
        email: string;
        role: string;
        id: string;
        createdAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        tenantId: string;
        email: string;
        role: string;
        id: string;
        passwordHash: string | null;
        createdAt: Date;
    } | null>;
}
