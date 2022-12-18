import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddMenu from './AddMenu';
import { Box, Button, Link, List, ListItem, ListItemText } from '@mui/material';
import { fetchMenus, fetchItems, deleteMenu } from '../store';

const Restaurant = (props) => {
  const { auth, menus, restaurants } = useSelector((state) => state);
  console.log(menus);
  const { id } = useParams();
  const dispatch = useDispatch();
  // const restaurant = restaurants.find((restaurant) => restaurant.id === id);
  // console.log(menus);
  useEffect(() => {
    dispatch(fetchMenus());
    dispatch(fetchItems());
  }, []);

  const restaurantMenus = menus.filter(
    (menu) => menu.restaurantId === props.restaurant.id
  );

  return (
    <Box>
      <AddMenu restaurant={props.restaurant} />
      <List>
        {restaurantMenus.map((menu) => {
          return (
            <ListItem key={menu.id}>
              <ListItemText>{menu.name}</ListItemText>
              <Button href={`#/menu/preview/${menu.id}`}>View</Button>
              {auth.id === props.restaurant.userId ? (
                <Button href={`#/menu/editContent/${menu.id}`}>
                  Edit Data
                </Button>
              ) : null}
              {auth.id === props.restaurant.userId ? (
                <Button href={`#/menu/editStyle/${menu.id}`}>Edit Style</Button>
              ) : null}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Restaurant;
