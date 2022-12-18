import React from 'react';
import { useSelector } from 'react-redux';
import Restaurants from './Restaurants';
import { Card, CardActions, CardContent, Container } from '@mui/material';
import Login from './Login';

const Home = () => {
  const { auth } = useSelector((state) => state);

  return (
    <Container sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: 'mintcream' }}>
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
    </Container>
  );
};

export default Home;
