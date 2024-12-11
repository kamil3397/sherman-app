import { FC, ReactNode, useContext, createContext, useState } from "react";
import { makeRequest } from "../hooks/makeRequest";
import { useAlertContext } from "./AlertContext";

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
    const { showSuccessAlert, showErrorAlert } = useAlertContext();
    const [user, setUser] = useState<UserType>();

    const loginClient = async (values: LoginData) => {
        await makeRequest('POST', '/login', values)
            .then((response) => {
                const userData = response?.data;
                if (userData && userData.user._id) {
                    localStorage.setItem('userId', userData.user._id);
                    localStorage.setItem('accessToken', userData.accessToken)
                    showSuccessAlert('Successfully logged in')
                    setUser(userData.user);
                }
            })
            .catch((error) => {
                showErrorAlert('Wrong login or password provided')
                throw new Error(error) });
    }

    const logoutClient = async () => {
        return await makeRequest('POST', '/logout')
            .then(() => {
                localStorage.removeItem('userId')
                localStorage.removeItem('accessToken')
                showSuccessAlert('Successfully logged out')
                setUser(undefined)
            })
            .catch((error) => {
                showErrorAlert('Error during logout')
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