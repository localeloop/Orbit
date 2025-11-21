import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        tenantId: string;
        email: string;
        role: string;
        id: string;
        passwordHash: string | null;
        createdAt: Date;
    } | null>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
