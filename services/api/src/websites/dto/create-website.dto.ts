import { IsString, IsOptional, IsUUID, IsObject } from 'class-validator';

export class CreateWebsiteDto {
    @IsUUID()
    tenantId: string;

    @IsString()
    handle: string;

    @IsOptional()
    @IsString()
    domain?: string;

    @IsOptional()
    @IsObject()
    settings?: Record<string, any>;
}