/**
 * UsersService
 * 
 * Service responsible for managing users in the system. Handles user creation, retrieval,
 * updates, deletion, and password hashing. Integrates with Prisma for database operations
 * and includes audit logging for user creation.
 * 
 * @author Joshua Rene Burger
 * 
 * @version 0.01
 * @date 14.10.25
 */

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtUser } from '../types/jwt-user';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  /**
  * Creates a new user.
  * Only admin users can create other users.
  * Password is hashed before storing.
  * An audit log is created for tracking.
  *
  * @param dto - Data Transfer Object containing user creation info
  * @param user - The authenticated user performing the action (optional)
  * @returns The created user's basic information
  */
  async create(dto: CreateUserDto, user?: JwtUser) {

    if (user && user.role !== 'admin') {
      throw new ForbiddenException('Only admins can create users');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);


    return this.prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          email: dto.email,
          passwordHash: hashedPassword,
          role: dto.role || 'viewer',
          tenantId: dto.tenantId,
        },
        select: {
          id: true,
          email: true,
          tenantId: true,
          role: true,
          createdAt: true,
        },
      });

      await tx.auditLog.create({
        data: {
          action: 'CREATE_USER',
          performedById: user?.id || null,
          tenantId: dto.tenantId,
          metadata: {
            createdUserId: createdUser.id,
            createdUserEmail: createdUser.email,
          },
        },
      });

      return createdUser;
    });
  }

  /**
    * Retrieves all users for the tenant of the requesting user.
    *
    * @param user - Authenticated user
    * @returns Array of users
    */
  async findAll(user: JwtUser) {
    return this.prisma.user.findMany({
      where: { tenantId: user.tenantId },
      select: {
        id: true,
        email: true,
        tenantId: true,
        role: true,
        createdAt: true,
      },
    });
  }

  /**
   * Retrieves a single user by ID within the requesting user's tenant.
   *
   * @param id - User ID
   * @param user - Authenticated user
   * @throws NotFoundException if user does not exist or access is denied
   * @returns User details
   */
  async findOne(id: string, user: JwtUser) {
    const found = await this.prisma.user.findFirst({
      where: { id, tenantId: user.tenantId },
      select: {
        id: true,
        email: true,
        tenantId: true,
        role: true,
        createdAt: true,
      },
    });
    if (!found) throw new NotFoundException('User not found or access denied');
    return found;
  }

  /**
  * Updates an existing user's information.
  * Password is hashed if provided.
  *
  * @param id - User ID
  * @param dto - Update data
  * @param user - Authenticated user
  * @returns Updated user details
  */
  async update(id: string, dto: UpdateUserDto, user: JwtUser) {
    const existing = await this.findOne(id, user);

    let data: any = { ...dto };
    if (dto.password) {
      data.passwordHash = await bcrypt.hash(dto.password, 12);
      delete data.password;
    }

    return this.prisma.user.update({
      where: { id: existing.id },
      data,
      select: {
        id: true,
        email: true,
        tenantId: true,
        role: true,
        createdAt: true,
      },
    });
  }

  /**
   * Deletes a user by ID.
   *
   * @param id - User ID
   * @param user - Authenticated user
   * @returns Deleted user details
   */
  async remove(id: string, user: JwtUser) {
    const existing = await this.findOne(id, user);
    return this.prisma.user.delete({
      where: { id: existing.id },
      select: {
        id: true,
        email: true,
        tenantId: true,
        role: true,
        createdAt: true,
      },
    });
  }

  /**
  * Finds a user by email.
  *
  * @param email - User email
  * @returns User record if found
  */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
