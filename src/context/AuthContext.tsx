import { createContext, useState, useContext, ReactNode } from "react";
import { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";

// skapa context
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (credentials: LoginCredentials) => {
        console.log(credentials);
        try {
            const res = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            if (!res.ok) throw new Error("Inloggning misslyckades!");

            const data = await res.json() as AuthResponse;
            console.log(data);
            localStorage.setItem('yarnToken', data.token);
            setUser(data.user);
        } catch (error) {
            throw error;
        }
    }

    const logout = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("yarnToken")
                },
            })
            if (!response.ok) throw new Error("Fel vid utlogging");

            // Ta bort token ur localstorage och nollställ user-state
            localStorage.removeItem("yarnToken");
            setUser(null);
        } catch (error) {
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuth måste användas inom en AuthProvider");
    return context;
}