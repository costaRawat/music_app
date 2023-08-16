import React, { useState } from 'react'
import { useUserAuth } from '../context/UserAuthContext';
import { Box, Button, Grid, Typography } from "@mui/material";
const SignUp = ({loginViewHandler}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useUserAuth();
  const signUpHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(email, password);
      loginViewHandler(true)
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <Box>
    {" "}
    <form className="form__container flex__column gap__20px"  onSubmit={signUpHandler}>
    {error && <Box sx={{padding:'1rem',background:'orange',color:'white',borderRadius:'8px',fontWeight:'600'}}>{error}</Box>}
      <Box className="flex__column gap__5px">
        {" "}
        <label htmlFor="Email" className="white__color__typo__500" >Email</label>
        <input type="text" id="Email" className="inp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </Box>
      <Box className="flex__column gap__5px">
        {" "}
        <label htmlFor="Password" className="white__color__typo__500">Password</label>
        <input    type="password" id="Password" className="inp" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <Typography  variant="h6"  sx={{fontWeight:'500',color:'white'}} align="right" >Forgot Password</Typography>
      </Box>
      <Button className="login__btn" type="submit">Sign Up</Button>
      <Typography variant="h6"  sx={{fontWeight:'500',color:'white'}}>
        Already have an account?{" "}
        <Button component="span" style={{ color: "blue",cursor:'pointer',fontSize:'1rem',padding:'0' }}  onClick={()=>loginViewHandler(true)}>
          Sign In
        </Button>
      </Typography>
    </form>
  </Box>
  )
}

export default SignUp