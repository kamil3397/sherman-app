import { FC } from 'react';
import { Box } from '@mui/material';
import { HeroSection, InstagramSection, NewsSection } from './components';

const HomePage: FC = () => {
    return (
        <Box>
            <HeroSection />
            <NewsSection />
            <InstagramSection />
        </Box>
    );
};

export default HomePage;
