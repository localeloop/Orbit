/**
 * TenantsController
 * 
 * Controller for managing tenant-related API endpoints.
 * Handles creating, retrieving, updating, and deleting tenants.
 * Protects routes using JWT authentication and enforces admin or tenant-level access.
 * Integrates with TenantsService for business logic.
 * 
 * @author Joshua Rene Burger
 * @version 0.01
 * @date 14-10-2025
 */

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto, UpdateTenantDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtUser } from '../types/jwt-user';
import { AuthRequest } from '../types/auth-request';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Tenants')
@ApiBearerAuth()
@Controller('tenants')
@UseGuards(JwtAuthGuard)
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) { }

  /**
   * Create a new tenant (admin only).
   *
   * @param dto - Tenant creation data
   * @param req - Authenticated request containing JWT user
   * @returns Created tenant
   */
  @Post()
  @ApiOperation({ summary: "Create a new tenant ( admin only )" })
  create(@Body() dto: CreateTenantDto, @Req() req: AuthRequest<JwtUser>) {
    return this.tenantsService.create(dto, req.user);
  }

  /**
   * List all tenants accessible to the authenticated user.
   *
   * @param req - Authenticated request containing JWT user
   * @returns Array of tenants
   */
  @Get()
  @ApiOperation({ summary: "List tenants ( admin or tenant users only )" })
  findAll(@Req() req: AuthRequest<JwtUser>) {
    return this.tenantsService.findAll(req.user);
  }

  /**
   * Get a tenant by ID.
   *
   * @param id - Tenant ID
   * @param req - Authenticated request containing JWT user
   * @returns Tenant details
   */
  @Get(':id')
  @ApiOperation({ summary: "Get tenant by ID" })
  findOne(@Param('id') id: string, @Req() req: AuthRequest<JwtUser>) {
    return this.tenantsService.findOne(id, req.user);
  }

  /**
   * Update tenant information.
   *
   * @param id - Tenant ID
   * @param dto - Update data
   * @param req - Authenticated request containing JWT user
   * @returns Updated tenant
   */
  @Patch(':id')
  @ApiOperation({ summary: "Update tenant info" })
  update(@Param('id') id: string, @Body() dto: UpdateTenantDto, @Req() req: AuthRequest<JwtUser>) {
    return this.tenantsService.update(id, dto, req.user);
  }

  /**
   * Delete a tenant.
   *
   * @param id - Tenant ID
   * @param req - Authenticated request containing JWT user
   * @returns Deleted tenant
   */
  @Delete(':id')
  @ApiOperation({ summary: "Delete a tenant" })
  remove(@Param('id') id: string, @Req() req: AuthRequest<JwtUser>) {
    return this.tenantsService.remove(id, req.user);
  }
}
