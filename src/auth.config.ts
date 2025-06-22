// auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminPage = nextUrl.pathname.startsWith('/admin');

            if (isAdminPage) {
                if (!isLoggedIn) return false;

                const userRole = auth?.user?.role;
                if (userRole !== 'admin') return false;

                return true;
            }

            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.data = user;
            }
            return token;
        },
        session({ session, token }) {
            // Asignar los datos del token a la sesión
            if (token.data) {
                session.user = token.data as any;
            }
            return session;
        }
    },
    providers: [
        credentials({
            async authorize(credentials) {
                const parsedCredentials = z.object({
                    email: z.string().email(),
                    password: z.string().min(8)
                }).safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                try {
                    // Buscar correo
                    const user = await prisma.user.findUnique({
                        where: { email: email.toLowerCase() }
                    });

                    if (!user) return null;

                    // Comparar passwords
                    if (!bcryptjs.compareSync(password, user.password)) return null;

                    // Regresar el usuario sin password
                    const { password: _, ...rest } = user;

                    return rest;
                } catch (error) {
                    console.error('Error en autorización:', error);
                    return null;
                }
            }
        }),
    ],
};