import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth.config';

export async function middleware(request: NextRequest) {
    // Obtener la sesión usando auth()
    const session = await auth();

    // Verificar rutas de admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Si no hay sesión, redirigir al login
        if (!session) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        // Verificar el rol del usuario
        const userRole = session.user?.role; // Asumiendo que el role está en session.user.role

        if (userRole !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        // Puedes agregar más rutas protegidas aquí
    ],
};