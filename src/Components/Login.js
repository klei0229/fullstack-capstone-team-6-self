import React, { useState, useEffect } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deepmerge } from '@mui/utils';
import {
  useColorScheme,
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendMuiTheme,
} from '@mui/material/styles';
import { extendTheme as extendJoyTheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import { Link } from 'react-router-dom';
import { blue, grey } from '@mui/material/colors';

export const palette = {
  primary: {
    ...blue,
    solidColor: 'var(--mui-palette-primary-contrastText)',
    solidBg: 'var(--mui-palette-primary-main)',
    solidHoverBg: 'var(--mui-palette-primary-dark)',
    plainColor: 'var(--mui-palette-primary-main)',
    plainHoverBg:
      'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
    plainActiveBg: 'rgba(var(--mui-palette-primary-mainChannel) / 0.3)',
    outlinedBorder: 'rgba(var(--mui-palette-primary-mainChannel) / 0.5)',
    outlinedColor: 'var(--mui-palette-primary-main)',
    outlinedHoverBg:
      'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
    outlinedHoverBorder: 'var(--mui-palette-primary-main)',
    outlinedActiveBg: 'rgba(var(--mui-palette-primary-mainChannel) / 0.3)',
  },
  neutral: {
    ...grey,
  },
  divider: 'var(--mui-palette-divider)',
  text: {
    tertiary: 'rgba(0 0 0 / 0.56)',
  },
};

export const sheetStyle = {
  width: 400,
  mx: 'auto',
  my: 4,
  py: 3,
  px: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  borderRadius: 'sm',
  boxShadow: 'md',
};

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

export function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials, navigate));
  };
  return (
    <CssVarsProvider theme={theme}>
      <ModeToggle />
      <Sheet sx={{ ...sheetStyle }}>
        <div>
          <Typography level="h4" component="h1">
            Welcome to MenYou!
          </Typography>
          <Typography level="body2">Sign in to continue.</Typography>
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
      <div>
        <a href="/google/login">
          <h4> Login with Google </h4>
        </a>
      </div>
        <Button sx={{ mt: 1 }} onClick={login}>
          Log in
        </Button>
        <Typography
          endDecorator={<Link to="/register">Sign up</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Don't have an account?
        </Typography>
      </Sheet>
    </CssVarsProvider>
  );
};

export default Login;
