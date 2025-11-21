/**
 * UsersModule
 * 
 * NestJS module for user management.
 * Imports PrismaModule for database access, provides UsersService,
 * and exports UsersService for use in other modules.
 * 
 * @author Joshua Rene Burger
 * 
 * @version 0.01
 * @date 14.10.25
 */

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }