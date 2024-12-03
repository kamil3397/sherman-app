import React, { FC } from 'react';
import { Box } from '@mui/material';
import NavigationBar from './NavigationBar';
import HeroSection from './HeroSection';
import InstagramSection from './InstagramSection';
import Footer from './Footer';
import NewsSection from './NewsSection';

const HomePage: FC = () => {
    return (
        <Box>
            <NavigationBar />
            <HeroSection />
            <NewsSection />
            <InstagramSection />
            <Footer />
        </Box>
    );
};

export default HomePage;
