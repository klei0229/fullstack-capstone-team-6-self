import React from 'react';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import Restaurant from './Restaurant';
import AddRestaurant from './AddRestaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card
      sx={{ backgroundColor: 'aliceblue', alignSelf: 'center' }}
      key={restaurant.id}
    >
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {restaurant.name} @ {restaurant.address}
        </Typography>
        <Typography gutterBottom variant="body1" color="GrayText" mt={2}>
          {restaurant.contact} / {restaurant.email}
        </Typography>
        <FastfoodIcon />
        {/* <Avatar>{restaurant.logo}</Avatar> */}
        <Typography gutterBottom variant="body2" color="GrayText" mt={2}>
          {restaurant.description}
        </Typography>
        <Restaurant restaurant={restaurant} />
      </CardContent>
    </Card>
  );
};

const Restaurants = () => {
  const { auth, restaurants, adminRestaurants } = useSelector((state) => state);

  const restaurantsManaged = restaurants.filter(
    (restaurant) => restaurant.userId === auth.id
  );

  const otherRestaurants = restaurants.filter(
    (restaurant) => restaurant.userId !== auth.id
  );

  console.log('restaurants managed: ', restaurantsManaged);
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box>
        <Typography gutterBottom variant="h1" alignSelf="center">
          My Restaurants
        </Typography>
        <AddRestaurant />
        <ul>
          {restaurantsManaged.map((restaurant) => {
            return (
              <div>
                <br />
                <RestaurantCard restaurant={restaurant} />
                <br />
              </div>
            );
          })}
        </ul>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'space-around',
        }}
      >
        <Typography variant="h1">All Restaurants</Typography>
        <ul>
          {otherRestaurants.map((restaurant) => {
            return (
              <div>
                <br />
                <RestaurantCard restaurant={restaurant} />
                <br />
              </div>
            );
          })}
        </ul>
      </Box>
    </Container>
  );
};

export default Restaurants;
