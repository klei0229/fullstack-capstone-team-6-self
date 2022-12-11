import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddMenu from './AddMenu';
import { Button, Link } from '@mui/material';
import { fetchMenus, deleteMenu } from '../store';

const Restaurant = (props) => {
  const { auth, menus, restaurants } = useSelector((state) => state);
  console.log(menus);
  const { id } = useParams();
  const dispatch = useDispatch();
  // const restaurant = restaurants.find((restaurant) => restaurant.id === id);
  // console.log(menus);
  // useEffect(() => {
  //   dispatch(fetchMenus());
  // }, [id]);

  const restaurantMenus = menus.filter(
    (menu) => menu.restaurantId === props.restaurant.id
  );
  return (
    <div>
      <h3>{props.restaurant.name}</h3>

      {/* <Button>Add Menu</Button> */}
      <AddMenu restaurant={props.restaurant}></AddMenu>
      <ul>
        {restaurantMenus.map((menu) => {
          return (
            <li key={menu.id}>
              {menu.name} <Button>View</Button>
              {auth.id === props.restaurant.userId ? (
                <Button href={`#/menu/${menu.id}`}>Edit Data</Button>
              ) : null}
              {auth.id === props.restaurant.userId ? (
                <Button href={`#/editstyle/${menu.id}`}>Edit Style</Button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Restaurant;
