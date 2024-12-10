import React, { createContext, useState, ReactNode, useContext, FC } from 'react';
import { Slide, toast, ToastOptions, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type AlertType = 'info' | 'error' | 'success';

interface AlertContextProps {
    showAlert: (message: string, type?: AlertType, options?: ToastOptions) => void;
    showSuccessAlert: (message: string) => void;
    showErrorAlert: (message: string) => void;
}

export const AlertContext = createContext<AlertContextProps | undefined>(undefined);

const defaultToastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
};

const alertIcons: Record<AlertType, JSX.Element> = {
    success: <span>🔫</span>,
    error: <span>💀</span>,
    info: <span>💡</span>,
};

export const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [alert, setAlert] = useState<string | null>(null);

    const showAlert = (message: string, type: AlertType = 'info', options?: ToastOptions) => {
        setAlert(message);
        const finalOptions: ToastOptions = {
            ...defaultToastOptions,
            ...options,
            icon: alertIcons[type],
        };

        switch (type) {
            case 'success':
                toast.success(message, finalOptions);
                break;
            case 'error':
                toast.error(message, finalOptions);
                break;
            case 'info':
                toast.info(message, finalOptions);
                break;
        }
    };

    const showSuccessAlert = (message: string) => {
        showAlert(message, 'success');
    };

    const showErrorAlert = (message: string) => {
        showAlert(message, 'error');
    };

    return (
        <AlertContext.Provider value={{ showAlert, showSuccessAlert, showErrorAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlertContext = (): AlertContextProps => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within a AlertProvider');
    }
    return context;
};
