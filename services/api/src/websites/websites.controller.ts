/**
 * WebsitesController
 * 
 * Controller for managing websites in the system.
 * Handles creating, retrieving, updating, and deleting websites.
 * Routes are protected using JWT authentication and enforce tenant-level access.
 * Delegates business logic to WebsitesService.
 * 
 * @author Joshua Rene Burger
 * @version 0.01
 * @date 14-10-2025
 */

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WebsitesService } from './websites.service';
import { CreateWebsiteDto, UpdateWebsiteDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtUser } from '../types/jwt-user';
import { AuthRequest } from '../types/auth-request';

@Controller('websites')
@UseGuards(JwtAuthGuard)
export class WebsitesController {
  constructor(private readonly websitesService: WebsitesService) { }


  /**
   * Create a new website.
   *
   * @param dto - Website creation data
   * @param req - Authenticated request containing JWT user
   * @returns Created website
   */
  @Post()
  create(@Body() dto: CreateWebsiteDto, @Req() req: AuthRequest<JwtUser>) {
    return this.websitesService.create(dto, req.user);
  }

  /**
   * Retrieve all websites for the authenticated user's tenant.
   *
   * @param req - Authenticated request containing JWT user
   * @returns Array of websites
   */
  @Get()
  findAll(@Req() req: AuthRequest<JwtUser>) {
    return this.websitesService.findAll(req.user);
  }

  /**
   * Retrieve a single website by ID.
   *
   * @param id - Website ID
   * @param req - Authenticated request containing JWT user
   * @returns Website details
   */
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest<JwtUser>) {
    return this.websitesService.findOne(id, req.user);
  }

  /**
   * Update a website by ID.
   *
   * @param id - Website ID
   * @param dto - Update data
   * @param req - Authenticated request containing JWT user
   * @returns Updated website
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWebsiteDto, @Req() req: AuthRequest<JwtUser>) {
    return this.websitesService.update(id, dto, req.user);
  }

  /**
   * Delete a website by ID.
   *
   * @param id - Website ID
   * @param req - Authenticated request containing JWT user
   * @returns Deleted website
   */
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest<JwtUser>) {
    return this.websitesService.remove(id, req.user);
  }
}
