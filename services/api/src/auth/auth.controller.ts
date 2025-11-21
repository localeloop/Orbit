/**
 * AuthController
 * 
 * Controller for authentication-related endpoints.
 * Handles user login and delegates authentication logic to AuthService.
 * 
 * @author Joshua Rene Burger
 * @version 0.01
 * @date 14-10-2025
 */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * Login endpoint.
     * Accepts email and password and returns authentication token on success.
     *
     * @param body - Object containing email and password
     * @returns Authentication result (e.g., JWT token)
     */
    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }
}
