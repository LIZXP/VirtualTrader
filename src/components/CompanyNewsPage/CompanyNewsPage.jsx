import { Card, Grid, Stack, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

const CompanyNewsPage = ({ companyNewsArray }) => {

    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const getTimeAgo = (timestamp) => {
        const timePublished = new Date(timestamp * 1000);
        const timeNow = new Date();
        const difference = timeNow - timePublished;
        const minutesAgo = Math.floor(difference / 60000);
        const hoursAgo = Math.floor(minutesAgo / 60);

        if (hoursAgo > 0) {
            return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
        } else {
            return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
        }
    };

    const getCompanyNewsList = () => {
        if (!companyNewsArray) {
            return [];
        }

        const initialCompanyNewsList = companyNewsArray.slice(0, 3);

        return expanded ? companyNewsArray : initialCompanyNewsList;
    };

    return (
        <>
            <Card sx={{ backgroundColor: "transparent" }}>
                {companyNewsArray ? getCompanyNewsList().map((news, i) => (
                    <Grid container key={i} sx={{ width: "95%", marginX: "auto", borderTop: "grey solid 1px", paddingY: "10px" }} spacing={0.5}>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction={"row"}>
                                <Typography sx={{ fontSize: "0.8rem" }}>Source: {news.source}</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography
                                sx={{
                                    fontSize: { xs: "0.85rem", sm: "1.2rem", md: "1.20rem", lg: "1.5rem", xl: "1.6rem" },
                                    fontWeight: "600",
                                    paddingRight: "5px",
                                    '& a': {
                                        color: '#6699ff',
                                        textDecoration: 'none',
                                    },
                                    '& a:visited': {
                                        color: '#6699ff',
                                    },
                                    '& a:hover': {
                                        color: '#6699ff',
                                        textDecoration: 'underline',
                                    },
                                    '& a:active': {
                                        color: '#6699ff',
                                    },
                                }}
                            >
                                <a href={news.url} target="_blank" rel="noopener noreferrer">{news.headline}</a>
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ flexShrink: 0 }}>
                            <img src={news.image} alt="News" style={{ width: "100%", borderRadius: "10px" }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem", md: "0.9rem" }, fontWeight: "500", textAlign: "right" }} >{getTimeAgo(news.datetime)}</Typography>
                        </Grid>
                    </Grid>
                )) : (
                    <Typography variant="h6">No news to display</Typography>
                )}

            </Card>
            {companyNewsArray && companyNewsArray.length > 3 && (
                <Button onClick={handleToggle} sx={{ marginTop: 2, width: "120px", borderRadius: "25px", border: "grey solid 2px" }}>
                    {expanded ? "Collaps News" : "More News"}
                </Button>
            )}
        </>
    )
}

CompanyNewsPage.propTypes = {
    companyNewsArray: PropTypes.array
}

export default CompanyNewsPage;
