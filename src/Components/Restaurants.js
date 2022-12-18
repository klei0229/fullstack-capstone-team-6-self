import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import Restaurant from './Restaurant';
import AddRestaurant from './AddRestaurant';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'aliceblue',
      }}
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
          <PhoneAndroidIcon />
          {restaurant.contact}
          <br />
          <ContactMailIcon />
          {' ' + restaurant.email}
        </Typography>
        <CardActionArea>
          <CardMedia
            sx={{ width: 150, height: 150, border: 2, borderColor: "GrayText", borderRadius: 1 }}
            component="img"
            src={restaurant.logo}
          />
        </CardActionArea>
        <Typography gutterBottom paragraph my={2}>
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
    <Container sx={{ textAlign: 'center' }}>
      <Box>
        <Typography gutterBottom variant="h1">
          My Restaurants
        </Typography>
        <AddRestaurant />
        <ul>
          {restaurantsManaged.map((restaurant) => {
            return (
              <div key={restaurant.id}>
                <br />
                <RestaurantCard restaurant={restaurant} />
                <br />
              </div>
            );
          })}
        </ul>
      </Box>
      <Divider />
      <Box>
        <Typography variant="h1">All Restaurants</Typography>
        <ul>
          {otherRestaurants.map((restaurant) => {
            return (
              <div key={restaurant.id}>
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
