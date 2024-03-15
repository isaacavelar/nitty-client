export interface Auth {
    accessToken: string
    refreshToken: string
    expiresIn: number
}

export interface AuthRefreshTokenPayload {
    token: string
}

export interface AuthPayload {
    email: string;
    password: string;
}
