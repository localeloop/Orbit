/**
 * AppModule
 * 
 * Root module of the application.
 * Imports all feature modules including Users, Auth, Tenants, Websites, and ContentEntries.
 * Registers AppController and AppService.
 * Serves as the main entry point for the NestJS application.
 * 
 * @author Joshua Rene Burger
 * @version 0.01
 * @date 14-10-2025
 */


import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

// Modules
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TenantsModule } from './tenants/tenants.module';
import { WebsitesModule } from './websites/websites.module';
import { ContentEntriesModule } from './content-entries/content-entries.module';

@Module({
  imports: [PrismaModule, TenantsModule, WebsitesModule, ContentEntriesModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
