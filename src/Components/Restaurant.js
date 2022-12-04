import React from 'react';
import { useSelector } from 'react-redux';

const Restaurant = (props) => {
  const { menus } = useSelector((state) => state);
  const restaurantMenus = menus.filter(
    (menu) => menu.restaurantId === props.restaurant.id
  );
  return (
    <div>
      <h3>{props.restaurant.name}</h3>
      <ul>
        {restaurantMenus.map((menu) => {
          return <li key={menu.id}>{menu.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Restaurant;
