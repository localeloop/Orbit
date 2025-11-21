export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'SUPER_SECRET_KEY',
    expiresIn: '1h' as const,
};
