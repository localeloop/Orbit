// test/full-flow.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

describe('Orbit CMS Full Flow (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let jwtService: JwtService;

    let adminJwt: string; // token for initial admin who can create tenants/users
    let userJwt: string; // token for tenant-level user (editor)
    let tenantId: string;
    let userId: string;
    let websiteId: string;
    let contentEntryId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        // ensure validation pipe matches app behaviour
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
        await app.init();

        prisma = app.get(PrismaService);
        jwtService = app.get(JwtService);

        // Reset DB - remove in safe order to avoid FK errors
        await prisma.contentEntry.deleteMany({});
        await prisma.website.deleteMany({});
        await prisma.user.deleteMany({});
        await prisma.tenant.deleteMany({});

        // Create a tenant that will be main test tenant
        const seedTenant = await prisma.tenant.create({
            data: { name: 'Seed Tenant', plan: 'basic' },
        });
        tenantId = seedTenant.id;

        // Create an initial admin user (tenant-scoped admin). This user will act as "admin" for tests.
        const adminHash = await bcrypt.hash('AdminPassword123!', 12);
        const adminUser = await prisma.user.create({
            data: {
                email: 'admin@example.test',
                passwordHash: adminHash,
                role: 'admin',
                tenantId: tenantId,
            },
        });

        // Sign an admin JWT matching AuthService/JwtStrategy payload shape
        adminJwt = jwtService.sign({
            sub: adminUser.id,
            email: adminUser.email,
            tenantId: adminUser.tenantId,
            role: adminUser.role,
        });
    });

    afterAll(async () => {
        // cleanup
        try {
            await prisma.contentEntry.deleteMany({});
            await prisma.website.deleteMany({});
            await prisma.user.deleteMany({});
            await prisma.tenant.deleteMany({});
        } catch (e) {
            // ignore cleanup errors in teardown
        }
        await app.close();
    });

    it('admin should be able to create a new tenant', async () => {
        const res = await request(app.getHttpServer())
            .post('/tenants')
            .set('Authorization', `Bearer ${adminJwt}`)
            .send({ name: 'New Tenant From Test', plan: 'basic' })
            .expect(201);

        expect(res.body).toHaveProperty('id');
        // keep the returned tenant for later deletion if different from seeded tenant
        // but don't overwrite the main tenantId seeded earlier (we use seeded tenant for user/website)
    });

    it('admin should be able to list tenants', async () => {
        const res = await request(app.getHttpServer())
            .get('/tenants')
            .set('Authorization', `Bearer ${adminJwt}`)
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });

    it('admin should create a tenant-level user (editor)', async () => {
        const res = await request(app.getHttpServer())
            .post('/users')
            .set('Authorization', `Bearer ${adminJwt}`)
            .send({
                email: 'tenantuser@example.test',
                password: 'Password123!',
                tenantId: tenantId,
                role: 'editor',
            })
            .expect(201);

        expect(res.body).toHaveProperty('id');
        expect(res.body.email).toBe('tenantuser@example.test');
        userId = res.body.id;
    });

    it('tenant user should be able to login and receive JWT', async () => {
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'tenantuser@example.test', password: 'Password123!' })
            .expect(201);

        expect(res.body).toHaveProperty('access_token');
        userJwt = res.body.access_token;
    });

    it('tenant user should create a website under their tenant', async () => {
        const res = await request(app.getHttpServer())
            .post('/websites')
            .set('Authorization', `Bearer ${userJwt}`)
            .send({
                handle: 'test-site',
                domain: 'test.example.test',
            })
            .expect(201);

        expect(res.body).toHaveProperty('id');
        websiteId = res.body.id;
    });

    it('tenant user should list websites (only their tenant)', async () => {
        const res = await request(app.getHttpServer())
            .get('/websites')
            .set('Authorization', `Bearer ${userJwt}`)
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
        // at least the one we created
        expect(res.body.some((w: any) => w.id === websiteId)).toBe(true);
    });

    it('tenant user should create a content entry for that website', async () => {
        const res = await request(app.getHttpServer())
            .post('/content-entries')
            .set('Authorization', `Bearer ${userJwt}`)
            .send({
                websiteId,
                key: 'test-entry-key',
                locale: 'en',
                content: { body: 'Hello World' },
                version: 1,
            })
            .expect(201);

        expect(res.body).toHaveProperty('id');
        contentEntryId = res.body.id;
    });

    it('tenant user should update the content entry (version bump + new content)', async () => {
        const res = await request(app.getHttpServer())
            .patch(`/content-entries/${contentEntryId}`)
            .set('Authorization', `Bearer ${userJwt}`)
            .send({
                content: { body: 'Updated content' },
                version: 2,
            })
            .expect(200);

        expect(res.body.version).toBe(2);
        expect(res.body.content.body).toBe('Updated content');
    });

    it('tenant user should be able to delete the content entry', async () => {
        await request(app.getHttpServer())
            .delete(`/content-entries/${contentEntryId}`)
            .set('Authorization', `Bearer ${userJwt}`)
            .expect(200);
    });

    it('tenant user should be able to delete the website', async () => {
        await request(app.getHttpServer())
            .delete(`/websites/${websiteId}`)
            .set('Authorization', `Bearer ${userJwt}`)
            .expect(200);
    });

    it('admin should be able to delete the tenant-level user', async () => {
        // deletion of user must happen before tenant delete (FK constraint)
        await request(app.getHttpServer())
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${adminJwt}`)
            .expect(200);
    });

    it('admin should be able to delete the seeded tenant (cleanup)', async () => {
        // make sure there are no users/websites left - we're deleting the seeded tenant created in beforeAll
        await request(app.getHttpServer())
            .delete(`/tenants/${tenantId}`)
            .set('Authorization', `Bearer ${adminJwt}`)
            .expect(200);
    });
});
