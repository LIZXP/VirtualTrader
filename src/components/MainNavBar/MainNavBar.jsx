import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import piggyLogo from "../../assets/piggy-bank.png";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

const pages = [
  { name: "Stocks", icon: CurrencyExchangeIcon },
  { name: "News", icon: NewspaperIcon },
  { name: "Contact", icon: PermContactCalendarIcon },
];

function MainNavBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#2e2e2e",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* <---------------------------------------------------------Hamberger Menu Start ------------------------------------------------------------------> */}

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls={open ? "MainPageNavMenu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 2,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
              "&:focus": {
                outline: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="MainPageNavMenu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.name}
                onClick={handleClose}
                sx={{
                  width: "150px",
                  alignItems: "center",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                {page.name}
              </MenuItem>
            ))}
          </Menu>

          {/* <---------------------------------------------------------Hamberger Menu End ------------------------------------------------------------------> */}

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <img src={piggyLogo} style={{ width: "51px" }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                alignContent: "center",
                paddingTop: "10px",
                marginLeft: "10px",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Virtual Trader
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "right",
              mr: "30px",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                size="large"
                sx={{
                  my: 2,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  padding: "10px 21px",
                  "& > *:first-of-type": {
                    marginRight: 1,
                    fontSize: "24px",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                }}
                startIcon={<page.icon />}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Button
            color="inherit"
            size="large"
            sx={{
              alignSelf: "flex-start",
              fontWeight: "bold",
              mt: "8px",
              "&:focus": {
                outline: "none",
              },
            }}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainNavBar;
