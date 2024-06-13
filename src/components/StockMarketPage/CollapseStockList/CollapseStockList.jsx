import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Stack, Typography } from '@mui/material';

const CollapseStockList = ({ initialStockList, remainingStockList, setSelectedStockSymbol }) => {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const handleStockClick = (stockModel) => {
        setSelectedStockSymbol(stockModel);
    }

    return (
        <Box>
            <Stack spacing={2}>
                {Object.keys(initialStockList).map((key) => {
                    const stock = initialStockList[key];
                    const backgroundColor = stock.dp > 0 ? "#84c391" : "#eb8c84";
                    return (
                        <Stack
                            key={key}
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                marginTop: "0",
                                borderBottom: "grey solid 1px",
                                paddingY: "6px",
                                cursor: "pointer",
                                '&:hover': { backgroundColor: "#f0f0f0" }
                            }}
                            onClick={() => handleStockClick(stock)}
                        >
                            <Stack>
                                <Typography sx={{ fontSize: { xs: "1rem", lg: "1.2rem" }, fontWeight: "600" }}>
                                    {stock.companyName}
                                </Typography>
                                <Typography sx={{ fontSize: { xs: "0.9rem", lg: "16px" } }}>
                                    ${stock.c.toFixed(2)}
                                </Typography>
                            </Stack>
                            <Typography sx={{ backgroundColor, width: "80px", borderRadius: "6px", padding: "3px" }} textAlign="center">
                                {stock.dp.toFixed(2)}%
                            </Typography>
                        </Stack>
                    );
                })}
                {expanded && Object.keys(remainingStockList).map((key) => {
                    const stock = remainingStockList[key];
                    const backgroundColor = stock.dp > 0 ? "#84c391" : "#eb8c84";
                    return (
                        <Stack
                            key={key}
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                marginTop: "0",
                                borderBottom: "grey solid 1px",
                                paddingY: "6px",
                                cursor: "pointer",
                                '&:hover': { backgroundColor: "#f0f0f0" }
                            }}
                            onClick={() => handleStockClick(stock)}
                        >
                            <Stack>
                                <Typography sx={{ fontSize: { xs: "1rem", lg: "1.2rem" }, fontWeight: "600" }}>
                                    {stock.companyName}
                                </Typography>
                                <Typography sx={{ fontSize: { xs: "0.9rem", lg: "16px" } }}>
                                    ${stock.c.toFixed(2)}
                                </Typography>
                            </Stack>
                            <Typography sx={{ backgroundColor, width: "80px", borderRadius: "6px", padding: "3px" }} textAlign="center">
                                {stock.dp.toFixed(2)}%
                            </Typography>
                        </Stack>
                    );
                })}
            </Stack>
            <Button onClick={handleToggle} sx={{ width: "120px", borderRadius: "25px", marginTop: "10px", border: "grey solid 2px" }}>
                {expanded ? "Show Less" : "Show More"}
            </Button>
        </Box>
    );
};

CollapseStockList.propTypes = {
    initialStockList: PropTypes.object.isRequired,
    remainingStockList: PropTypes.object.isRequired,
    setSelectedStockSymbol: PropTypes.func.isRequired,
};

export default CollapseStockList;
