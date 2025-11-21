/**
 * UpdateContentEntryDto
 * 
 * Data Transfer Object for updating an existing content entry.
 * All fields are optional to allow partial updates.
 * 
 * @author Joshua Rene Burger
 * @version 0.01
 * @date 14-10-2025
 */

import { IsString, IsOptional, IsUUID, IsObject } from 'class-validator';

// update-content-entry.dto.ts
export class UpdateContentEntryDto {

    /**
     * Optional updated content as a JSON object
     */
    @IsObject()
    content?: object;

    /**
     * Optional updated version number
     */
    @IsUUID()
    version?: number;

    /**
     * Optional updated locale code (e.g., 'en', 'fr')
     */
    @IsString()
    locale?: string;
}
