import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={() => {return history.push("/")}} color="inherit">Home</Button>
          <Button onClick={() => {return history.push("/login")}} style={{marginLeft:"auto"}} color="inherit">Login</Button>
          <Button onClick={() => {return history.push("/register")}} color="inherit">Register</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
