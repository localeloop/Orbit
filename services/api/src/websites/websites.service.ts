import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWebsiteDto, UpdateWebsiteDto } from './dto';
import { JwtUser } from '../types/jwt-user';

@Injectable()
export class WebsitesService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateWebsiteDto, user: JwtUser) {
    return this.prisma.website.create({
      data: {
        ...dto,
        tenantId: user.tenantId, // always enforce tenantId from JWT
      },
    });
  }

  async findAll(user: JwtUser) {
    return this.prisma.website.findMany({
      where: { tenantId: user.tenantId },
      include: { tenant: true },
    });
  }

  async findOne(id: string, user: JwtUser) {
    const website = await this.prisma.website.findFirst({
      where: { id, tenantId: user.tenantId },
    });
    if (!website) throw new NotFoundException(`Website not found or access denied`);
    return website;
  }

  async update(id: string, dto: UpdateWebsiteDto, user: JwtUser) {
    const website = await this.findOne(id, user); // ensures tenant scoping
    return this.prisma.website.update({
      where: { id: website.id },
      data: dto,
    });
  }

  async remove(id: string, user: JwtUser) {
    const website = await this.findOne(id, user); // ensures tenant scoping
    return this.prisma.website.delete({ where: { id: website.id } });
  }
}
