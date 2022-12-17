import React from 'react';
import { useSelector } from 'react-redux';
import BusinessDashboard from './BusinessDashboard';
import { Card, CardActions, CardContent } from '@mui/material';
import Login from './Login';

const Home = () => {
  const { auth } = useSelector((state) => state);

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
