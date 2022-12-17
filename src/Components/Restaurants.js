import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import Restaurant from './Restaurant';
import AddRestaurant from './AddRestaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';

import { Link } from 'react-router-dom';

const Restaurants = () => {
  const { auth, restaurants, adminRestaurants } = useSelector((state) => state);
  return (
    <div>
      {auth.isAdmin ? (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h1">My Restaurants</Typography>
          <ul>
            {adminRestaurants.map((restaurant) => {
              return (
                <Card key={restaurant.id}>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {restaurant.name} @ {restaurant.address}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body1"
                      color="GrayText"
                      mt={2}
                    >
                      {restaurant.contact} / {restaurant.email}
                    </Typography>
                    <FastfoodIcon />
                    {/* <Avatar>{restaurant.logo}</Avatar> */}
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="GrayText"
                      mt={2}
                    >
                      {restaurant.description}
                    </Typography>
                    <Restaurant restaurant={restaurant} />
                  </CardContent>
                </Card>
              );
            })}
          </ul>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h1">All Restaurants</Typography>
          <ul>
            {restaurants.map((restaurant) => {
              return (
                <Card key={restaurant.id}>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {restaurant.name} @ {restaurant.address}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body1"
                      color="GrayText"
                      mt={2}
                    >
                      {restaurant.contact} / {restaurant.email}
                    </Typography>
                    <FastfoodIcon />
                    {/* <Avatar>{restaurant.logo}</Avatar> */}
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="GrayText"
                      mt={2}
                    >
                      {restaurant.description}
                    </Typography>
                    <Restaurant restaurant={restaurant} />
                  </CardContent>
                </Card>
              );
            })}
          </ul>
        </Box>
      )}
    </div>
  );
};

export default Restaurants;
