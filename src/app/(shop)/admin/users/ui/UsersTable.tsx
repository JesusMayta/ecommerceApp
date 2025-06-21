'use client';

import React from 'react';
import { User } from '@/interfaces';
import { changeUserRole } from '@/actions';

interface Props {
    users: User[];
};

export const UsersTable = ({ users }: Props) => {

    return (
        <table className="min-w-full">
            <thead className="bg-gray-200 border-b">
                <tr>
                    <th scope="col" className="px-6 py-4 text-sm font-medium text-left text-gray-900">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-4 text-sm font-medium text-left text-gray-900">
                        Nombre completo
                    </th>
                    <th scope="col" className="px-6 py-4 text-sm font-medium text-left text-gray-900">
                        Rol
                    </th>
                </tr>
            </thead>
            <tbody>

                {users.map(user => (
                    <tr
                        key={user.id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {user.email}
                        </td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            {user.name}
                        </td>
                        <td className="flex items-center px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                            <select
                                value={user.role}
                                className="p-2 w-full text-sm text-gray-900 rounded-md"
                                onChange={(e) => changeUserRole(user.id, e.target.value)}
                            >
                                <option
                                    value="admin"
                                >
                                    Admin
                                </option>
                                <option
                                    value="user"
                                >
                                    User
                                </option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
