/**
 * ContentEntriesController
 * 
 * Controller for managing content entries in the system.
 * Handles creating, retrieving, updating, and deleting content entries.
 * Routes are protected using JWT authentication and enforce tenant-level access.
 * Delegates business logic to ContentEntriesService.
 * 
 * @author Joshua Rene Burger
 * @version 0.01
 * @date 14-10-2025
 */

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ContentEntriesService } from './content-entries.service';
import { CreateContentEntryDto } from './dto/create-content-entry.dto';
import { UpdateContentEntryDto } from './dto/update-content-entry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtUser } from '../types/jwt-user';
import { AuthRequest } from '../types/auth-request';

@Controller('content-entries')
@UseGuards(JwtAuthGuard)
export class ContentEntriesController {
  constructor(private readonly contentEntriesService: ContentEntriesService) { }

  /**
   * Create a new content entry.
   *
   * @param dto - Content entry creation data
   * @param req - Authenticated request containing JWT user
   * @returns Created content entry
   */
  @Post()
  create(@Body() dto: CreateContentEntryDto, @Req() req: AuthRequest<JwtUser>) {
    return this.contentEntriesService.create(dto, req.user);
  }

  /**
   * Retrieve all content entries for the authenticated user's tenant.
   *
   * @param req - Authenticated request containing JWT user
   * @returns Array of content entries
   */
  @Get()
  findAll(@Req() req: AuthRequest<JwtUser>) {
    return this.contentEntriesService.findAll(req.user);
  }

  /**
   * Retrieve a single content entry by ID.
   *
   * @param id - Content entry ID
   * @param req - Authenticated request containing JWT user
   * @returns Content entry details
   */
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest<JwtUser>) {
    return this.contentEntriesService.findOne(id, req.user);
  }

  /**
   * Update a content entry by ID.
   *
   * @param id - Content entry ID
   * @param dto - Update data
   * @param req - Authenticated request containing JWT user
   * @returns Updated content entry
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateContentEntryDto, @Req() req: AuthRequest<JwtUser>) {
    return this.contentEntriesService.update(id, dto, req.user);
  }

  /**
   * Delete a content entry by ID.
   *
   * @param id - Content entry ID
   * @param req - Authenticated request containing JWT user
   * @returns Deleted content entry
   */
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest<JwtUser>) {
    return this.contentEntriesService.remove(id, req.user);
  }
}
