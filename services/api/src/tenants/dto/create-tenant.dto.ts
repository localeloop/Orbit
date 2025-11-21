import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateTenantDto {
    @ApiProperty({
        example: "Acme Inc.",
        description: "Name of the tenant"
    })
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty({
        example: "pro",
        description: "Subscription plan for tenant",
        required: false,
        enum: ["free", "pro", "enterprise"]
    })
    @IsOptional()
    @IsString()
    plan?: 'free' | 'pro' | 'enterprise';

}
