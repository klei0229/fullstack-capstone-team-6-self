import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import AddMenu from './AddMenu';
import { Button } from '@mui/material';

// const Restaurant = () => {
// const { menus, restaurants } = useSelector((state) => state);

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
              <Button href={`/api/menus/${menu.id}`}>Edit Data</Button>
              <Button href={`#/edit/${menu.id}`}>Edit Style</Button>
            </li>
          );
          // <h3>{restaurant.name}</h3>
          // <ul>
          //   {restaurantMenus.map((menu) => {
          //     return (
          //       <li key={menu.id}>
          //         <Link to={`/menus/${menu.id}`}>{menu.name}</Link>
          //       </li>
          //     );
        })}
      </ul>
    </div>
  );
};

export default Restaurant;
