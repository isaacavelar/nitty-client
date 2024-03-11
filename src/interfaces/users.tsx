export interface User {
    email: string;
    password: string;
    name: string;
    ingleslevel: string;
    dailyStudyTime: number;
}

export interface CreateUserResponse {
    message: string;
    user: User;
}