// ✅ src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

// Function to inject/remove token into axios headers
export const setTokenInHolder = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
    }
};


const AuthContext = createContext({
    accessToken: null,
    role: null,
    movieTypes: [],
    login: (token, role, movieTypes) => { },
    logout: () => { },
    isLoading: true,
});

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [role, setRole] = useState(null);
    const [movieTypes, setMovieTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const login = (token, role, movieTypes) => {
        setAccessToken(token);
        setRole(role);
        setMovieTypes(movieTypes);
        setTokenInHolder(token);
    };

    const logout = () => {
        setAccessToken(null);
        setRole(null);
        setMovieTypes([]);
        setTokenInHolder(null);
        sessionStorage.clear(); 
        navigate("/signin", { replace: true });
    };

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const res = await axiosInstance.post("/auth/refresh", {}, { withCredentials: true });
                setAccessToken(res.data.accessToken);
                setRole(res.data.role?.toUpperCase().trim());
                setMovieTypes(res.data.movieTypes || []);
                setTokenInHolder(res.data.accessToken);
            } catch (error) {
                console.error("Token refresh failed:", error);
                logout();
            } finally {
                setIsLoading(false);
            }
        };
        refreshToken();
    }, []);

    return (
        <AuthContext.Provider value={{ accessToken, role, movieTypes, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
