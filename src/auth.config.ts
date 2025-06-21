import NextAuth, { type NextAuthConfig } from 'next-auth';
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
            console.log("🚀 ~ authorized ~ auth:", auth);

            const isLoggedIn = !!auth?.user;
            const isAdmin = auth?.user?.role === 'admin';
            const isAdminPage = nextUrl.pathname.startsWith('/admin');

            if (isAdminPage) {
                return isAdmin;
            }

            return true;
        },
        jwt({ token, user }) {

            if (user) {
                token.data = user;
            };

            return token;
        },
        session({ session, token, user }) {

            console.log({ session, token, user });
            session.user = token.data as any;
            return session;
        }
    },
    providers: [
        credentials({

            async authorize(credentials) {
                const parsedCredentials = z.object({
                    email: z.string().email().nonempty('Email es requerido'),
                    password: z.string().min(8).nonempty('sad')
                }).safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                //* Buscar correo
                const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

                if (!user) return null;

                //* Comparar passwords
                if (!bcryptjs.compareSync(password, user.password)) return null;

                //* Regresar el usuario sin password
                const { password: _, ...rest } = user;

                console.log({ rest });

                return rest;
            }
        }),
    ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);