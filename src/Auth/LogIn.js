import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Grid, Paper, Typography } from "@material-ui/core";
import "./Auth.css";
import { useAuthContext } from "./AuthContext";
import { Redirect } from "react-router";
import { Alert } from "@mui/material";

export function LogIn() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    errorMesage: "",
  });

  const [role, setRole] = useState(null);

  const { onLogin } = useAuthContext();

  const handleInputChange = (event) => {
    const newErrors = { ...errors };
    newErrors[event.target.id] = "";
    setErrors(newErrors);
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  const formIsValid = () => {
    const newErrors = { ...errors };
    let isValid = true;
    const validEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!validEmail.test(String(values.email).toLowerCase())) {
      newErrors.email = "Email is not valid";
      isValid = false;
    }

    if (values.password.length < 4) {
      newErrors.password = "Password is not long enough";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formIsValid()) return;

    const response = await fetch("http://127.0.0.1:8000/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    const { token, user } = { ...response };

    if (token) {
      onLogin(token, user);
      setRole(user.role);
    }

    if (!token) {
      setErrors({ ...errors, errorMesage: "The credentials are not valid" });
    }
  }

  return (
    <>
      {(role === "user" && <Redirect to="/" />) ||
        (role === "admin" && <Redirect to="/admin/products" />)}
      <Grid>
        <Paper elevation={20} className="paper">
          <Grid align="center">
            <Avatar sx={{ bgcolor: "#008000" }}>
              <AccountCircleIcon />
            </Avatar>
            <h1 id="headerText">LogIn</h1>
            <Typography variant="subtitle1" gutterBottom>
              Sign in into your account !
            </Typography>
            <div>
              {errors.errorMesage !== "" ? (
                <Alert severity="error">{errors.errorMesage}!</Alert>
              ) : null}
            </div>
          </Grid>
          <form onSubmit={handleSubmit} noValidate>
            <div>
              <TextField
                fullWidth
                error={errors.email !== "" ? true : false}
                type="email"
                id="email"
                label="Email"
                onChange={handleInputChange}
                value={values.email}
                helperText={errors.email}
              />
            </div>
            <div>
              <TextField
                fullWidth
                error={errors.password !== "" ? true : false}
                type="password"
                id="password"
                label="Password"
                onChange={handleInputChange}
                value={values.password}
                helperText={errors.password}
              />
            </div>
            <div align="center">
              <Button variant="contained" type="submit">
                Sign In
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </>
  );
}
