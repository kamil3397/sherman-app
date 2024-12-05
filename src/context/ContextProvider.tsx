import { PropsWithChildren } from "react"
import { AuthProvider } from "./AuthContext"

export const ContextProvider = ({ children }: PropsWithChildren) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}