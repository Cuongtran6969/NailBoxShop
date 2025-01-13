import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { introspect } from "@/apis/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const refresh = async () => {
        const token = Cookies.get("accessToken");

        if (!token) {
            setAuthenticated(false);
            return;
        }
        try {
            const result = await introspect(token);
            setAuthenticated(result.valid);
        } catch (error) {
            console.error("Error introspecting token:", error);
            setAuthenticated(false);
        }
    };
    useEffect(() => {
        refresh();
    }, []);

    return (
        <AuthContext.Provider value={{ authenticated, refresh, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
