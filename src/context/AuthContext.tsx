import { FC, ReactNode, useContext, createContext, useState } from "react";
import { makeRequest } from "../hooks/makeRequest";

interface AuthContextProps {
    registerClient: (values: RegisterData) => Promise<void>
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

interface RegisterData {
    name: string;
    lastName: string;
    email: string;
    password: string;

}

interface LoginData {
    email: string,
    password: string,
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType>();


    const registerClient = async (values: RegisterData) => {
        await makeRequest('POST', '/register', values)
            .then(() => {
                //+ alert z AlertContext
                window.location.assign('/login'); //podowiedz z GPT, useNavigate wysypywał apke
            })
            .catch((error) => {
                throw new Error(error)
            })
    }

    const loginClient = async (values: LoginData) => {
        return await makeRequest('POST', '/login', values)
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

    const contextValues = {
        registerClient,
        loginClient,
        logoutClient
    }

    return (
        <AuthContext.Provider value={contextValues}>
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