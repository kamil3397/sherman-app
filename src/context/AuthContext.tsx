import { FC, ReactNode, useContext, createContext } from "react";
import { makeRequest } from "../hooks/makeRequest";

interface AuthContextProps {
    registerClient: (values: RegisterData) => Promise<void>

}

interface RegisterData {
    name: string;
    lastName: string;
    email: string;
    password: string;

}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const registerClient = async (values: RegisterData) => {
        await makeRequest('POST', '/register', values)
            .catch((error) => {
                throw new Error(error)
            })
    }

    const contextValues = {
        registerClient
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