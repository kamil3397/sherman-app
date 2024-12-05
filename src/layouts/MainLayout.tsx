import { Footer, NavigationBar } from "components";
import { FC } from "react";
import { Outlet } from "react-router-dom"; //https://api.reactrouter.com/v7/functions/react_router.Outlet.html

export const MainLayout: FC = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <NavigationBar />
            <div style={{ flex: 1 }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};