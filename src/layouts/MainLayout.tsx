import { Footer, NavigationBar } from 'components';
import { FC } from 'react';
import { Outlet } from 'react-router'; // https://api.reactrouter.com/v7/functions/react_router.Outlet.html
import { useTheme } from '@mui/material/styles';

export const MainLayout: FC = () => {

  const theme = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <NavigationBar />
      <div style={{ flex: 1, backgroundColor: theme.palette.primary.light }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
