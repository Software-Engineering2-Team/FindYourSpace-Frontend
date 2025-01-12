import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginStore from "../../api/LoginStore";
import Navbar from "../../components/navbar/Navbar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        findaspace.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily:
      "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
});

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setLoginError("");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    console.log(password);
    setLoginError("");
  };

  const fetchData = () => {
    LoginStore.getState()
      .login(username, password)
      .then(() => {
        const userData = LoginStore.getState().userData;
        if (userData) {
          if (userData.username === "admin") {
            navigate("/admin/platform-health");
          } else {
            navigate("/spaces");
          }
        }
      })
      .catch((error) => {
        console.log("Error response content", error);
        setLoginError(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div data-testid="login-1" style={{ paddingTop: "64px" }}>
      <ThemeProvider theme={defaultTheme}>
        <Navbar />
        {/* <div style={{ height: '5px', backgroundColor: 'white' }} />  */}
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://theadfocus.com/wp-content/uploads/2021/12/Times-Square-anthony-rosset-scaled.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center", // Center vertically
            }}
          >
            <Box
              sx={{
                padding: { xs: "24px", md: "32px" },
                margin: { xs: "16px", md: "32px" },
                boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                backgroundColor: "#fff",
                width: { xs: "95%", sm: "80%", md: "60%" }, // Adjust width for responsiveness
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  fontSize: "30px",
                  textAlign: "center",
                }}
              >
                Welcome to Find a Space!
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  autoComplete="username"
                  autoFocus
                  error={!!loginError}
                  helperText={loginError} // Show error message
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                  error={!!loginError}
                  helperText={loginError} // Show error message
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      to="/signup"
                      variant="body2"
                      onClick={() => navigate("/signup")}
                    >
                      {"Create a new account"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Login;
