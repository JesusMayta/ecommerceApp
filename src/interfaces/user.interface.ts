export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    emailVerify?: Date | null;
    image?: string | null;
};