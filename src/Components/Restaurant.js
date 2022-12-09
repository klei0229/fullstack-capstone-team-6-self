import React from 'react';
import { useSelector } from 'react-redux';

import {Button} from '@mui/material'
import AddMenu from './AddMenu';

const Restaurant = (props) => {
  const { menus } = useSelector((state) => state);
  // console.log(menus);
  const restaurantMenus = menus.filter(
    (menu) => menu.restaurantId === props.restaurant.id
  );
  return (
    <div>
      <h3>{props.restaurant.name}</h3>
      {/* <Button>Add Menu</Button> */}
      <AddMenu restaurant = {props.restaurant}></AddMenu>
      <ul>
        {restaurantMenus.map((menu) => {
          return <li key={menu.id}>{menu.name} <Button>View</Button>
          <Button href={`/api/menus/${menu.id}`}>Edit Data</Button>
          <Button>Edit Style</Button></li>;
        })}
      </ul>
    </div>
  );
};

export default Restaurant;
