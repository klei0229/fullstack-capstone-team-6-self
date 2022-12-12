import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store';
import BusinessDashboard from './BusinessDashboard';
import { Avatar, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import Login from './Login';
import Restaurants from './Restaurants';

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Card>
      {auth.id ? (
        <div>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              variant='h1'
              gutterBottom
            >
              Welcome, {auth.username}!
            </Typography>
            <br />
            <Avatar src={auth.avatar} />
            <br />
            <Button variant='outlined' onClick={() => dispatch(logout(navigate))}>
              Logout
            </Button>
          </CardContent>
          <CardActions>
            <BusinessDashboard />
          </CardActions>
        </div>
      ) : (
        <CardContent>
          <Login />
        </CardContent>
      )}
    </Card>
  );
};

export default Home;
