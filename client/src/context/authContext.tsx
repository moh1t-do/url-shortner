'use client'
import React from 'react';
import { createContext, useState, useContext } from 'react';

type authContextType = {
    user: string | null;
    accessToken: string | null;
    login: (username: string, token: string) => void;
    logout: () => void;
};

const authContextDefaultValues: authContextType = {
    user: null,
    accessToken: null,
    login: (username: string, token: string) => { },
    logout: () => { }
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const login = (username: string, token: string) => {
        setUser(username);
        setAccessToken(token);
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}