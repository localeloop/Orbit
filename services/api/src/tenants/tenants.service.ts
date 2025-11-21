/**
 * TenantsService
 * 
 * Service responsible for managing tenants in the system.
 * Handles creation, retrieval, updating, and deletion of tenants.
 * Enforces access control based on user role (global admin or tenant-level user).
 * Integrates with Prisma for database operations.
 * 
 * @author Joshua Rene Burger
 * @version 0.01
 * @date 14-10-2025
 */

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTenantDto, UpdateTenantDto } from './dto';
import { JwtUser } from '../types/jwt-user';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) { }

  /**
   * Create a new tenant.
   * Only global admins can create tenants.
   *
   * @param dto - Tenant creation data
   * @param user - Authenticated user performing the action (optional)
   * @returns Created tenant
   */
  async create(dto: CreateTenantDto, user?: JwtUser) {
    // Optionally, only global admins can create tenants
    if (user && user.role !== 'admin') {
      throw new ForbiddenException('Only global admins can create tenants');
    }

    return this.prisma.tenant.create({
      data: {
        name: dto.name,
        plan: dto.plan || 'free',
      },
    });
  }

  /**
   * Retrieve tenants accessible to the user.
   * Tenant users see only their own tenant; global admins see all tenants.
   *
   * @param user - Authenticated user (optional)
   * @returns Array of tenants
   */
  async findAll(user?: JwtUser) {
    // Tenant-level users only see their own tenant
    if (user) {
      return this.prisma.tenant.findMany({
        where: { id: user.tenantId },
      });
    }
    // Global admins see all
    return this.prisma.tenant.findMany();
  }

  /**
   * Retrieve a tenant by ID.
   * Enforces access control based on user role and tenant association.
   *
   * @param id - Tenant ID
   * @param user - Authenticated user (optional)
   * @throws NotFoundException if tenant does not exist
   * @throws ForbiddenException if user lacks access
   * @returns Tenant details
   */
  async findOne(id: string, user?: JwtUser) {
    const tenant = await this.prisma.tenant.findUnique({ where: { id } });
    if (!tenant) throw new NotFoundException('Tenant not found');

    if (user && user.tenantId !== id && user.role !== 'admin') {
      throw new ForbiddenException('Access denied');
    }

    return tenant;
  }

  /**
   * Update tenant information.
   * Checks access before updating.
   *
   * @param id - Tenant ID
   * @param dto - Update data
   * @param user - Authenticated user (optional)
   * @returns Updated tenant
   */
  async update(id: string, dto: UpdateTenantDto, user?: JwtUser) {
    await this.findOne(id, user); // check access

    return this.prisma.tenant.update({
      where: { id },
      data: dto,
    });
  }

  /**
   * Delete a tenant.
   * Checks access before deletion.
   *
   * @param id - Tenant ID
   * @param user - Authenticated user (optional)
   * @returns Deleted tenant
   */
  async remove(id: string, user?: JwtUser) {
    await this.findOne(id, user); // check access
    return this.prisma.tenant.delete({ where: { id } });
  }
}
