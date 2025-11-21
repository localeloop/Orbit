/**
 * ContentEntriesService
 * 
 * Service responsible for managing content entries.
 * Handles creation, retrieval, updating, and deletion of content entries.
 * Enforces tenant-level access based on the authenticated user.
 * Integrates with Prisma for database operations.
 * 
 * @author Joshua Rene Burger
 * @version 0.01
 * @date 14-10-2025
 */

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContentEntryDto } from './dto/create-content-entry.dto';
import { UpdateContentEntryDto } from './dto/update-content-entry.dto';
import { JwtUser } from '../types/jwt-user';

@Injectable()
export class ContentEntriesService {
  constructor(private prisma: PrismaService) { }


  /**
   * Create a new content entry.
   * Ensures the website belongs to the tenant.
   *
   * @param data - Content entry creation data
   * @param user - Authenticated user performing the action
   * @returns Created content entry
   */
  async create(data: CreateContentEntryDto, user: JwtUser) {
    // Ensure website belongs to the tenant
    const website = await this.prisma.website.findFirst({
      where: {
        id: data.websiteId,
        tenantId: user.tenantId,
      },
    });

    if (!website) {
      throw new NotFoundException('Website not found or access denied');
    }

    return this.prisma.contentEntry.create({
      data: {
        websiteId: data.websiteId,
        key: data.key,
        locale: data.locale || 'en',
        content: data.content,
        version: data.version || 1,
      },
    });
  }

  /**
   * Retrieve all content entries for the tenant.
   *
   * @param user - Authenticated user
   * @returns Array of content entries
   */
  async findAll(user: JwtUser) {
    // Fetch all content entries for websites belonging to this tenant
    return this.prisma.contentEntry.findMany({
      where: {
        website: {
          tenantId: user.tenantId,
        },
      },
    });
  }

  /**
   * Retrieve a single content entry by ID.
   * Checks that the entry belongs to the tenant.
   *
   * @param id - Content entry ID
   * @param user - Authenticated user
   * @throws NotFoundException if entry does not exist
   * @throws ForbiddenException if access is denied
   * @returns Content entry
   */
  async findOne(id: string, user: JwtUser) {
    const entry = await this.prisma.contentEntry.findUnique({
      where: { id },
      include: { website: true }, // need website to check tenant
    });

    if (!entry) throw new NotFoundException('Content entry not found');

    if (entry.website.tenantId !== user.tenantId) {
      throw new ForbiddenException('Access denied');
    }

    return entry;
  }

  /**
   * Update a content entry.
   * Checks access before updating.
   *
   * @param id - Content entry ID
   * @param dto - Update data
   * @param user - Authenticated user
   * @returns Updated content entry
   */
  async update(id: string, dto: UpdateContentEntryDto, user: JwtUser) {
    const entry = await this.findOne(id, user); // access check

    return this.prisma.contentEntry.update({
      where: { id: entry.id },
      data: dto,
    });
  }

  /**
   * Delete a content entry.
   * Checks access before deletion.
   *
   * @param id - Content entry ID
   * @param user - Authenticated user
   * @returns Deleted content entry
   */
  async remove(id: string, user: JwtUser) {
    const entry = await this.findOne(id, user); // access check
    return this.prisma.contentEntry.delete({ where: { id: entry.id } });
  }
}
