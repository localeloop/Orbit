/**
 * TenantsModule
 * 
 * NestJS module for tenant management.
 * Registers TenantsController and provides TenantsService for dependency injection.
 * Encapsulates tenant-related functionality for use in the application.
 * 
 * @author Joshua Rene Burger
 * @version 0.01
 * @date 14-10-2025
 */

import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class TenantsModule { }
