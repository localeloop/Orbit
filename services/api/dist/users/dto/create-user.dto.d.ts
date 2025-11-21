export declare class CreateUserDto {
    tenantId: string;
    email: string;
    password?: string;
    role?: 'admin' | 'editor' | 'viewer';
}
