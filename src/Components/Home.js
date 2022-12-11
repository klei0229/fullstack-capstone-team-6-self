import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import BusinessDashboard from './BusinessDashboard';
import { Avatar, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import Login from './Login';
import Restaurants from './Restaurants';

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
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
            <Button variant='outlined' onClick={() => dispatch(logout())}>
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
    // <div>
    //   <div>
    //     Welcome, {auth.username}!
    //     <Button variant="outlined" onClick={() => dispatch(logout())}>
    //       Logout
    //     </Button>
    //     {/* <Restaurants /> */}
    //     <BusinessDashboard></BusinessDashboard>
    //   </div>
    // </div>
  );
};

export default Home;
