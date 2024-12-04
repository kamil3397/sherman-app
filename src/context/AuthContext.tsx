import { FC, ReactNode, useContext, createContext, useState } from "react";
import { makeRequest } from "../hooks/makeRequest";

interface AuthContextProps {
    loginClient: (values: LoginData) => Promise<void>
    logoutClient: () => Promise<void>
}
interface UserType {
    _id: string
    name: string
    lastName: string,
    password?: string,
    email: string
}

interface LoginData {
    email: string,
    password: string,
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType>();

    const loginClient = async (values: LoginData) => {
        await makeRequest('POST', '/login', values)
            .then((response) => {
                const userData = response?.data;
                if (userData && userData.user._id) {
                    localStorage.setItem('userId', userData.user._id);
                    localStorage.setItem('accessToken', userData.accessToken)
                    setUser(userData.user);
                } else { console.error("Invalid user data received") }
            })
            .catch((error) => { throw new Error(error) });
    }

    const logoutClient = async () => {
        return await makeRequest('POST', '/logout')
            .then(() => {
                localStorage.removeItem('userId')
                localStorage.removeItem('accessToken')
                setUser(undefined)
            })
            .catch((error) => {
                throw new Error('Error during logout:', error);
            })
    }



    return (
        <AuthContext.Provider value={{
            loginClient,
            logoutClient
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuthContext = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used in AuthProvider');
    }
    return context;
}