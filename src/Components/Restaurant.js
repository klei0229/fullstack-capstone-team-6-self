import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

const Restaurant = () => {
  const { menus, restaurants } = useSelector((state) => state);
  const { id } = useParams();
  const restaurant = restaurants.find((restaurant) => restaurant.id === id);

  const restaurantMenus = menus.filter(
    (menu) => menu.restaurantId === restaurant.id
  );
  return (
    <div>
      <h3>{restaurant.name}</h3>
      <ul>
        {restaurantMenus.map((menu) => {
          return (
            <li key={menu.id}>
              <Link to={`/menus/${menu.id}`}>{menu.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Restaurant;
