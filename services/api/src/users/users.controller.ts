/**
 * UsersController
 * 
 * Controller for managing user-related API endpoints.
 * Handles creating, retrieving, updating, and deleting users.
 * Protects routes using JWT authentication and enforces tenant-level access.
 * Integrates with UsersService for business logic.
 * 
 * @author Joshua Rene Burger
 * 
 * @version 0.01
 * @date 14.10.25
 */

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtUser } from 'src/types/jwt-user';
import { AuthRequest } from 'src/types/auth-request';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * Create a new user under a tenant (admin only).
   *
   * @param dto - User creation data
   * @param req - Authenticated request containing JWT user
   * @returns Created user
   */
  @Post()
  @ApiOperation({ summary: 'Create a new user under a tenant (admin only)' })
  create(@Body() dto: CreateUserDto, @Req() req: AuthRequest<JwtUser>) {
    return this.usersService.create(dto, req.user);
  }

  /**
  * List all users for the authenticated user's tenant.
  *
  * @param req - Authenticated request containing JWT user
  * @returns Array of users
  */
  @Get()
  @ApiOperation({ summary: 'List all users (tenant or global admin)' })
  findAll(@Req() req: AuthRequest<JwtUser>) {
    return this.usersService.findAll(req.user);
  }


  /**
   * Get a single user by ID.
   *
   * @param id - User ID
   * @param req - Authenticated request containing JWT user
   * @returns User details
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  findOne(@Param('id') id: string, @Req() req: AuthRequest<JwtUser>) {
    return this.usersService.findOne(id, req.user);
  }

  /**
   * Update a user (admin or self).
   *
   * @param id - User ID
   * @param dto - Update data
   * @param req - Authenticated request containing JWT user
   * @returns Updated user
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user (admin or self)' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto, @Req() req: AuthRequest<JwtUser>) {
    return this.usersService.update(id, dto, req.user);
  }

  /**
  * Delete a user by ID (admin only).
  *
  * @param id - User ID
  * @param req - Authenticated request containing JWT user
  * @returns Deleted user
  */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user (admin only)' })
  remove(@Param('id') id: string, @Req() req: AuthRequest<JwtUser>) {
    return this.usersService.remove(id, req.user);
  }
}
