import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Grid, Paper, Typography } from "@material-ui/core";
import "./Register.css";

export function Register() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    retypePassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    retypePassword: "",
    passwordMatch: "",
  });

  const handleInputChange = (event) => {
    const newErrors = { ...errors };
    if (
      event.target.id === "password" ||
      event.target.id === "retypePassword"
    ) {
      newErrors.passwordMatch = "";
    }
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

    if (values.password.length < 5) {
      newErrors.password = "Password is not long enough";
      isValid = false;
    }

    if (values.retypePassword === "") {
      newErrors.retypePassword = "RetypePassword is required";
      isValid = false;
    }

    if (values.password !== values.retypePassword) {
      newErrors.passwordMatch = "Password didn't match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formIsValid()) return;

    const { retypePassword, ...safeValues } = values;
    console.log(safeValues);
  };

  return (
    <Grid>
      <Paper elevation={20} className="paper">
        <Grid align="center">
          <Avatar sx={{ bgcolor: "#008000" }}>
            <AccountCircleIcon />
          </Avatar>
          <h1 id="headerText">Register</h1>
          <Typography variant="subtitle1" gutterBottom>
            Please fill this form to create an account !
          </Typography>
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
          <div>
            <TextField
              fullWidth
              error={errors.retypePassword !== "" ? true : false}
              type="password"
              id="retypePassword"
              label="Retype Password"
              onChange={handleInputChange}
              value={values.retypePassword}
              helperText={errors.retypePassword}
            />
          </div>
          <div>
            {errors.passwordMatch !== "" ? (
              <Alert severity="error">{errors.passwordMatch}!</Alert>
            ) : null}
          </div>
          <div align="center">
            <Button variant="contained" type="submit">
              Register
            </Button>
          </div>
        </form>
      </Paper>
    </Grid>
  );
}
