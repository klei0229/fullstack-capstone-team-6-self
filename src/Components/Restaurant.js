import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddMenu from './AddMenu';
import { Button, Link } from '@mui/material';

const Restaurant = (props) => {
  const { menus, restaurants } = useSelector((state) => state);
  console.log(menus);
  const { id } = useParams();
  // const restaurant = restaurants.find((restaurant) => restaurant.id === id);
  // console.log(menus);
  const restaurantMenus = menus.filter(
    (menu) => menu.restaurantId === props.restaurant.id
  );
  return (
    <div>
      <h3>{props.restaurant.name}</h3>

      {/* <Button>Add Menu</Button> */}
      <AddMenu restaurant={props.restaurant}></AddMenu>
      <ul>
        {console.log(restaurantMenus)}
        {restaurantMenus.map((menu) => {
          return (
            <li key={menu.id}>
              {menu.name} <Button>View</Button>
              <Button href={`#/menu/${menu.id}`}>Edit Data</Button>
              <Button href={`#/menus/${menu.id}`}>Edit Style</Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Restaurant;
