export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    token: string;
    language: string;
    accessToken?: string;
    imageUrl?: string;
}
