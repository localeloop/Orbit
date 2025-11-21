/**
 * CreateContentEntryDto
 * 
 * Data Transfer Object for creating a new content entry.
 * Validates required and optional fields for content entry creation.
 * 
 * @author Joshua Rene Burger
 * @version 0.01
 * @date 14-10-2025
 */

import { IsString, IsOptional, IsUUID, IsObject } from 'class-validator';

// create-content-entry.dto.ts
export class CreateContentEntryDto {
    /**
    * ID of the website the content belongs to
    */
    @IsString()
    websiteId: string;

    /**
     * Unique key identifying the content entry
     */
    @IsString()
    key: string;

    /**
     * Content data as a JSON object
     */
    @IsObject()
    content: object; // JSON field

    /**
     * Version number of the content entry
     */
    @IsUUID()
    version: number;

    /**
     * Optional locale code (e.g., 'en', 'fr')
     */
    @IsString()
    locale?: string;
}
