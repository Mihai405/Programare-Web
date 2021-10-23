import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useAuthContext } from "./Auth/AuthContext";
import { Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  let history = useHistory();

  const { user, onLogout } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout(e) {
    e.preventDefault();
    onLogout();
    return history.push('/');
  }

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            id="drop-down-button"
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>PC/Perificerice</MenuItem>
            <MenuItem onClick={handleClose}>Electrocasnice</MenuItem>
            <MenuItem onClick={handleClose}>Haine</MenuItem>
          </Menu>
          <Button
            onClick={() => {
              return history.push("/");
            }}
            color="inherit"
          >
            Shop
          </Button>
          {(!user || !user.email) && (
            <>
              <Button
                onClick={() => {
                  return history.push("/login");
                }}
                style={{ marginLeft: "auto" }}
                color="inherit"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  return history.push("/register");
                }}
                color="inherit"
              >
                Register
              </Button>
            </>
          )}
          {user && user.email && (
            <>
              <Typography variant="subtitle2" style={{ marginLeft: "auto" }}>
                Welcome {user.email}!{" "}
              </Typography>
              <IconButton
                aria-label="shoppingCart"
                size="large"
                color="inherit"
                onClick={() => history.push("/cart")}
              >
                <ShoppingCartIcon />
              </IconButton>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
