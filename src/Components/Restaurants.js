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
      sx={{ backgroundColor: 'aliceblue' }}
      key={restaurant.id}
    >
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {restaurant.name}
        </Typography>
        <Typography gutterBottom variant="body1" my={2}>
          {restaurant.address}
        </Typography>
        <Typography gutterBottom variant="body2" color="GrayText" my={2}>
          {restaurant.contact} / {restaurant.email}
        </Typography>
        <FastfoodIcon />
        {/* <Avatar>{restaurant.logo}</Avatar> */}
        <Typography gutterBottom variant="body1" alignSelf="center" my={2}>
          {restaurant.description}
        </Typography>
        <Restaurant restaurant={restaurant} />
      </CardContent>
    </Card>
  );
};

const Restaurants = () => {
  const { auth, restaurants } = useSelector((state) => state);

  const restaurantsManaged = restaurants.filter(
    (restaurant) => restaurant.userId === auth.id
  );

  const otherRestaurants = restaurants.filter(
    (restaurant) => restaurant.userId !== auth.id
  );

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
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
