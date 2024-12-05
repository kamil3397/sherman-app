import { PropsWithChildren } from "react"
import { AuthProvider } from "./AuthContext"
import { AlertProvider } from "./AlertContext"

export const ContextProvider = ({ children }: PropsWithChildren) => {
    return (
        <AlertProvider>
            <AuthProvider>
            {children}
            </AuthProvider>
        </AlertProvider>
    )
}