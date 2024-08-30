import { useEffect, useState, createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await fetch("http://localhost:3000/api/users", {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    if (response.status === 401) {
                        // Token expired or unauthorized
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        setToken(null);
                        setUser(null);
                        return;
                    }

                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }

                    const data = await response.json();
                    setUser(data.user || {});
                } catch (error) {
                    console.error("Failed to fetch user", error);
                    // Clear user and token on error
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setToken(null);
                    setUser(null);
                }
            } else {
                setUser(null); // Clear user if token is missing
            }
        };

        fetchUser();
    }, [token]);

    // Optionally, trigger a re-render if user/token is cleared
    const handleClearAuth = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, handleClearAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
