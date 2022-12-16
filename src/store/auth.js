import axios from 'axios';
const auth = (state = {}, action) => {
  if (action.type === 'SET_AUTH') {
    return action.auth;
  }
  return state;
};

export const logout = (navigate) => {
  return async (dispatch) => {
    window.localStorage.removeItem('token');
    dispatch({ type: 'SET_AUTH', auth: {} })
    navigate('/');
  }
};

export const loginWithToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: 'SET_AUTH', auth: response.data });
    }
  };
};

export const updateAuth = (auth) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.put('/api/auth', auth, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: 'SET_AUTH', auth: response.data });
  };
};

export const attemptLogin = (credentials, navigate) => {
  return async (dispatch) => {
    const response = await axios.post('/api/auth', credentials);
    window.localStorage.setItem('token', response.data);
    dispatch(loginWithToken());
    navigate('/');
  };
};

export const register = (credentials, navigate) => {
  return async (dispatch) => {
    const response = await axios.post('/api/auth/register', credentials);
    window.localStorage.setItem('token', response.data);
    dispatch(loginWithToken());
    navigate('/');
  };
};

export const fetchGoogleUser = () => {
  const access_token = window.location.href.split('=')[1].toString();
  const accessToken = access_token;

  return async (dispatch) => {
    const response = await axios.get(
      'https://www.googleapis.com/auth/userinfo.profile',
      {
        header: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch({ type: 'SET_AUTH', auth: response.data });
  };
};

export default auth;
