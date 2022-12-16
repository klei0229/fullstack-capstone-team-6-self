import React, { useState } from 'react';
import { register } from '../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deepmerge } from '@mui/utils';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendMuiTheme,
} from '@mui/material/styles';
import { extendTheme as extendJoyTheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import { Link } from 'react-router-dom';
import { palette, sheetStyle, ModeToggle } from './Login';

const muiTheme = extendMuiTheme();

const joyTheme = extendJoyTheme({
  cssVarPrefix: 'mui',
  colorSchemes: {
    light: { ...palette },
    dark: { ...palette },
  },
  fontFamily: {
    display: '"Roboto","Helvetica","Arial",sans-serif',
    body: '"Roboto","Helvetica","Arial",sans-serif',
  },
  shadow: {
    xs: `var(--mui-shadowRing), ${muiTheme.shadows[1]}`,
    sm: `var(--mui-shadowRing), ${muiTheme.shadows[2]}`,
    md: `var(--mui-shadowRing), ${muiTheme.shadows[4]}`,
    lg: `var(--mui-shadowRing), ${muiTheme.shadows[8]}`,
    xl: `var(--mui-shadowRing), ${muiTheme.shadows[12]}`,
  },
});

const theme = deepmerge(joyTheme, muiTheme);

const Register = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(register(credentials, navigate));
  };
  return (
    <CssVarsProvider theme={theme}>
      <ModeToggle />
      <Sheet sx={{ ...sheetStyle }}>
        <div>
          <Typography level="h4" component="h1">
            Welcome to MenYou!
          </Typography>
          <Typography level="body2">Register to continue.</Typography>
        </div>
        <TextField
          placeholder="username"
          value={credentials.username}
          name="username"
          label="Username"
          onChange={onChange}
        />
        <TextField
          placeholder="password"
          name="password"
          label="Password"
          type="password"
          value={credentials.password}
          onChange={onChange}
        />
        <Button sx={{ mt: 1 }} onClick={login}>
          Register
        </Button>
        <Typography
          endDecorator={<Link to="/login">Sign in</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Already have an account?
        </Typography>
      </Sheet>
    </CssVarsProvider>
  );
};

export default Register;
