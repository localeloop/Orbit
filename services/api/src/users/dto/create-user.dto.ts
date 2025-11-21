/**
 * CreateUserDto
 * 
 * Data Transfer Object for creating a new user.
 * Validates and documents the required and optional fields for user creation.
 * 
 * @author Joshua Rene Burger
 * 
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: '1f9d7b7a-1c3a-4f9b-8a5d-2c6f7b9a8b12',
        description: 'The tenant ID this user belongs to',
    })
    @IsUUID()
    tenantId: string;

    @ApiProperty({
        example: 'user@example.com',
        description: 'User email address (must be unique)',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Password123!',
        minLength: 8,
        required: false,
        description: 'Optional password (if not using external auth)',
    })
    @IsOptional()
    @MinLength(8)
    password?: string;

    @ApiProperty({
        example: 'editor',
        enum: ['admin', 'editor', 'viewer'],
        required: false,
        description: 'Role of the user within the tenant',
    })
    @IsOptional()
    @IsString()
    role?: 'admin' | 'editor' | 'viewer';
}
