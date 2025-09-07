
"use client";

import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from "react";

// Types
interface User {
    id: number;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Load saved auth data on refresh
    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("authUser");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, [],);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `http://localhost:5000/users?email=${email}&password=${password}`
            );

            const data = await res.json();

            if (data.length === 0) {
                throw new Error("Invalid credentials");
            }

            const user = data[0];
            const fakeToken = "fake-jwt-token-" + user.id;

            setToken(fakeToken);
            setUser({ id: user.id, email: user.email, role: user.role });

            localStorage.setItem("authToken", fakeToken);
            localStorage.setItem(
                "authUser",
                JSON.stringify({ id: user.id, email: user.email, role: user.role })
            );
        } catch (error) {
            console.error("Login Error:", error);
            alert("Login failed: " + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Check if user already exists
            const checkRes = await fetch(`http://localhost:5000/users?email=${email}`);
            const existingUsers = await checkRes.json();

            if (existingUsers.length > 0) {
                throw new Error("User already exists");
            }

            // Create new user
            const newUser = {
                email,
                password,
                role: "user"
            };

            const res = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            if (!res.ok) {
                throw new Error("Registration failed");
            }
        } catch (error) {
            console.error("Registration Error:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for easy use
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
