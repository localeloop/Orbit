/**
 * JwtStrategy
 * 
 * Passport JWT strategy for validating JWT tokens in requests.
 * Extracts JWT from the Authorization header and verifies it using the secret.
 * Provides user payload to request after successful validation.
 * 
 * @author Joshua Rene Burger
 * @version 0.01
 * @date 14-10-2025
 */

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    /**
     * Validate the JWT payload.
     *
     * @param payload - Decoded JWT payload
     * @returns Object containing user information to attach to request
     */
    async validate(payload: any) {
        return {
            id: payload.sub,
            email: payload.email,
            tenantId: payload.tenantId,
            role: payload.role
        }
    }
}