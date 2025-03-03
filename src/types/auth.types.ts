export interface User {
    id: string,
    email: string,
    name: string
}

export interface LoginCredentials {
    email: string,
    password: string
}

export interface AuthResponse {
    user: User,
    token: string
}

export interface RegistrationInfo {
    name: string,
    email: string,
    password: string
}

export interface AuthContextType{
    user: User | null,
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    register: (userInfo: RegistrationInfo) => Promise<void>;
}

export const url = "https://yarnblog-service.azurewebsites.net/api"