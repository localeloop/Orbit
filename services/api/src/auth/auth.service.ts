/**
 * AuthService
 * 
 * Service responsible for authentication logic.
 * Validates user credentials, handles login, and issues JWT tokens.
 * Integrates with UsersService for user retrieval and bcrypt for password verification.
 * 
 * @author Joshua Rene Burger
 * @version 0.01
 * @date 14-10-2025
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    /**
    * Validates user credentials.
    *
    * @param email - User email
    * @param password - Plaintext password
    * @returns User object if valid, otherwise null
    */
    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return user;
    };

    /**
    * Logs in a user by validating credentials and issuing a JWT.
    *
    * @param email - User email
    * @param password - User password
    * @throws UnauthorizedException if credentials are invalid
    * @returns Object containing JWT access token
    */
    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const payload = {
            sub: user.id,
            email: user.email,
            tenantId: user.tenantId,
            role: user.role
        };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}