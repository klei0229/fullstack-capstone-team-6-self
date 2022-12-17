import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store';
import BusinessDashboard from './BusinessDashboard';
import { Avatar, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import Login from './Login';

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Card>
      {auth.id ? (
        <div>
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
