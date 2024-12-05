import { Box, Card, CardMedia, Typography } from "@mui/material"
import { FC } from "react"
import Grid from '@mui/material/Grid';
import logo from 'images/shermanLog.jpg'
import catchPhrase from 'images/shermanCatch.jpg'

const instagramPosts = [
    {
        image: logo,
        link: 'https://www.instagram.com/reel/DCj2iIwszHX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
        image: catchPhrase,
        link: 'https://www.instagram.com/reel/DBnu9sJMdF3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
        image: logo,
        link: 'https://www.instagram.com/reel/C6ZHDRYKk9s/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    }
];

export const InstagramSection: FC = () => {
    return (
        <Box sx={{ py: 4, px: 2, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h4" align="center" gutterBottom>
                From Instagram
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {instagramPosts.map((post, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <a href={post.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={post.image}
                                    alt={`Instagram Post ${index + 1}`}
                                />
                            </Card>
                        </a>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
