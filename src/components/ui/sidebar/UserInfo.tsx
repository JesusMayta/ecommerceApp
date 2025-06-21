'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { IoPerson } from 'react-icons/io5';

export const UserInfo = () => {

    const { data: session } = useSession();

    const isAuthenticated = !!session?.user;

    return (
        <>
            {
                isAuthenticated && (
                    <div className="absolute bottom-3 w-full">
                        <div className="border-t border-gray-300 py-1 me-6" />
                        <div className="flex items-center">
                            <IoPerson size={30} className="border border-gray-600 text-white rounded-full py-1 bg-gray-950" />
                            <span className="ml-2.5 text-sm font-semibold">{session.user.name}</span>
                        </div>
                        <small className="ml-10 font-medium">{session.user.email}</small>
                    </div>
                )
            }
        </>
    )
}
