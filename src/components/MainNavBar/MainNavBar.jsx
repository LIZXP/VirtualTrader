import { useState } from "react";
import { Box, Button, Grid, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from "@mui/material";
import MobileMenuIcon from "../../assets/mobileMenuIcon.svg";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import "../MainPage/MainPage.style.css"
import { useNavigate } from "react-router-dom";

const pageNavMobile = [
  { name: "Stock Market", icon: <ShowChartIcon />, path: "/stockmarket" },
  { name: "News", icon: <NewspaperIcon />, path: "/news" },
  { name: "Support", icon: <SupportAgentIcon />, path: "/" },
  { name: "Login", icon: <AccountCircleIcon />, path: "/login" },
  { name: "Get Started", icon: <StarBorderIcon />, path: "/signup" }
];

const pageNavMain = [
  { name: "Stock Market", icon: <ShowChartIcon />, path: "/stockmarket" },
  { name: "News", icon: <NewspaperIcon />, path: "/news" },
  { name: "Support", icon: <SupportAgentIcon />, path: "/" }
];

function MainNavBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    handleClose();
    navigate(path);
  }

  return (
    <>
      <Box sx={{ display: { sm: "block", md: "none" } }}>
        <Box className="mobileButtonsGroup" sx={{ width: '100%', height: { xs: '54px', sm: "84px" }, backgroundColor: 'lightgrey', position: "fixed", top: "0", zIndex: "99", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box className="mobileNavBrand" sx={{ flexShrink: 0, marginLeft: "12px" }}>
            <Typography variant="h6" fontFamily={"Rubik,sans-serif "} fontWeight={"800"} sx={{ fontSize: { xs: "2rem", sm: "1.8rem" } }}>VirtualTrader</Typography>
          </Box>
          <Box className="mobileNavButtons" sx={{ marginRight: "12px" }}>
            <Button className="mobileHamburgerMenu" sx={{ width: { xs: "48px", sm: "64px" }, height: { xs: "48px", sm: "64px" } }} disableRipple={true} onClick={handleClick}
              aria-controls={open ? 'mobile-dropDown-menu' : undefined}
            aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}>
              <img className="mobileHamburgerIcon" src={MobileMenuIcon} />
            </Button>
          </Box>
        </Box>
        <Menu
          id="mobile-dropDown-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{ marginLeft: '-24px' }}
        >
          {pageNavMobile.map((item, index) => (
            <MenuItem key={index} onClick={() => { handleNavigate(item.path) }} sx={{ paddingLeft: "20px", minHeight: "48px" }}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box className="mainpageNavBar" sx={{ width: "100%", display: { xs: "none", md: "block" }, position: "fixed", top: "0", backgroundColor: "whitesmoke", zIndex: 99 }}>
        <Grid container spacing={0}>
          <Grid item sx={{ height: "42px", margin: "0 auto" }} md={10} lg={8}>
            <Box className="mainpageNavBarRowOne" sx={{ height: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 10px" }}>
              <Typography variant="h6" fontFamily={"Rubik,sans-serif "} fontWeight={"800"}>VirtualTrader</Typography>
              <Stack direction={"row"}>
                <Button
                  onClick={() => { handleNavigate("/login") }}
                  sx={{
                    fontWeight: "700",
                    color: "#242424",
                    paddingX: "10px", borderRadius: "20px", marginRight: "3px", '&:hover': {
                      backgroundColor: "#666666",
                      color: "white"
                    }
                  }}>Log In</Button>
                <Button
                  onClick={() => { handleNavigate("/signup") }}
                  sx={{
                  borderRadius: "20px", backgroundColor: "#191919", color: "white",
                  paddingX: "10px",
                  '&:hover': {
                    backgroundColor: "#666666"
                  }
                }}>Get Start</Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item sx={{ height: "42px", margin: "0 auto" }} md={10} lg={8} xl={7}>
            <Box className="mainpageNavBarRowTwo" sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}>
              {pageNavMain.map((item, index) => (
                <Button key={index}
                  size="large"
                  sx={{
                    fontWeight: "700",
                    color: "#242424",
                    paddingX: "20px", borderRadius: "20px", '&:hover': {
                      backgroundColor: "#242424",
                      color: "white"
                    }
                  }}
                  onClick={() => { handleNavigate(item.path) }}
                  startIcon={item.icon}
                >{item.name}
                </Button>
              ))}
            </Box>
          </Grid>
          <Box sx={{
            margin: "auto",
            height: "2px",
            backgroundColor: "whitesmoke",
            borderTop: "#242424 solid 1px",
            width: { md: "80%", lg: "70%" },
          }} />
        </Grid>
      </Box>
    </>
  );
}

export default MainNavBar;
