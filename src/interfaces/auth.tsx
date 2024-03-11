export interface Auth {
    accesToken: string
    expiresIn: number
    refreshToken: string
}

export interface AuthPayload {
    email: string;
    password: string;
}
