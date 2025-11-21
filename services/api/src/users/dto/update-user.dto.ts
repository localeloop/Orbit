/**
 * UpdateUserDto
 * 
 * Data Transfer Object for updating an existing user.
 * Allows optional updates to password and role with validation.
 * 
 * @author Joshua Rene Burger
 * 
 */

import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
    /**
    * Optional new password for the user.
    * Must be at least 8 characters if provided.
    */
    @IsOptional()
    @IsString()
    @MinLength(8)
    password?: string;

    /**
    * Optional new role for the user.
    * Must be one of 'admin', 'editor', or 'viewer'.
    */
    @IsOptional()
    @IsString()
    role?: 'admin' | 'editor' | 'viewer';
}
