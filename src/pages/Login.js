import React, { useState } from "react";
import Container from "@mui/material/Container";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  
  const navigate = useNavigate();
  const [loginView, setLoginView] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const loginViewHandler = (bool) => {
    setLoginView(bool);
    setError("");
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        paddingBottom: "2rem",
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(237,30,36,1) 60%, rgba(0,212,255,1) 100%)",
      }}
    >
      {" "}
      <Container maxWidth="lg">
        <header className="header">
          <Box>
            <img
              src="https://www.creativefabrica.com/wp-content/uploads/2022/09/11/music-logo-vector-template-design-Graphics-38239116-1.jpg"
              alt="logo"
              style={{
                width: "100px",
                borderRadius: "8rem",
                padding: "10px 0",
              }}
            />
          </Box>
          <ul className="flex gap__20px white__color__typo__500">
            <li>Premium</li>
            <li>Support</li>
            <li>Download</li>
            <li onClick={()=> loginViewHandler(false)}>SignIn</li>
            <li onClick={()=> loginViewHandler(true)}>LogIn</li>
          </ul>
        </header>
        <Grid container className="mt__20px" rowGap="4rem">
          <Grid
            container
            item
            flexDirection="column"
            rowGap="10rem"
            xs={12}
            md={6}
          >
            <Typography variant="h2" sx={{ fontWeight: "700", color: "white" }}>
              Create New Account <br /> 
              Already Registered Login
            </Typography>
            <Box display="flex" flexDirection="column" rowGap="1rem">
              <Typography
                variant="h3"
                sx={{ fontWeight: "500", color: "white" }}
              >
                Get 3 Month Of Premium For Free
              </Typography>
              <div>
                {" "}
                <Button className="premiun__btn">Get 3 Month Membership</Button>
              </div>

              <Typography
                variant="h5"
                sx={{ fontWeight: "500", color: "white" }}
              >
                Enjoy ad-free music listening, offline playback, and more,
                cancel anytime
              </Typography>
            </Box>
          </Grid>
          <Grid container item xs={12} md={6} justifyContent="center">
            {loginView ? (
              <Box>
                <form
                  className="form__container flex__column gap__20px"
                  onSubmit={loginHandler}
                >
                  {error && (
                    <Box
                      sx={{
                        padding: "1rem",
                        background: "orange",
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: "600",
                      }}
                    >
                      {error}
                    </Box>
                  )}
                  <Box className="flex__column gap__5px">
                    {" "}
                    <label htmlFor="Email" className="white__color__typo__500">
                      Email
                    </label>
                    <input
                      type="text"
                      id="Email"
                      className="inp"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Box>

                  <Box className="flex__column gap__5px">
                    {" "}
                    <label
                      htmlFor="Password"
                      className="white__color__typo__500"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="Password"
                      className="inp"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "500", color: "white" }}
                      align="right"
                    >
                      Forgot Password
                    </Typography>
                  </Box>

                  <Button className="login__btn" type="submit">
                    Sign In
                  </Button>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "500", color: "white" }}
                  >
                    Don't Have an account ?{" "}
                    <Button
                      component="span"
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        fontSize: "1rem",
                        padding: "0",
                      }}
                      onClick={() => loginViewHandler(false)}
                    >
                      Sign Up
                    </Button>
                  </Typography>
                </form>
              </Box>
            ) : (
              <SignUp loginViewHandler={loginViewHandler} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
