import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtUser } from 'src/types/jwt-user';
import { AuthRequest } from 'src/types/auth-request';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto, req: AuthRequest<JwtUser>): Promise<{
        tenantId: string;
        email: string;
        role: string;
        id: string;
        createdAt: Date;
    }>;
    findAll(req: AuthRequest<JwtUser>): Promise<{
        tenantId: string;
        email: string;
        role: string;
        id: string;
        createdAt: Date;
    }[]>;
    findOne(id: string, req: AuthRequest<JwtUser>): Promise<{
        tenantId: string;
        email: string;
        role: string;
        id: string;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateUserDto, req: AuthRequest<JwtUser>): Promise<{
        tenantId: string;
        email: string;
        role: string;
        id: string;
        createdAt: Date;
    }>;
    remove(id: string, req: AuthRequest<JwtUser>): Promise<{
        tenantId: string;
        email: string;
        role: string;
        id: string;
        createdAt: Date;
    }>;
}
