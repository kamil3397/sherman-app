import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { FC } from "react";
import tagLogo from '../../images/shermanTag.jpg';


const NewsSection: FC = () => {
    return (
        <Box sx={{ py: 4, px: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Latest News
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {/* News Card */}
                {[1, 2, 3].map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://via.placeholder.com/300"
                                alt="News Image"
                            />
                            <CardContent>
                                <Typography variant="h6">News Title {index + 1}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
export default NewsSection