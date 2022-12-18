import React from 'react';
import { useSelector } from 'react-redux';
import Restaurants from './Restaurants';
import { Card, CardActions, CardContent, Container, Paper } from '@mui/material';
import Login from './Login';

const Home = () => {
  const { auth } = useSelector((state) => state);

  return (
    <Paper sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: 'whitesmoke', width: '100%' }}>
      <Card>
        {auth.id ? (
          <div>
            <CardActions>
              <Restaurants />
            </CardActions>
          </div>
        ) : (
          <CardContent>
            <Login />
          </CardContent>
        )}
      </Card>
    </Paper>
  );
};

export default Home;
