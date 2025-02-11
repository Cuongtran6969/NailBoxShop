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
            setUser(null);
            return;
        }
        try {
            const result = await introspect();
            setUser({
                role: result.role,
                name: result.name,
                avatar: result.avatar
            });
            setAuthenticated(true);
        } catch (error) {
            console.error("Error introspecting token:", error);
            setAuthenticated(false);
            setUser(null);
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
